import { Request, Response, Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { db } from '../config/firebase';
import { TIER_LIMITS } from '../models/user';

const router = Router();

// API key authentication middleware
const apiKeyAuth = async (req: Request, res: Response, next: Function) => {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;

  if (!apiKey) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'API key is required'
    });
  }

  const userId = await AuthController.verifyApiKey(apiKey as string);

  if (!userId) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid API key'
    });
  }

  req.user = { uid: userId };
  next();
};

// Get dataset data through API
router.get('/:datasetId', apiKeyAuth, async (req: Request, res: Response) => {
  try {
    const { datasetId } = req.params;
    const { format = 'json' } = req.query;
    
    // Get dataset
    const datasetDoc = await db.collection('datasets').doc(datasetId).get();
    
    if (!datasetDoc.exists) {
      return res.status(404).json({
        error: 'Dataset not found'
      });
    }

    const dataset = datasetDoc.data()!;
    
    // Verify dataset ownership
    if (dataset.userId !== req.user?.uid) {
      return res.status(403).json({
        error: 'Unauthorized access'
      });
    }

    // Get user's subscription tier
    const userDoc = await db.collection('users').doc(req.user.uid).get();
    const userData = userDoc.data();
    
    if (!userData || !TIER_LIMITS[userData.subscriptionTier].apiEnabled) {
      return res.status(403).json({
        error: 'API access not available',
        message: 'Upgrade to Pro or Enterprise plan to access the API'
      });
    }

    const data = dataset.data || [];

    // Format response based on requested format
    switch (format) {
      case 'csv':
        if (data.length === 0) {
          res.setHeader('Content-Type', 'text/csv');
          return res.send('');
        }
        
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map((row: any) => 
          Object.values(row)
            .map(value => `"${String(value).replace(/"/g, '""')}"`)
            .join(',')
        );
        
        res.setHeader('Content-Type', 'text/csv');
        res.send([headers, ...rows].join('\n'));
        break;

      case 'json':
      default:
        res.json(data);
    }
  } catch (error: any) {
    res.status(500).json({
      error: 'Failed to retrieve dataset',
      message: error.message
    });
  }
});

export const dataApiRouter = router;
