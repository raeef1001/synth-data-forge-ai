import { faker } from '@faker-js/faker';
import { SchemaField } from '../models/schema';

export class DataGenerationService {
  private static generateField(field: SchemaField): any {
    const { dataType, options = {} } = field;
    const { nullPercentage = 0 } = options;

    // Check if this field should be null based on nullPercentage
    if (nullPercentage > 0 && Math.random() * 100 <= nullPercentage) {
      return null;
    }

    switch (dataType) {
      case 'string':
        return options.length 
          ? faker.string.alpha({ length: options.length })
          : faker.string.sample();

      case 'number':
        return options.min !== undefined && options.max !== undefined
          ? faker.number.int({ min: options.min, max: options.max })
          : faker.number.int();

      case 'boolean':
        return faker.datatype.boolean();

      case 'date':
        return faker.date.between({
          from: options.min ? new Date(options.min) : new Date('2000-01-01'),
          to: options.max ? new Date(options.max) : new Date()
        });

      case 'email':
        return faker.internet.email();

      case 'phone':
        return faker.phone.number();

      case 'address':
        return {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          country: faker.location.country(),
          zipCode: faker.location.zipCode()
        };

      case 'name':
        return faker.person.fullName();

      case 'company':
        return faker.company.name();

      case 'url':
        return faker.internet.url();

      case 'uuid':
        return faker.string.uuid();

      case 'color':
        return faker.color.rgb();

      case 'aiText':
        // For now, generate placeholder AI text using lorem paragraphs
        // In a real implementation, this would use an LLM or more sophisticated generation
        return faker.lorem.paragraphs();

      default:
        return faker.string.sample();
    }
  }

  static generateData(fields: SchemaField[], count: number): any[] {
    const data = [];
    
    for (let i = 0; i < count; i++) {
      const record: any = {};
      
      for (const field of fields) {
        record[field.fieldName] = this.generateField(field);
      }
      
      data.push(record);
    }
    
    return data;
  }
}
