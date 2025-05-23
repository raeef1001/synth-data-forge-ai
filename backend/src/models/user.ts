export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface User {
  id: string;
  email: string;
  displayName?: string;
  createdAt: Date;
  subscriptionTier: SubscriptionTier;
  apiKey?: string;
  usageStats: {
    datasetsCreated: number;
    apiCallsMade: number;
    lastApiCall?: Date;
  };
}

export interface TierLimits {
  maxSchemas: number;
  maxDatasetsPerSchema: number;
  maxRowsPerGeneration: number;
  apiEnabled: boolean;
  aiFeatures: boolean;
}

export const TIER_LIMITS: Record<SubscriptionTier, TierLimits> = {
  free: {
    maxSchemas: 3,
    maxDatasetsPerSchema: 2,
    maxRowsPerGeneration: 1000,
    apiEnabled: false,
    aiFeatures: false
  },
  pro: {
    maxSchemas: 10,
    maxDatasetsPerSchema: 5,
    maxRowsPerGeneration: 10000,
    apiEnabled: true,
    aiFeatures: true
  },
  enterprise: {
    maxSchemas: 100,
    maxDatasetsPerSchema: 20,
    maxRowsPerGeneration: 100000,
    apiEnabled: true,
    aiFeatures: true
  }
};
