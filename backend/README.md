# Synth Data Forge AI Backend

This is the backend server for the Synth Data Forge AI platform, providing APIs for synthetic data generation, schema management, and user management.

## Technology Stack

- Node.js with Express.js
- TypeScript
- Firebase (Authentication & Firestore)
- Jest for testing
- ESLint & Prettier for code quality

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
Copy `.env.example` to `.env` and fill in your Firebase configuration and other environment variables.

3. Set up Firebase:
- Create a Firebase project
- Enable Authentication and Firestore
- Generate a service account key and add it to your `.env` file

## Development

Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3000` by default.

## Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Code Quality

Lint code:
```bash
npm run lint
```

Fix linting issues:
```bash
npm run lint:fix
```

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── middleware/     # Express middleware
├── models/         # TypeScript interfaces and types
├── routes/         # Express routes
├── services/       # Business logic
└── utils/         # Utility functions
```

## API Endpoints

### Authentication
- POST /auth/register - Register new user
- POST /auth/api-key/generate - Generate API key
- POST /auth/api-key/revoke - Revoke API key

### Schemas
- POST /api/schemas - Create schema
- GET /api/schemas - List schemas
- GET /api/schemas/:id - Get schema
- PUT /api/schemas/:id - Update schema
- DELETE /api/schemas/:id - Delete schema

### Datasets
- POST /api/datasets/generate - Generate dataset
- GET /api/datasets - List datasets
- GET /api/datasets/:id - Get dataset
- DELETE /api/datasets/:id - Delete dataset

### User Management
- GET /api/users/me - Get current user
- PUT /api/users/me - Update profile
- GET /api/users/me/stats - Get usage stats

### Data API
- GET /data/:datasetId - Access generated data (requires API key)

## Deployment

Build for production:
```bash
npm run build
```

The compiled JavaScript will be in the `dist` directory.

## Firebase Rules

Deploy Firestore security rules:
```bash
npm run deploy:rules
```

## License

This project is proprietary and confidential.
