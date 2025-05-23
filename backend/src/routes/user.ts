import { Router } from 'express';
import { body } from 'express-validator';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth';
import { validateRequest } from '../middleware/validate-request';

const router = Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Get current user profile
router.get('/me', UserController.getCurrentUser);

// Update user profile
router.put(
  '/me',
  [
    body('displayName').trim().isLength({ min: 1 }),
    validateRequest
  ],
  UserController.updateProfile
);

// Get user stats
router.get('/me/stats', UserController.getStats);

// Check API key status
router.get('/me/api-key-status', UserController.checkApiKeyStatus);

export const userRouter = router;
