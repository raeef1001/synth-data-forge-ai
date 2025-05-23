import { Response } from 'express';
import { db } from '../config/firebase';
import { AuthRequest } from '../middleware/auth';
import { Dataset } from '../models/dataset';
import { TIER_LIMITS } from '../models/user';
import { DataGenerationService } from '../services/data-generation.service';

export class DatasetController {
  // Generate new dataset
  static async generate(req: AuthRequest, res: Response) {
    try {
      const { schemaId, name, rowCount } = req.body;
      const userId = req.user!.uid;

      // Get user's subscription tier
      const userDoc = await db.collection('users').doc(userId).get();
      const userData = userDoc.data();
      const userTier = userData?.subscriptionTier || 'free';

      // Check row count limit
      if (rowCount > TIER_LIMITS[userTier].maxRowsPerGeneration) {
        return res.status(403).json({
          error: 'Row count limit exceeded',
          message: `Your ${userTier} plan allows up to ${TIER_LIMITS[userTier].maxRowsPerGeneration} rows per generation`
        });
      }

      // Get schema
      const schemaDoc = await db.collection('schemas').doc(schemaId).get();
      if (!schemaDoc.exists || schemaDoc.data()?.userId !== userId) {
        return res.status(404).json({ error: 'Schema not found' });
      }

      // Check datasets per schema limit
      const datasetsSnapshot = await db.collection('datasets')
        .where('schemaId', '==', schemaId)
        .where('userId', '==', userId)
        .get();

      if (datasetsSnapshot.size >= TIER_LIMITS[userTier].maxDatasetsPerSchema) {
        return res.status(403).json({
          error: 'Dataset limit reached',
          message: `Your ${userTier} plan allows up to ${TIER_LIMITS[userTier].maxDatasetsPerSchema} datasets per schema`
        });
      }

      // Create dataset record
      const dataset: Dataset = {
        schemaId,
        userId,
        name,
        rowCount,
        generatedAt: new Date(),
        apiEndpointPath: '',
        status: 'generating'
      };

      const datasetDoc = await db.collection('datasets').add(dataset);
      dataset.id = datasetDoc.id;
      dataset.apiEndpointPath = `/data/${datasetDoc.id}`;

      // Generate data
      try {
        const schemaData = schemaDoc.data()!;
        const generatedData = DataGenerationService.generateData(schemaData.fields, rowCount);

        // Store generated data
        await db.collection('datasets').doc(datasetDoc.id).update({
          status: 'ready',
          apiEndpointPath: `/data/${datasetDoc.id}`,
          data: generatedData // In a real implementation, consider storing large datasets elsewhere
        });

        // Update user's usage stats
        await db.collection('users').doc(userId).update({
          'usageStats.datasetsCreated': userData?.usageStats?.datasetsCreated + 1 || 1
        });

        res.status(201).json({
          id: datasetDoc.id,
          ...dataset,
          status: 'ready'
        });
      } catch (error) {
        // Update status to error if generation fails
        await db.collection('datasets').doc(datasetDoc.id).update({
          status: 'error',
          errorMessage: 'Failed to generate data'
        });
        throw error;
      }
    } catch (error: any) {
      res.status(400).json({
        error: 'Failed to generate dataset',
        message: error.message
      });
    }
  }

  // Get all datasets for user
  static async getAll(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.uid;
      
      const datasetsSnapshot = await db.collection('datasets')
        .where('userId', '==', userId)
        .orderBy('generatedAt', 'desc')
        .get();
      
      const datasets = datasetsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      res.json(datasets);
    } catch (error: any) {
      res.status(400).json({
        error: 'Failed to fetch datasets',
        message: error.message
      });
    }
  }

  // Get single dataset
  static async getOne(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user!.uid;
      
      const datasetDoc = await db.collection('datasets').doc(id).get();
      
      if (!datasetDoc.exists) {
        return res.status(404).json({
          error: 'Dataset not found'
        });
      }

      const dataset = datasetDoc.data();
      
      if (dataset?.userId !== userId) {
        return res.status(403).json({
          error: 'Unauthorized access'
        });
      }
      
      res.json({
        id: datasetDoc.id,
        ...dataset
      });
    } catch (error: any) {
      res.status(400).json({
        error: 'Failed to fetch dataset',
        message: error.message
      });
    }
  }

  // Delete dataset
  static async delete(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user!.uid;
      
      const datasetDoc = await db.collection('datasets').doc(id).get();
      
      if (!datasetDoc.exists) {
        return res.status(404).json({
          error: 'Dataset not found'
        });
      }

      const dataset = datasetDoc.data();
      
      if (dataset?.userId !== userId) {
        return res.status(403).json({
          error: 'Unauthorized access'
        });
      }

      await db.collection('datasets').doc(id).delete();
      
      res.json({
        message: 'Dataset deleted successfully'
      });
    } catch (error: any) {
      res.status(400).json({
        error: 'Failed to delete dataset',
        message: error.message
      });
    }
  }
}
