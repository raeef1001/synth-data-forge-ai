import { Request, Response, NextFunction } from 'express';
import { db } from '../config/firebase';
import { TIER_LIMITS } from '../models/user';

// Simple in-memory rate limiting
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.uid;
  
  if (!userId) {
    return next();
  }

  const key = `${userId}-${req.path}`;
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  
  // Get user's subscription tier
  const userDoc = await db.collection('users').doc(userId).get();
  const userData = userDoc.data();
  const tier = userData?.subscriptionTier || 'free';
  
  // Define rate limits based on subscription tier
  const rateLimit = {
    free: 60, // 60 requests per minute
    pro: 300, // 300 requests per minute
    enterprise: 1000 // 1000 requests per minute
  }[tier];

  const current = requestCounts.get(key) || { count: 0, resetTime: now + windowMs };

  if (now > current.resetTime) {
    current.count = 0;
    current.resetTime = now + windowMs;
  }

  if (current.count >= rateLimit) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please try again later.'
    });
  }

  current.count++;
  requestCounts.set(key, current);

  // Set rate limit headers
  res.setHeader('X-RateLimit-Limit', rateLimit);
  res.setHeader('X-RateLimit-Remaining', Math.max(0, rateLimit - current.count));
  res.setHeader('X-RateLimit-Reset', Math.ceil(current.resetTime / 1000));

  next();
};
