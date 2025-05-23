import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { db } from '../config/firebase';
import { User } from '../models/user';

export class UserController {
  // Get current user profile
  static async getCurrentUser(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.uid;
      const userDoc = await db.collection('users').doc(userId).get();
      
      if (!userDoc.exists) {
        return res.status(404).json({
          error: 'User not found'
        });
      }

      const userData = userDoc.data() as User;
      
      // Don't send sensitive information like hashed API key
      const { apiKey, ...safeUserData } = userData;
      
      res.json(safeUserData);
    } catch (error: any) {
      res.status(400).json({
        error: 'Failed to fetch user profile',
        message: error.message
      });
    }
  }

  // Update user profile
  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.uid;
      const { displayName } = req.body;

      await db.collection('users').doc(userId).update({
        displayName,
        updatedAt: new Date()
      });

      res.json({
        message: 'Profile updated successfully',
        displayName
      });
    } catch (error: any) {
      res.status(400).json({
        error: 'Failed to update profile',
        message: error.message
      });
    }
  }

  // Get user stats
  static async getStats(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.uid;
      
      // Get user's schemas count
      const schemasCount = (await db.collection('schemas')
        .where('userId', '==', userId)
        .count()
        .get()).data().count;

      // Get user's datasets count
      const datasetsCount = (await db.collection('datasets')
        .where('userId', '==', userId)
        .count()
        .get()).data().count;

      // Get user's subscription and usage data
      const userDoc = await db.collection('users').doc(userId).get();
      const userData = userDoc.data() as User;

      res.json({
        schemas: {
          total: schemasCount,
          limit: TIER_LIMITS[userData.subscriptionTier].maxSchemas
        },
        datasets: {
          total: datasetsCount,
          generated: userData.usageStats.datasetsCreated
        },
        api: {
          enabled: TIER_LIMITS[userData.subscriptionTier].apiEnabled,
          callsMade: userData.usageStats.apiCallsMade,
          lastCall: userData.usageStats.lastApiCall
        },
        subscription: {
          tier: userData.subscriptionTier,
          features: TIER_LIMITS[userData.subscriptionTier]
        }
      });
    } catch (error: any) {
      res.status(400).json({
        error: 'Failed to fetch user stats',
        message: error.message
      });
    }
  }

  // Check API key status
  static async checkApiKeyStatus(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.uid;
      const userDoc = await db.collection('users').doc(userId).get();
      
      if (!userDoc.exists) {
        return res.status(404).json({
          error: 'User not found'
        });
      }

      const userData = userDoc.data() as User;
      
      res.json({
        hasApiKey: !!userData.apiKey,
        apiEnabled: TIER_LIMITS[userData.subscriptionTier].apiEnabled
      });
    } catch (error: any) {
      res.status(400).json({
        error: 'Failed to check API key status',
        message: error.message
      });
    }
  }
}
