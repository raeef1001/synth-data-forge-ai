import { Request, Response } from 'express';
import { db } from '../config/firebase';
import { Schema, SchemaField } from '../models/schema';
import { AuthRequest } from '../middleware/auth';
import { TIER_LIMITS } from '../models/user';

export class SchemaController {
  // Create new schema
  static async create(req: AuthRequest, res: Response) {
    try {
      const { name, description, fields } = req.body;
      const userId = req.user!.uid;

      // Check user's schema limit
      const userDoc = await db.collection('users').doc(userId).get();
      const userData = userDoc.data();
      const userTier = userData?.subscriptionTier || 'free';
      
      const schemasSnapshot = await db.collection('schemas')
        .where('userId', '==', userId)
        .get();
      
      if (schemasSnapshot.size >= TIER_LIMITS[userTier].maxSchemas) {
        return res.status(403).json({
          error: 'Schema limit reached',
          message: `Your ${userTier} plan allows up to ${TIER_LIMITS[userTier].maxSchemas} schemas`
        });
      }

      const schema: Schema = {
        userId,
        name,
        description,
        fields,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const docRef = await db.collection('schemas').add(schema);
      
      res.status(201).json({
        id: docRef.id,
        ...schema
      });
    } catch (error: any) {
      res.status(400).json({
        error: 'Failed to create schema',
        message: error.message
      });
    }
  }

  // Get all schemas for user
  static async getAll(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.uid;
      
      const schemasSnapshot = await db.collection('schemas')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();
      
      const schemas = schemasSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      res.json(schemas);
    } catch (error: any) {
      res.status(400).json({
        error: 'Failed to fetch schemas',
        message: error.message
      });
    }
  }

  // Get single schema
  static async getOne(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user!.uid;
      
      const schemaDoc = await db.collection('schemas').doc(id).get();
      
      if (!schemaDoc.exists) {
        return res.status(404).json({
          error: 'Schema not found'
        });
      }

      const schema = schemaDoc.data();
      
      if (schema?.userId !== userId) {
        return res.status(403).json({
          error: 'Unauthorized access'
        });
      }
      
      res.json({
        id: schemaDoc.id,
        ...schema
      });
    } catch (error: any) {
      res.status(400).json({
        error: 'Failed to fetch schema',
        message: error.message
      });
    }
  }

  // Update schema
  static async update(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, fields } = req.body;
      const userId = req.user!.uid;
      
      const schemaDoc = await db.collection('schemas').doc(id).get();
      
      if (!schemaDoc.exists) {
        return res.status(404).json({
          error: 'Schema not found'
        });
      }

      const schema = schemaDoc.data();
      
      if (schema?.userId !== userId) {
        return res.status(403).json({
          error: 'Unauthorized access'
        });
      }

      const updatedSchema = {
        name,
        description,
        fields,
        updatedAt: new Date()
      };

      await db.collection('schemas').doc(id).update(updatedSchema);
      
      res.json({
        id,
        ...schema,
        ...updatedSchema
      });
    } catch (error: any) {
      res.status(400).json({
        error: 'Failed to update schema',
        message: error.message
      });
    }
  }

  // Delete schema
  static async delete(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user!.uid;
      
      const schemaDoc = await db.collection('schemas').doc(id).get();
      
      if (!schemaDoc.exists) {
        return res.status(404).json({
          error: 'Schema not found'
        });
      }

      const schema = schemaDoc.data();
      
      if (schema?.userId !== userId) {
        return res.status(403).json({
          error: 'Unauthorized access'
        });
      }

      await db.collection('schemas').doc(id).delete();
      
      res.json({
        message: 'Schema deleted successfully'
      });
    } catch (error: any) {
      res.status(400).json({
        error: 'Failed to delete schema',
        message: error.message
      });
    }
  }
}
