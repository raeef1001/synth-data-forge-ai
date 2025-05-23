import { Router } from 'express';
import { body } from 'express-validator';
import { PaymentController } from '../controllers/payment.controller';
import { authMiddleware } from '../middleware/auth';
import { validateRequest } from '../middleware/validate-request';

const router = Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Initiate subscription upgrade
router.post(
  '/initiate-upgrade',
  [
    body('newTier').isIn(['pro', 'enterprise']),
    validateRequest
  ],
  PaymentController.initiateUpgrade
);

// Handle successful payment
router.get('/success/:sessionId', PaymentController.handleSuccess);

// Handle cancelled payment
router.get('/cancel/:sessionId', PaymentController.handleCancel);

export const paymentRouter = router;
