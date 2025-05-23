import { Router } from 'express';
import { body } from 'express-validator';
import { SchemaController } from '../controllers/schema.controller';
import { authMiddleware } from '../middleware/auth';
import { validateRequest } from '../middleware/validate-request';

const router = Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Create schema
router.post(
  '/',
  [
    body('name').trim().isLength({ min: 1 }),
    body('description').optional().trim(),
    body('fields').isArray({ min: 1 }).withMessage('At least one field is required'),
    body('fields.*.fieldName').trim().isLength({ min: 1 }),
    body('fields.*.dataType').isIn([
      'string', 'number', 'boolean', 'date', 
      'email', 'phone', 'address', 'name',
      'company', 'url', 'uuid', 'color',
      'aiText'
    ]),
    validateRequest
  ],
  SchemaController.create
);

// Get all schemas
router.get('/', SchemaController.getAll);

// Get single schema
router.get('/:id', SchemaController.getOne);

// Update schema
router.put(
  '/:id',
  [
    body('name').trim().isLength({ min: 1 }),
    body('description').optional().trim(),
    body('fields').isArray({ min: 1 }).withMessage('At least one field is required'),
    body('fields.*.fieldName').trim().isLength({ min: 1 }),
    body('fields.*.dataType').isIn([
      'string', 'number', 'boolean', 'date', 
      'email', 'phone', 'address', 'name',
      'company', 'url', 'uuid', 'color',
      'aiText'
    ]),
    validateRequest
  ],
  SchemaController.update
);

// Delete schema
router.delete('/:id', SchemaController.delete);

export const schemaRouter = router;
