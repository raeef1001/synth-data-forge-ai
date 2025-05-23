import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import * as api from '../lib/api';
import { Schema } from '../../backend/src/models/schema';
import { Dataset } from '../../backend/src/models/dataset';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { useToast } from '../hooks/use-toast';

export default function Dashboard() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const [schemas, setSchemas] = useState<Schema[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [schemasData, datasetsData, statsData] = await Promise.all([
          api.getSchemas(),
          api.getDatasets(),
          api.getUserStats(),
        ]);

        setSchemas(schemasData);
        setDatasets(datasetsData);
        setStats(statsData);
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [toast]);

  const handleCreateSchema = () => {
    navigate('/schema-builder');
  };

  const handleEditSchema = (schemaId: string) => {
    navigate(`/schema-builder?id=${schemaId}`);
  };

  const handleDeleteSchema = async (schemaId: string) => {
    try {
      await api.deleteSchema(schemaId);
      setSchemas(schemas.filter((schema) => schema.id !== schemaId));
      toast({
        title: 'Success',
        description: 'Schema deleted successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleViewDataset = (datasetId: string) => {
    navigate(`/data-explorer?id=${datasetId}`);
  };

  const handleDeleteDataset = async (datasetId: string) => {
    try {
      await api.deleteDataset(datasetId);
      setDatasets(datasets.filter((dataset) => dataset.id !== datasetId));
      toast({
        title: 'Success',
        description: 'Dataset deleted successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* User Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {userProfile?.displayName}!</h1>
        <p className="text-muted-foreground">
          Your current plan: {userProfile?.subscriptionTier}
        </p>
      </div>

      {/* Stats Overview */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <h3 className="font-semibold">Schemas</h3>
          <p className="mt-2 text-2xl font-bold">
            {stats?.schemas.total} / {stats?.schemas.limit}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold">Datasets Generated</h3>
          <p className="mt-2 text-2xl font-bold">{stats?.datasets.generated}</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold">API Calls</h3>
          <p className="mt-2 text-2xl font-bold">{stats?.api.callsMade}</p>
        </Card>
      </div>

      {/* Schemas Section */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your Schemas</h2>
          <Button onClick={handleCreateSchema}>Create New Schema</Button>
        </div>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schemas.map((schema) => (
                <TableRow key={schema.id}>
                  <TableCell>{schema.name}</TableCell>
                  <TableCell>{schema.description}</TableCell>
                  <TableCell>
                    {new Date(schema.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => handleEditSchema(schema.id!)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteSchema(schema.id!)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Datasets Section */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">Recent Datasets</h2>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Schema</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Generated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {datasets.map((dataset) => (
                <TableRow key={dataset.id}>
                  <TableCell>{dataset.name}</TableCell>
                  <TableCell>
                    {schemas.find((s) => s.id === dataset.schemaId)?.name}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        dataset.status === 'ready'
                          ? 'bg-green-100 text-green-800'
                          : dataset.status === 'generating'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {dataset.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(dataset.generatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => handleViewDataset(dataset.id!)}
                    >
                      View
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteDataset(dataset.id!)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
