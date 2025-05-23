import { auth } from './firebase';
import { Schema, SchemaField } from '../../backend/src/models/schema';
import { Dataset } from '../../backend/src/models/dataset';
import { User, SubscriptionTier } from '../../backend/src/models/user';

const API_URL = 'http://localhost:3000';

async function getAuthToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  return user.getIdToken();
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
}

// Auth API
export async function registerUser(email: string, password: string, displayName?: string) {
  return apiRequest<{ token: string; user: User }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, displayName }),
  });
}

// Schema API
export async function createSchema(schema: Partial<Schema>) {
  return apiRequest<Schema>('/api/schemas', {
    method: 'POST',
    body: JSON.stringify(schema),
  });
}

export async function getSchemas() {
  return apiRequest<Schema[]>('/api/schemas');
}

export async function getSchema(id: string) {
  return apiRequest<Schema>(`/api/schemas/${id}`);
}

export async function updateSchema(id: string, schema: Partial<Schema>) {
  return apiRequest<Schema>(`/api/schemas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(schema),
  });
}

export async function deleteSchema(id: string) {
  return apiRequest(`/api/schemas/${id}`, {
    method: 'DELETE',
  });
}

// Dataset API
export async function generateDataset(schemaId: string, name: string, rowCount: number) {
  return apiRequest<Dataset>('/api/datasets/generate', {
    method: 'POST',
    body: JSON.stringify({ schemaId, name, rowCount }),
  });
}

export async function getDatasets() {
  return apiRequest<Dataset[]>('/api/datasets');
}

export async function getDataset(id: string) {
  return apiRequest<Dataset>(`/api/datasets/${id}`);
}

export async function deleteDataset(id: string) {
  return apiRequest(`/api/datasets/${id}`, {
    method: 'DELETE',
  });
}

// User API
export async function getCurrentUser() {
  return apiRequest<User>('/api/users/me');
}

export async function updateProfile(displayName: string) {
  return apiRequest<User>('/api/users/me', {
    method: 'PUT',
    body: JSON.stringify({ displayName }),
  });
}

export async function getUserStats() {
  return apiRequest<{
    schemas: { total: number; limit: number };
    datasets: { total: number; generated: number };
    api: { enabled: boolean; callsMade: number; lastCall?: Date };
    subscription: { tier: SubscriptionTier; features: any };
  }>('/api/users/me/stats');
}

// API Key Management
export async function generateApiKey() {
  return apiRequest<{ apiKey: string }>('/auth/api-key/generate', {
    method: 'POST',
  });
}

export async function revokeApiKey() {
  return apiRequest('/auth/api-key/revoke', {
    method: 'POST',
  });
}

export async function checkApiKeyStatus() {
  return apiRequest<{ hasApiKey: boolean; apiEnabled: boolean }>(
    '/api/users/me/api-key-status'
  );
}

// Payment/Subscription API
export async function initiateUpgrade(newTier: SubscriptionTier) {
  return apiRequest<{ checkoutUrl: string; sessionId: string }>(
    '/api/payments/initiate-upgrade',
    {
      method: 'POST',
      body: JSON.stringify({ newTier }),
    }
  );
}

// Gemini AI Integration for Schema Generation
const GEMINI_API_KEY = 'AIzaSyDRDF2WgWq2c2wYRFYNhzyBtSNU0-P1bJ4';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';

export async function generateSchemaFromDescription(description: string): Promise<SchemaField[]> {
  // Simple rate limiting - store last request time in localStorage
  const lastRequestTime = localStorage.getItem('lastGeminiRequest');
  if (lastRequestTime) {
    const timeSinceLastRequest = Date.now() - parseInt(lastRequestTime);
    if (timeSinceLastRequest < 1000) { // 1 second delay between requests
      throw new Error('Please wait a moment before generating another schema');
    }
  }

  const prompt = `Given this description, generate a JSON schema array for a data model. Description: ${description}
  Example format:
  [
    { "fieldName": "id", "dataType": "string" },
    { "fieldName": "name", "dataType": "string" },
    { "fieldName": "age", "dataType": "number", "options": { "min": 0, "max": 120 } }
  ]
  Only include common data types: string, number, boolean, date, email, phone, address, name, company, url, uuid, color.`;

  try {
    localStorage.setItem('lastGeminiRequest', Date.now().toString());

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.8,
          maxOutputTokens: 1024,
        },
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to generate schema');
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    let schemaFields: SchemaField[] = [];
    
    try {
      // Extract JSON array from the response text
      const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        schemaFields = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error('Failed to parse generated schema:', e);
      throw new Error('Failed to parse generated schema');
    }

    return schemaFields;
  } catch (error: any) {
    console.error('Error generating schema:', error);
    throw new Error(error.message || 'Failed to generate schema');
  }
}