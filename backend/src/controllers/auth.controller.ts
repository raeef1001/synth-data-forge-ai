import { Request, Response } from 'express';
import { auth, db } from '../config/firebase';
import { User } from '../models/user';
import crypto from 'crypto';

export class AuthController {
  // Register new user
  static async register(req: Request, res: Response) {
    try {
      const { email, password, displayName } = req.body;

      // Create user in Firebase Auth
      const userRecord = await auth.createUser({
        email,
        password,
        displayName
      });

      // Create user document in Firestore
      const user: User = {
        id: userRecord.uid,
        email: userRecord.email!,
        displayName: displayName || '',
        createdAt: new Date(),
        subscriptionTier: 'free',
        usageStats: {
          datasetsCreated: 0,
          apiCallsMade: 0
        }
      };

      await db.collection('users').doc(userRecord.uid).set(user);

      // Create custom token for initial sign in
      const token = await auth.createCustomToken(userRecord.uid);

      res.status(201).json({
        message: 'User created successfully',
        token,
        user: {
          id: user.id,
          email: user.email,
          displayName: user.displayName,
          subscriptionTier: user.subscriptionTier
        }
      });
    } catch (error: any) {
      res.status(400).json({
        error: 'Registration failed',
        message: error.message
      });
    }
  }

  // Generate API key
  static async generateApiKey(req: Request, res: Response) {
    try {
      const userId = req.user?.uid;
      
      // Get user's subscription tier
      const userDoc = await db.collection('users').doc(userId!).get();
      const userData = userDoc.data() as User;

      if (!userData || !['pro', 'enterprise'].includes(userData.subscriptionTier)) {
        return res.status(403).json({
          error: 'Unauthorized',
          message: 'API key generation requires Pro or Enterprise subscription'
        });
      }

      // Generate API key
      const apiKey = crypto.randomBytes(32).toString('hex');
      const hashedApiKey = crypto
        .createHash('sha256')
        .update(apiKey)
        .digest('hex');

      // Store hashed API key
      await db.collection('users').doc(userId!).update({
        apiKey: hashedApiKey
      });

      res.json({
        message: 'API key generated successfully',
        apiKey // Only send plain API key once
      });
    } catch (error: any) {
      res.status(400).json({
        error: 'Failed to generate API key',
        message: error.message
      });
    }
  }

  // Revoke API key
  static async revokeApiKey(req: Request, res: Response) {
    try {
      const userId = req.user?.uid;

      await db.collection('users').doc(userId!).update({
        apiKey: null
      });

      res.json({
        message: 'API key revoked successfully'
      });
    } catch (error: any) {
      res.status(400).json({
        error: 'Failed to revoke API key',
        message: error.message
      });
    }
  }

  // Verify API key (used by data API endpoints)
  static async verifyApiKey(apiKey: string): Promise<string | null> {
    try {
      const hashedApiKey = crypto
        .createHash('sha256')
        .update(apiKey)
        .digest('hex');

      const usersSnapshot = await db
        .collection('users')
        .where('apiKey', '==', hashedApiKey)
        .limit(1)
        .get();

      if (usersSnapshot.empty) {
        return null;
      }

      const user = usersSnapshot.docs[0];
      
      // Update API usage stats
      await db.collection('users').doc(user.id).update({
        'usageStats.apiCallsMade': (user.data()?.usageStats?.apiCallsMade || 0) + 1,
        'usageStats.lastApiCall': new Date()
      });

      return user.id;
    } catch (error) {
      return null;
    }
  }
}
