import { DataGenerationService } from '../data-generation.service';
import { SchemaField } from '../../models/schema';

describe('DataGenerationService', () => {
  describe('generateData', () => {
    it('should generate data according to schema', () => {
      const fields: SchemaField[] = [
        {
          fieldName: 'name',
          dataType: 'name',
        },
        {
          fieldName: 'email',
          dataType: 'email',
        },
        {
          fieldName: 'age',
          dataType: 'number',
          options: {
            min: 18,
            max: 100,
          },
        },
      ];

      const count = 5;
      const result = DataGenerationService.generateData(fields, count);

      expect(result).toHaveLength(count);
      
      result.forEach(record => {
        expect(record).toHaveProperty('name');
        expect(typeof record.name).toBe('string');
        
        expect(record).toHaveProperty('email');
        expect(typeof record.email).toBe('string');
        expect(record.email).toMatch(/@/);
        
        expect(record).toHaveProperty('age');
        expect(typeof record.age).toBe('number');
        expect(record.age).toBeGreaterThanOrEqual(18);
        expect(record.age).toBeLessThanOrEqual(100);
      });
    });

    it('should handle null values according to nullPercentage', () => {
      const fields: SchemaField[] = [
        {
          fieldName: 'optionalField',
          dataType: 'string',
          options: {
            nullPercentage: 100 // Always null
          }
        }
      ];

      const count = 10;
      const result = DataGenerationService.generateData(fields, count);

      expect(result).toHaveLength(count);
      result.forEach(record => {
        expect(record.optionalField).toBeNull();
      });
    });
  });
});
