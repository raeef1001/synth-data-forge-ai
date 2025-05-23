
import React, { useState } from 'react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { DataVisualizer } from '@/components/DataVisualization/DataVisualizer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { FileUpload } from '@/components/DataVisualization/FileUpload';

const DataVisualization = () => {
  const [dataSource, setDataSource] = useState<string>('upload');
  const [data, setData] = useState<any[] | null>(null);
  const [visualizationType, setVisualizationType] = useState<string>('bar');

  const handleDataLoaded = (loadedData: any[]) => {
    setData(loadedData);
    toast({
      title: "Data loaded successfully",
      description: `Loaded ${loadedData.length} records`,
    });
  };

  const handleGenerateSample = () => {
    // Generate sample data for visualization
    const sampleData = Array.from({ length: 10 }, (_, i) => ({
      name: `Item ${i + 1}`,
      value: Math.floor(Math.random() * 1000),
      category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)]
    }));
    setData(sampleData);
    toast({
      title: "Sample data generated",
      description: "Created 10 random data points for visualization",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Data Visualization</h1>
          <p className="text-muted-foreground mb-8">
            Visualize your data with interactive charts and graphs
          </p>

          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="create">Create Visualization</TabsTrigger>
              <TabsTrigger value="gallery">Community Gallery</TabsTrigger>
              <TabsTrigger value="saved">My Visualizations</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="mt-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Source</CardTitle>
                  <CardDescription>
                    Select or upload data for visualization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Button 
                      variant={dataSource === 'upload' ? "default" : "outline"} 
                      className="w-full"
                      onClick={() => setDataSource('upload')}
                    >
                      Upload Data
                    </Button>
                    <Button 
                      variant={dataSource === 'schema' ? "default" : "outline"} 
                      className="w-full"
                      onClick={() => setDataSource('schema')}
                    >
                      Use Schema Data
                    </Button>
                    <Button 
                      variant={dataSource === 'sample' ? "default" : "outline"} 
                      className="w-full"
                      onClick={() => {
                        setDataSource('sample');
                        handleGenerateSample();
                      }}
                    >
                      Sample Data
                    </Button>
                  </div>

                  {dataSource === 'upload' && (
                    <FileUpload onDataLoaded={handleDataLoaded} />
                  )}

                  {dataSource === 'schema' && (
                    <div className="space-y-4">
                      <p>Select a schema to visualize its generated data:</p>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select schema" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User Schema</SelectItem>
                          <SelectItem value="product">Product Schema</SelectItem>
                          <SelectItem value="order">Order Schema</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={() => handleGenerateSample()}>Load Schema Data</Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {data && (
                <Card>
                  <CardHeader>
                    <CardTitle>Visualization Options</CardTitle>
                    <CardDescription>
                      Customize your visualization
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Chart Type</label>
                        <Select value={visualizationType} onValueChange={setVisualizationType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select chart type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bar">Bar Chart</SelectItem>
                            <SelectItem value="line">Line Chart</SelectItem>
                            <SelectItem value="pie">Pie Chart</SelectItem>
                            <SelectItem value="scatter">Scatter Plot</SelectItem>
                            <SelectItem value="area">Area Chart</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">X Axis</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(data[0]).map(key => (
                              <SelectItem key={key} value={key}>{key}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Y Axis</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(data[0]).map(key => (
                              <SelectItem key={key} value={key}>{key}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Reset</Button>
                    <Button>Apply Changes</Button>
                  </CardFooter>
                </Card>
              )}

              {data && (
                <Card>
                  <CardHeader>
                    <CardTitle>Visualization Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="w-full aspect-[16/9] bg-muted/5 rounded-lg border border-border p-4">
                      <DataVisualizer 
                        data={data} 
                        type={visualizationType} 
                        xKey="name" 
                        yKey="value" 
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Export Image</Button>
                    <Button className="glow-button">Share Visualization</Button>
                  </CardFooter>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="gallery" className="mt-4">
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">Discover Community Visualizations</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                  Browse through data visualizations shared by the community. Get inspired, learn from others, and share your own creations.
                </p>
                <Button className="glow-button">Coming Soon</Button>
              </div>
            </TabsContent>

            <TabsContent value="saved" className="mt-4">
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">Your Saved Visualizations</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                  Access your saved visualizations and continue working on them.
                </p>
                <Button className="glow-button">Coming Soon</Button>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="mt-4">
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">Visualization Templates</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                  Use pre-built visualization templates to get started quickly.
                </p>
                <Button className="glow-button">Coming Soon</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DataVisualization;
