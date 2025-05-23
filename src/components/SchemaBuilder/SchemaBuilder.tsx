
import React, { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Trash2, GripVertical, Settings, Plus, Copy } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface SchemaField {
  id: string;
  name: string;
  type: string;
  required: boolean;
  nullable: boolean;
  nullRate: number;
  defaultValue?: string;
  constraints?: {
    min?: number;
    max?: number;
    length?: number;
    pattern?: string;
    enum?: string[];
  };
  aiOptions?: {
    style?: string;
    context?: string;
    language?: string;
  };
}

interface SchemaBuilderProps {
  fields: SchemaField[];
  onFieldsChange: (fields: SchemaField[]) => void;
}

const fieldTypes = [
  { value: 'string', label: 'String', category: 'Basic' },
  { value: 'number', label: 'Number', category: 'Basic' },
  { value: 'boolean', label: 'Boolean', category: 'Basic' },
  { value: 'date', label: 'Date', category: 'Basic' },
  { value: 'email', label: 'Email', category: 'Contact' },
  { value: 'phone', label: 'Phone', category: 'Contact' },
  { value: 'url', label: 'URL', category: 'Basic' },
  { value: 'uuid', label: 'UUID', category: 'Technical' },
  { value: 'firstName', label: 'First Name', category: 'Personal' },
  { value: 'lastName', label: 'Last Name', category: 'Personal' },
  { value: 'fullName', label: 'Full Name', category: 'Personal' },
  { value: 'address', label: 'Address', category: 'Location' },
  { value: 'city', label: 'City', category: 'Location' },
  { value: 'country', label: 'Country', category: 'Location' },
  { value: 'zipCode', label: 'Zip Code', category: 'Location' },
  { value: 'company', label: 'Company', category: 'Business' },
  { value: 'jobTitle', label: 'Job Title', category: 'Business' },
  { value: 'department', label: 'Department', category: 'Business' },
  { value: 'price', label: 'Price', category: 'Commerce' },
  { value: 'currency', label: 'Currency', category: 'Commerce' },
  { value: 'productName', label: 'Product Name', category: 'Commerce' },
  { value: 'aiText', label: 'AI Generated Text', category: 'AI' },
  { value: 'aiDescription', label: 'AI Description', category: 'AI' },
  { value: 'aiReview', label: 'AI Review', category: 'AI' },
  { value: 'aiBio', label: 'AI Biography', category: 'AI' },
];

export const SchemaBuilder: React.FC<SchemaBuilderProps> = ({ fields, onFieldsChange }) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addField = useCallback(() => {
    const newField: SchemaField = {
      id: generateId(),
      name: `field_${fields.length + 1}`,
      type: 'string',
      required: false,
      nullable: true,
      nullRate: 10,
    };
    onFieldsChange([...fields, newField]);
  }, [fields, onFieldsChange]);

  const duplicateField = useCallback((field: SchemaField) => {
    const newField: SchemaField = {
      ...field,
      id: generateId(),
      name: `${field.name}_copy`,
    };
    onFieldsChange([...fields, newField]);
  }, [fields, onFieldsChange]);

  const removeField = useCallback((id: string) => {
    onFieldsChange(fields.filter(field => field.id !== id));
  }, [fields, onFieldsChange]);

  const updateField = useCallback((id: string, updates: Partial<SchemaField>) => {
    onFieldsChange(fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  }, [fields, onFieldsChange]);

  const onDragEnd = useCallback((result: any) => {
    if (!result.destination) return;

    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onFieldsChange(items);
    setDraggedItem(null);
  }, [fields, onFieldsChange]);

  const FieldConfigDialog = ({ field }: { field: SchemaField }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Configure Field: {field.name}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="constraints">Constraints</TabsTrigger>
            <TabsTrigger value="ai">AI Options</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <div>
              <Label htmlFor="fieldName">Field Name</Label>
              <Input
                id="fieldName"
                value={field.name}
                onChange={(e) => updateField(field.id, { name: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="fieldType">Data Type</Label>
              <Select
                value={field.type}
                onValueChange={(value) => updateField(field.id, { type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fieldTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center space-x-2">
                        <span>{type.label}</span>
                        <Badge variant="secondary" className="text-xs">
                          {type.category}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                checked={field.required}
                onCheckedChange={(checked) => updateField(field.id, { required: checked })}
              />
              <Label>Required</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                checked={field.nullable}
                onCheckedChange={(checked) => updateField(field.id, { nullable: checked })}
              />
              <Label>Allow Null Values</Label>
            </div>
            
            {field.nullable && (
              <div>
                <Label>Null Rate: {field.nullRate}%</Label>
                <Slider
                  value={[field.nullRate]}
                  onValueChange={([value]) => updateField(field.id, { nullRate: value })}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="constraints" className="space-y-4">
            {(field.type === 'string' || field.type === 'aiText') && (
              <div>
                <Label htmlFor="maxLength">Max Length</Label>
                <Input
                  id="maxLength"
                  type="number"
                  value={field.constraints?.length || ''}
                  onChange={(e) => updateField(field.id, {
                    constraints: { ...field.constraints, length: parseInt(e.target.value) || undefined }
                  })}
                />
              </div>
            )}
            
            {field.type === 'number' && (
              <>
                <div>
                  <Label htmlFor="minValue">Min Value</Label>
                  <Input
                    id="minValue"
                    type="number"
                    value={field.constraints?.min || ''}
                    onChange={(e) => updateField(field.id, {
                      constraints: { ...field.constraints, min: parseInt(e.target.value) || undefined }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="maxValue">Max Value</Label>
                  <Input
                    id="maxValue"
                    type="number"
                    value={field.constraints?.max || ''}
                    onChange={(e) => updateField(field.id, {
                      constraints: { ...field.constraints, max: parseInt(e.target.value) || undefined }
                    })}
                  />
                </div>
              </>
            )}
            
            <div>
              <Label htmlFor="pattern">Regex Pattern</Label>
              <Input
                id="pattern"
                value={field.constraints?.pattern || ''}
                onChange={(e) => updateField(field.id, {
                  constraints: { ...field.constraints, pattern: e.target.value || undefined }
                })}
                placeholder="^[A-Z]{2,4}$"
              />
            </div>
            
            <div>
              <Label htmlFor="defaultValue">Default Value</Label>
              <Input
                id="defaultValue"
                value={field.defaultValue || ''}
                onChange={(e) => updateField(field.id, { defaultValue: e.target.value || undefined })}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-4">
            {field.type.startsWith('ai') && (
              <>
                <div>
                  <Label htmlFor="aiStyle">Writing Style</Label>
                  <Select
                    value={field.aiOptions?.style || 'professional'}
                    onValueChange={(value) => updateField(field.id, {
                      aiOptions: { ...field.aiOptions, style: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="aiContext">Context/Topic</Label>
                  <Textarea
                    id="aiContext"
                    value={field.aiOptions?.context || ''}
                    onChange={(e) => updateField(field.id, {
                      aiOptions: { ...field.aiOptions, context: e.target.value }
                    })}
                    placeholder="Provide context for AI generation..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="aiLanguage">Language</Label>
                  <Select
                    value={field.aiOptions?.language || 'en'}
                    onValueChange={(value) => updateField(field.id, {
                      aiOptions: { ...field.aiOptions, language: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Schema Fields</h3>
        <Button onClick={addField} className="glow-button">
          <Plus className="h-4 w-4 mr-2" />
          Add Field
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="schema-fields">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {fields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided, snapshot) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`transition-all duration-200 ${
                        snapshot.isDragging ? 'shadow-lg ring-2 ring-primary/50' : ''
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div
                            {...provided.dragHandleProps}
                            className="cursor-grab active:cursor-grabbing"
                          >
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                          </div>
                          
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label className="text-xs text-muted-foreground">Name</Label>
                              <Input
                                value={field.name}
                                onChange={(e) => updateField(field.id, { name: e.target.value })}
                                className="h-8"
                              />
                            </div>
                            
                            <div>
                              <Label className="text-xs text-muted-foreground">Type</Label>
                              <Select
                                value={field.type}
                                onValueChange={(value) => updateField(field.id, { type: value })}
                              >
                                <SelectTrigger className="h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {fieldTypes.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {field.required && <Badge variant="secondary">Required</Badge>}
                              {field.nullable && <Badge variant="outline">Nullable</Badge>}
                              {field.type.startsWith('ai') && <Badge className="bg-primary">AI</Badge>}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <FieldConfigDialog field={field} />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => duplicateField(field)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeField(field.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {fields.length === 0 && (
        <Card className="border-dashed border-2 border-muted-foreground/25">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="text-muted-foreground">
                No fields added yet. Create your first field to get started.
              </div>
              <Button onClick={addField} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Field
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
