
import React, { useState } from 'react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Play, Download, Copy, RefreshCw, Settings, Code, Eye } from 'lucide-react';
import { toast } from 'sonner';

const Playground = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('users');
  const [recordCount, setRecordCount] = useState('10');
  const [customParams, setCustomParams] = useState('');
  const [generatedData, setGeneratedData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const endpoints = [
    {
      id: 'users',
      name: 'Users',
      description: 'Generate user profile data',
      sampleFields: ['id', 'name', 'email', 'avatar', 'created_at'],
      params: ['limit', 'gender', 'age_min', 'age_max']
    },
    {
      id: 'products',
      name: 'Products',
      description: 'Generate e-commerce product data',
      sampleFields: ['id', 'name', 'price', 'category', 'description', 'in_stock'],
      params: ['limit', 'category', 'price_min', 'price_max']
    },
    {
      id: 'orders',
      name: 'Orders',
      description: 'Generate order and transaction data',
      sampleFields: ['id', 'user_id', 'total', 'status', 'items', 'created_at'],
      params: ['limit', 'status', 'date_from', 'date_to']
    },
    {
      id: 'posts',
      name: 'Posts',
      description: 'Generate social media post data',
      sampleFields: ['id', 'user_id', 'content', 'likes', 'comments', 'created_at'],
      params: ['limit', 'content_type', 'min_likes', 'has_image']
    },
    {
      id: 'companies',
      name: 'Companies',
      description: 'Generate company and business data',
      sampleFields: ['id', 'name', 'industry', 'employees', 'location', 'founded'],
      params: ['limit', 'industry', 'size', 'country']
    }
  ];

  const generateSampleData = (endpoint: string, count: number) => {
    const sampleData: any = {
      users: Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=User${i + 1}`,
        created_at: new Date(Date.now() - Math.random() * 10000000000).toISOString()
      })),
      products: Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        price: (Math.random() * 200 + 10).toFixed(2),
        category: ['Electronics', 'Clothing', 'Books', 'Home'][Math.floor(Math.random() * 4)],
        description: `High-quality product ${i + 1} with amazing features`,
        in_stock: Math.random() > 0.2
      })),
      orders: Array.from({ length: count }, (_, i) => ({
        id: `ORD-${(i + 1).toString().padStart(4, '0')}`,
        user_id: Math.floor(Math.random() * 100) + 1,
        total: (Math.random() * 500 + 20).toFixed(2),
        status: ['pending', 'processing', 'shipped', 'delivered'][Math.floor(Math.random() * 4)],
        items: Math.floor(Math.random() * 5) + 1,
        created_at: new Date(Date.now() - Math.random() * 10000000000).toISOString()
      })),
      posts: Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        user_id: Math.floor(Math.random() * 100) + 1,
        content: `This is post content ${i + 1}. It contains interesting information and thoughts.`,
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 100),
        created_at: new Date(Date.now() - Math.random() * 10000000000).toISOString()
      })),
      companies: Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `Company ${i + 1}`,
        industry: ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail'][Math.floor(Math.random() * 5)],
        employees: Math.floor(Math.random() * 10000) + 10,
        location: ['New York', 'San Francisco', 'London', 'Tokyo', 'Berlin'][Math.floor(Math.random() * 5)],
        founded: Math.floor(Math.random() * 50) + 1970
      }))
    };

    return sampleData[endpoint] || [];
  };

  const handleGenerate = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const data = generateSampleData(selectedEndpoint, parseInt(recordCount));
      setGeneratedData(data);
      setLoading(false);
      toast.success(`Generated ${data.length} records`);
    }, 1000);
  };

  const handleCopyData = () => {
    navigator.clipboard.writeText(JSON.stringify(generatedData, null, 2));
    toast.success('Data copied to clipboard');
  };

  const handleDownloadData = () => {
    const blob = new Blob([JSON.stringify(generatedData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedEndpoint}_data.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Data downloaded');
  };

  const selectedEndpointData = endpoints.find(e => e.id === selectedEndpoint);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                API <span className="gradient-text">Playground</span>
              </h1>
              <p className="text-muted-foreground">
                Test our data generation APIs interactively. Generate, preview, and download sample data instantly.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Configuration Panel */}
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>API Configuration</CardTitle>
                    <CardDescription>
                      Configure your API request parameters
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="endpoint">Endpoint</Label>
                      <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {endpoints.map((endpoint) => (
                            <SelectItem key={endpoint.id} value={endpoint.id}>
                              <div>
                                <div className="font-medium">{endpoint.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {endpoint.description}
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="recordCount">Number of Records</Label>
                      <Select value={recordCount} onValueChange={setRecordCount}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 records</SelectItem>
                          <SelectItem value="10">10 records</SelectItem>
                          <SelectItem value="25">25 records</SelectItem>
                          <SelectItem value="50">50 records</SelectItem>
                          <SelectItem value="100">100 records</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="customParams">Custom Parameters (JSON)</Label>
                      <Textarea
                        id="customParams"
                        value={customParams}
                        onChange={(e) => setCustomParams(e.target.value)}
                        placeholder='{"category": "electronics", "price_min": 10}'
                        rows={3}
                      />
                    </div>

                    <Button 
                      onClick={handleGenerate} 
                      className="w-full glow-button"
                      disabled={loading}
                    >
                      {loading ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Play className="h-4 w-4 mr-2" />
                      )}
                      Generate Data
                    </Button>
                  </CardContent>
                </Card>

                {/* Endpoint Info */}
                {selectedEndpointData && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Endpoint Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">URL</Label>
                        <div className="code-block text-xs">
                          GET /api/data/{selectedEndpoint}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Response Fields</Label>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {selectedEndpointData.sampleFields.map((field) => (
                            <Badge key={field} variant="secondary" className="text-xs">
                              {field}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Available Parameters</Label>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {selectedEndpointData.params.map((param) => (
                            <Badge key={param} variant="outline" className="text-xs">
                              {param}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Results Panel */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Generated Data</CardTitle>
                        <CardDescription>
                          {generatedData.length > 0 
                            ? `${generatedData.length} records generated`
                            : 'Configure and generate data to see results'
                          }
                        </CardDescription>
                      </div>
                      {generatedData.length > 0 && (
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={handleCopyData}>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleDownloadData}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {generatedData.length > 0 ? (
                      <Tabs defaultValue="table" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="table">
                            <Eye className="h-4 w-4 mr-2" />
                            Table View
                          </TabsTrigger>
                          <TabsTrigger value="json">
                            <Code className="h-4 w-4 mr-2" />
                            JSON View
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="table" className="mt-4">
                          <div className="border border-slate-700 rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead className="bg-muted">
                                  <tr>
                                    {Object.keys(generatedData[0] || {}).map((key) => (
                                      <th key={key} className="px-4 py-2 text-left font-medium">
                                        {key}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {generatedData.slice(0, 10).map((row, index) => (
                                    <tr key={index} className="border-t border-slate-700">
                                      {Object.values(row).map((value: any, cellIndex) => (
                                        <td key={cellIndex} className="px-4 py-2">
                                          {typeof value === 'object' 
                                            ? JSON.stringify(value)
                                            : String(value).length > 50
                                              ? String(value).substring(0, 50) + '...'
                                              : String(value)
                                          }
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            {generatedData.length > 10 && (
                              <div className="p-4 text-center text-sm text-muted-foreground bg-muted/50">
                                Showing first 10 of {generatedData.length} records
                              </div>
                            )}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="json" className="mt-4">
                          <div className="code-block max-h-96 overflow-auto">
                            <pre>{JSON.stringify(generatedData, null, 2)}</pre>
                          </div>
                        </TabsContent>
                      </Tabs>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No data generated yet. Click "Generate Data" to get started.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Request Example */}
                <Card>
                  <CardHeader>
                    <CardTitle>Request Example</CardTitle>
                    <CardDescription>
                      Example code to make the same request
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="curl" className="w-full">
                      <TabsList>
                        <TabsTrigger value="curl">cURL</TabsTrigger>
                        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                        <TabsTrigger value="python">Python</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="curl" className="mt-4">
                        <div className="code-block">
                          <pre>{`curl -X GET "https://api.dataforge.dev/data/${selectedEndpoint}?limit=${recordCount}" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}</pre>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="javascript" className="mt-4">
                        <div className="code-block">
                          <pre>{`fetch('https://api.dataforge.dev/data/${selectedEndpoint}?limit=${recordCount}', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}</pre>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="python" className="mt-4">
                        <div className="code-block">
                          <pre>{`import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.dataforge.dev/data/${selectedEndpoint}?limit=${recordCount}',
    headers=headers
)

data = response.json()
print(data)`}</pre>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Playground;
