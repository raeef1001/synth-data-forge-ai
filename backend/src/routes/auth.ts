import { Router } from 'express';
import { body } from 'express-validator';
import { auth, db } from '../config/firebase';
import { validateRequest } from '../middleware/validate-request';

const router = Router();

const registerValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('displayName').optional().trim().isLength({ min: 2 })
];

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
];

const resetPasswordValidation = [
  body('email').isEmail().normalizeEmail()
];

// Register new user
router.post(
  '/register',
  validateRequest(registerValidation),
  async (req, res) => {
    try {
      const { email, password, displayName } = req.body;

      // Create user in Firebase Auth
      const userRecord = await auth.createUser({
        email,
        password,
        displayName: displayName || undefined
      });

      // Create user document in Firestore
      await db.collection('users').doc(userRecord.uid).set({
        email: userRecord.email,
        displayName: userRecord.displayName,
        createdAt: new Date(),
        subscriptionTier: 'free',
        usageStats: {
          datasetsCreated: 0,
          apiCallsMade: 0
        }
      });

      // Create custom token for immediate login
      const token = await auth.createCustomToken(userRecord.uid);
      
      res.status(201).json({
        message: 'User created successfully',
        token
      });
    } catch (error: any) {
      res.status(400).json({
        error: 'Registration failed',
        message: error.message
      });
    }
  }
);

// Login
router.post(
  '/login',
  validateRequest(loginValidation),
  async (req, res) => {
    try {
      const { email } = req.body;
      
      // Find user by email
      const userRecord = await auth.getUserByEmail(email);
      
      // Note: In a real implementation, password verification would be handled by Firebase Auth client SDK
      const token = await auth.createCustomToken(userRecord.uid);
      
      res.json({
        token,
        user: {
          email: userRecord.email,
          displayName: userRecord.displayName
        }
      });
    } catch (error: any) {
      res.status(401).json({
        error: 'Authentication failed',
        message: error.message
      });
    }
  }
);

// Password reset
router.post(
  '/reset-password',
  validateRequest(resetPasswordValidation),
  async (req, res) => {
    try {
      const { email } = req.body;
      
      // Generate password reset link
      const link = await auth.generatePasswordResetLink(email);
      
      res.json({
        message: 'Password reset link generated',
        link
      });
    } catch (error: any) {
      res.status(400).json({
        error: 'Password reset failed',
        message: error.message
      });
    }
  }
);

export const authRouter = router;
