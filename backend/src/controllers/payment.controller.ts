import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { db } from '../config/firebase';
import { SubscriptionTier } from '../models/user';

export class PaymentController {
  // Initiate subscription upgrade
  static async initiateUpgrade(req: AuthRequest, res: Response) {
    try {
      const { newTier } = req.body as { newTier: SubscriptionTier };
      const userId = req.user!.uid;

      // Get current user data
      const userDoc = await db.collection('users').doc(userId).get();
      const userData = userDoc.data();

      if (!userData) {
        return res.status(404).json({
          error: 'User not found'
        });
      }

      if (!['pro', 'enterprise'].includes(newTier)) {
        return res.status(400).json({
          error: 'Invalid subscription tier',
          message: 'Available tiers are: pro, enterprise'
        });
      }

      // In a real implementation, this would create a checkout session with a payment provider
      // For this mock implementation, we'll simulate a payment flow with a dummy checkout URL

      const checkoutSession = {
        id: `cs_${Math.random().toString(36).substr(2, 9)}`,
        userId,
        currentTier: userData.subscriptionTier,
        newTier,
        createdAt: new Date()
      };

      // Store checkout session
      await db.collection('checkoutSessions').doc(checkoutSession.id).set(checkoutSession);

      res.json({
        checkoutUrl: `/api/payments/checkout/${checkoutSession.id}`,
        sessionId: checkoutSession.id
      });
    } catch (error: any) {
      res.status(400).json({
        error: 'Failed to initiate upgrade',
        message: error.message
      });
    }
  }

  // Handle successful payment (dummy implementation)
  static async handleSuccess(req: AuthRequest, res: Response) {
    try {
      const { sessionId } = req.params;

      // Get checkout session
      const sessionDoc = await db.collection('checkoutSessions').doc(sessionId).get();
      
      if (!sessionDoc.exists) {
        return res.status(404).json({
          error: 'Checkout session not found'
        });
      }

      const session = sessionDoc.data()!;

      // Update user's subscription tier
      await db.collection('users').doc(session.userId).update({
        subscriptionTier: session.newTier,
        'subscription.updatedAt': new Date(),
        'subscription.active': true
      });

      // Clean up checkout session
      await db.collection('checkoutSessions').doc(sessionId).delete();

      res.json({
        message: 'Subscription upgraded successfully',
        tier: session.newTier
      });
    } catch (error: any) {
      res.status(400).json({
        error: 'Failed to process payment',
        message: error.message
      });
    }
  }

  // Handle cancelled payment
  static async handleCancel(req: AuthRequest, res: Response) {
    try {
      const { sessionId } = req.params;

      // Clean up checkout session
      await db.collection('checkoutSessions').doc(sessionId).delete();

      res.json({
        message: 'Payment cancelled'
      });
    } catch (error: any) {
      res.status(400).json({
        error: 'Failed to cancel payment',
        message: error.message
      });
    }
  }
}
