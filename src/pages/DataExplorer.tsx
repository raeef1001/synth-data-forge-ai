
import React, { useState } from 'react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/DataExplorer/DataTable';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Download, Upload } from 'lucide-react';

// Sample data for the explorer
const sampleData = [
  { id: 1, name: "John Smith", age: 32, city: "New York", occupation: "Developer", salary: 85000 },
  { id: 2, name: "Emma Johnson", age: 28, city: "Los Angeles", occupation: "Designer", salary: 72000 },
  { id: 3, name: "Michael Brown", age: 45, city: "Chicago", occupation: "Manager", salary: 110000 },
  { id: 4, name: "Olivia Davis", age: 36, city: "San Francisco", occupation: "Developer", salary: 95000 },
  { id: 5, name: "William Wilson", age: 29, city: "Seattle", occupation: "Analyst", salary: 78000 },
  { id: 6, name: "Sophia Miller", age: 41, city: "Boston", occupation: "Director", salary: 125000 },
  { id: 7, name: "James Taylor", age: 33, city: "Austin", occupation: "Developer", salary: 88000 },
  { id: 8, name: "Isabella Anderson", age: 27, city: "Denver", occupation: "Designer", salary: 70000 },
];

const DataExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDataset, setSelectedDataset] = useState('sample');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Data Explorer</h1>
          <p className="text-muted-foreground mb-8">
            Browse, search, and analyze your generated datasets
          </p>

          <Tabs defaultValue="explorer" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="explorer">Data Explorer</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
              <TabsTrigger value="import">Import</TabsTrigger>
            </TabsList>

            <TabsContent value="explorer" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                      <CardTitle>Data Explorer</CardTitle>
                      <CardDescription>
                        Browse and search through your datasets
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <div className="relative">
                        <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                        <Input
                          placeholder="Search data..."
                          className="pl-8 w-[200px] md:w-[300px]"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 md:items-end">
                      <div className="space-y-2">
                        <Label>Data Source</Label>
                        <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select dataset" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sample">Sample Data</SelectItem>
                            <SelectItem value="users">User Schema Data</SelectItem>
                            <SelectItem value="products">Product Schema Data</SelectItem>
                            <SelectItem value="orders">Order Schema Data</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">8 Records</Badge>
                        <Badge variant="outline">6 Columns</Badge>
                      </div>
                    </div>
                    
                    <DataTable data={sampleData} />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-2">
                    <Select defaultValue="10">
                      <SelectTrigger className="w-[70px]">
                        <SelectValue placeholder="Rows" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground py-2">Showing 1-8 of 8 records</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline">Refresh Data</Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="mt-6">
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">Data Insights</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                  Get automatic insights and analytics from your datasets.
                </p>
                <Button className="glow-button">Coming Soon</Button>
              </div>
            </TabsContent>

            <TabsContent value="export" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Export Data</CardTitle>
                  <CardDescription>
                    Download your data in various formats
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Select Dataset</Label>
                      <Select defaultValue="sample">
                        <SelectTrigger>
                          <SelectValue placeholder="Select dataset" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sample">Sample Data</SelectItem>
                          <SelectItem value="users">User Schema Data</SelectItem>
                          <SelectItem value="products">Product Schema Data</SelectItem>
                          <SelectItem value="orders">Order Schema Data</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Export Format</Label>
                      <Select defaultValue="json">
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                          <SelectItem value="sql">SQL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Options</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="include-headers" className="rounded border-gray-400" />
                          <label htmlFor="include-headers">Include Headers</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="pretty-print" className="rounded border-gray-400" />
                          <label htmlFor="pretty-print">Pretty Print</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="compress" className="rounded border-gray-400" />
                          <label htmlFor="compress">Compress Output</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="all-data" className="rounded border-gray-400" />
                          <label htmlFor="all-data">Export All Data</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Data
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="import" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Import Data</CardTitle>
                  <CardDescription>
                    Upload and import external data sources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <div className="mx-auto flex flex-col items-center justify-center gap-2">
                        <Upload className="h-10 w-10 text-muted-foreground" />
                        <h3 className="text-lg font-medium">Drop files here or click to upload</h3>
                        <p className="text-sm text-muted-foreground">
                          Support for JSON, CSV, and Excel files
                        </p>
                        <Input type="file" className="hidden" id="file-upload" />
                        <Label htmlFor="file-upload" className="cursor-pointer">
                          <Button variant="outline" className="mt-2" onClick={(e) => e.preventDefault()}>
                            Select Files
                          </Button>
                        </Label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Import Options</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="replace-existing" className="rounded border-gray-400" />
                          <label htmlFor="replace-existing">Replace Existing Data</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="validate" className="rounded border-gray-400" defaultChecked />
                          <label htmlFor="validate">Validate Against Schema</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full glow-button">Import Data</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DataExplorer;
