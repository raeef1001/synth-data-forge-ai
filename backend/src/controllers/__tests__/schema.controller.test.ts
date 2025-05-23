import { Request, Response } from 'express';
import { SchemaController } from '../schema.controller';
import { db } from '../../config/firebase';
import { Schema } from '../../models/schema';

// Mock Firebase admin
jest.mock('../../config/firebase', () => ({
  db: {
    collection: jest.fn(),
  },
}));

describe('SchemaController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockCollection: jest.Mock;
  let mockDoc: jest.Mock;
  let mockGet: jest.Mock;
  let mockAdd: jest.Mock;

  beforeEach(() => {
    // Reset mocks
    mockGet = jest.fn();
    mockDoc = jest.fn().mockReturnValue({ get: mockGet });
    mockAdd = jest.fn();
    mockCollection = jest.fn().mockReturnValue({
      doc: mockDoc,
      add: mockAdd,
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      get: jest.fn(),
    });
    (db.collection as jest.Mock) = mockCollection;

    // Setup request and response
    mockRequest = {
      user: { uid: 'testUserId' },
      body: {},
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe('create', () => {
    const validSchema: Partial<Schema> = {
      name: 'Test Schema',
      description: 'Test Description',
      fields: [
        {
          fieldName: 'testField',
          dataType: 'string',
        },
      ],
    };

    it('should create a new schema successfully', async () => {
      // Mock user document
      mockGet.mockResolvedValueOnce({
        exists: true,
        data: () => ({
          subscriptionTier: 'pro',
        }),
      });

      // Mock schemas count
      const mockSnapshot = {
        size: 0,
      };
      (db.collection as jest.Mock)().where().get.mockResolvedValueOnce(mockSnapshot);

      // Mock schema creation
      const mockSchemaId = 'testSchemaId';
      mockAdd.mockResolvedValueOnce({ id: mockSchemaId });

      mockRequest.body = validSchema;

      await SchemaController.create(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          id: mockSchemaId,
          name: validSchema.name,
          description: validSchema.description,
        })
      );
    });

    it('should return 403 when schema limit is reached', async () => {
      // Mock user document
      mockGet.mockResolvedValueOnce({
        exists: true,
        data: () => ({
          subscriptionTier: 'free',
        }),
      });

      // Mock schemas count (3 schemas for free tier)
      const mockSnapshot = {
        size: 3,
      };
      (db.collection as jest.Mock)().where().get.mockResolvedValueOnce(mockSnapshot);

      mockRequest.body = validSchema;

      await SchemaController.create(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Schema limit reached',
        })
      );
    });
  });
});
