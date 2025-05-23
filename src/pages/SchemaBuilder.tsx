
import React, { useState } from 'react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SchemaBuilder, SchemaField } from '@/components/SchemaBuilder/SchemaBuilder';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Save, Play, Download, Share2, Wand2 } from 'lucide-react';
import { toast } from 'sonner';

const SchemaBuilderPage = () => {
  const [schemaName, setSchemaName] = useState('');
  const [schemaDescription, setSchemaDescription] = useState('');
  const [fields, setFields] = useState<SchemaField[]>([]);
  const [recordCount, setRecordCount] = useState([1000]);
  const [aiDescription, setAiDescription] = useState('');
  const [preserveRelationships, setPreserveRelationships] = useState(true);
  const [exportFormat, setExportFormat] = useState('json');

  const handleSaveSchema = () => {
    if (!schemaName.trim()) {
      toast.error('Please enter a schema name');
      return;
    }
    if (fields.length === 0) {
      toast.error('Please add at least one field');
      return;
    }
    
    const schema = {
      name: schemaName,
      description: schemaDescription,
      fields,
      recordCount: recordCount[0],
      preserveRelationships,
      createdAt: new Date().toISOString(),
    };
    
    // Save to localStorage for demo
    const savedSchemas = JSON.parse(localStorage.getItem('schemas') || '[]');
    savedSchemas.push(schema);
    localStorage.setItem('schemas', JSON.stringify(savedSchemas));
    
    toast.success('Schema saved successfully!');
  };

  const handleGenerateFromAI = () => {
    if (!aiDescription.trim()) {
      toast.error('Please describe what data you need');
      return;
    }
    
    // Simulate AI schema generation
    const aiFields: SchemaField[] = [
      {
        id: '1',
        name: 'id',
        type: 'uuid',
        required: true,
        nullable: false,
        nullRate: 0,
      },
      {
        id: '2',
        name: 'name',
        type: 'fullName',
        required: true,
        nullable: false,
        nullRate: 0,
      },
      {
        id: '3',
        name: 'email',
        type: 'email',
        required: true,
        nullable: false,
        nullRate: 0,
      },
      {
        id: '4',
        name: 'description',
        type: 'aiText',
        required: false,
        nullable: true,
        nullRate: 15,
        aiOptions: {
          style: 'professional',
          context: aiDescription,
        },
      },
    ];
    
    setFields(aiFields);
    setSchemaName('AI Generated Schema');
    setSchemaDescription(`Schema generated from: "${aiDescription}"`);
    toast.success('AI schema generated! You can now customize the fields.');
  };

  const handleGenerateData = () => {
    if (fields.length === 0) {
      toast.error('Please add fields to your schema first');
      return;
    }
    
    toast.success(`Generating ${recordCount[0]} records...`);
    // Here you would typically call your data generation API
  };

  const getSchemaStats = () => {
    const totalFields = fields.length;
    const requiredFields = fields.filter(f => f.required).length;
    const aiFields = fields.filter(f => f.type.startsWith('ai')).length;
    const nullableFields = fields.filter(f => f.nullable).length;
    
    return { totalFields, requiredFields, aiFields, nullableFields };
  };

  const stats = getSchemaStats();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Advanced <span className="gradient-text">Schema Builder</span>
              </h1>
              <p className="text-muted-foreground">
                Create complex data schemas with drag-and-drop functionality and AI-powered generation
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Builder */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Schema Configuration</CardTitle>
                    <CardDescription>
                      Define your schema details and generation options
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Tabs defaultValue="basic" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="basic">Basic Info</TabsTrigger>
                        <TabsTrigger value="ai">AI Assistant</TabsTrigger>
                        <TabsTrigger value="advanced">Advanced</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="basic" className="space-y-4">
                        <div>
                          <Label htmlFor="schemaName">Schema Name</Label>
                          <Input
                            id="schemaName"
                            value={schemaName}
                            onChange={(e) => setSchemaName(e.target.value)}
                            placeholder="e.g., User Profiles, Product Catalog"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="schemaDescription">Description</Label>
                          <Textarea
                            id="schemaDescription"
                            value={schemaDescription}
                            onChange={(e) => setSchemaDescription(e.target.value)}
                            placeholder="Describe what this schema represents..."
                          />
                        </div>
                        
                        <div>
                          <Label>Number of Records: {recordCount[0].toLocaleString()}</Label>
                          <Slider
                            value={recordCount}
                            onValueChange={setRecordCount}
                            max={100000}
                            min={10}
                            step={10}
                            className="mt-2"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>10</span>
                            <span>100,000</span>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="ai" className="space-y-4">
                        <div>
                          <Label htmlFor="aiDescription">Describe Your Data Needs</Label>
                          <Textarea
                            id="aiDescription"
                            value={aiDescription}
                            onChange={(e) => setAiDescription(e.target.value)}
                            placeholder="e.g., I need user data for an e-commerce platform with profiles, orders, and reviews..."
                            rows={4}
                          />
                        </div>
                        
                        <Button onClick={handleGenerateFromAI} className="glow-button w-full">
                          <Wand2 className="h-4 w-4 mr-2" />
                          Generate Schema with AI
                        </Button>
                        
                        <div className="text-sm text-muted-foreground">
                          AI will analyze your description and suggest an appropriate schema structure with relevant fields and data types.
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="advanced" className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={preserveRelationships}
                            onCheckedChange={setPreserveRelationships}
                          />
                          <Label>Preserve Data Relationships</Label>
                        </div>
                        
                        <div>
                          <Label>Default Export Format</Label>
                          <select
                            value={exportFormat}
                            onChange={(e) => setExportFormat(e.target.value)}
                            className="w-full mt-1 px-3 py-2 border border-input bg-background rounded-md"
                          >
                            <option value="json">JSON</option>
                            <option value="csv">CSV</option>
                            <option value="sql">SQL</option>
                            <option value="xml">XML</option>
                            <option value="excel">Excel</option>
                          </select>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Schema Builder Component */}
                <Card>
                  <CardHeader>
                    <CardTitle>Field Designer</CardTitle>
                    <CardDescription>
                      Drag and drop to reorder fields, click settings to configure advanced options
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SchemaBuilder fields={fields} onFieldsChange={setFields} />
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Schema Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Schema Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{stats.totalFields}</div>
                        <div className="text-xs text-muted-foreground">Total Fields</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-500">{stats.requiredFields}</div>
                        <div className="text-xs text-muted-foreground">Required</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-500">{stats.aiFields}</div>
                        <div className="text-xs text-muted-foreground">AI Fields</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-500">{stats.nullableFields}</div>
                        <div className="text-xs text-muted-foreground">Nullable</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Estimated Size:</span>
                        <Badge variant="outline">{(recordCount[0] * stats.totalFields * 0.1).toFixed(1)} MB</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Generation Time:</span>
                        <Badge variant="outline">~{Math.ceil(recordCount[0] / 1000)} min</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button onClick={handleSaveSchema} variant="outline" className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save Schema
                    </Button>
                    
                    <Button onClick={handleGenerateData} className="w-full glow-button">
                      <Play className="h-4 w-4 mr-2" />
                      Generate Data
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Export Schema
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Schema
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Tips */}
                <Card>
                  <CardHeader>
                    <CardTitle>💡 Pro Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div>• Use AI fields for realistic content generation</div>
                    <div>• Set appropriate null rates for realistic data</div>
                    <div>• Define constraints to ensure data quality</div>
                    <div>• Use relationships to maintain data integrity</div>
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

export default SchemaBuilderPage;
