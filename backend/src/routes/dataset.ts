import { Router } from 'express';
import { body } from 'express-validator';
import { DatasetController } from '../controllers/dataset.controller';
import { authMiddleware } from '../middleware/auth';
import { validateRequest } from '../middleware/validate-request';

const router = Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Generate new dataset
router.post(
  '/generate',
  [
    body('schemaId').notEmpty(),
    body('name').trim().isLength({ min: 1 }),
    body('rowCount').isInt({ min: 1 }),
    validateRequest
  ],
  DatasetController.generate
);

// Get all datasets
router.get('/', DatasetController.getAll);

// Get single dataset
router.get('/:id', DatasetController.getOne);

// Delete dataset
router.delete('/:id', DatasetController.delete);

export const datasetRouter = router;
