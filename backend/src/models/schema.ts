export interface SchemaField {
  fieldName: string;
  dataType: string;
  options?: {
    min?: number;
    max?: number;
    length?: number;
    format?: string;
    values?: string[];
    nullable?: boolean;
    nullPercentage?: number;
  };
}

export interface Schema {
  id?: string;
  userId: string;
  name: string;
  description: string;
  fields: SchemaField[];
  createdAt: Date;
  updatedAt: Date;
}
