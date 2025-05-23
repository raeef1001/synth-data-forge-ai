export interface Dataset {
  id?: string;
  schemaId: string;
  userId: string;
  name: string;
  rowCount: number;
  generatedAt: Date;
  apiEndpointPath: string;
  status: 'generating' | 'ready' | 'error';
  errorMessage?: string;
}
