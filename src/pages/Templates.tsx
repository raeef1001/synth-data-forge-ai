
import React, { useState } from 'react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  ShoppingCart, 
  Building2, 
  CreditCard, 
  MessageSquare,
  BookOpen,
  Gamepad2,
  Heart,
  Music,
  Car,
  Search,
  Star,
  Download,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  fields: number;
  downloads: number;
  rating: number;
  tags: string[];
  preview: any[];
}

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates: Template[] = [
    {
      id: '1',
      name: 'User Profiles',
      description: 'Complete user profile data with personal information, preferences, and social connections',
      category: 'social',
      icon: Users,
      fields: 15,
      downloads: 12500,
      rating: 4.8,
      tags: ['users', 'profiles', 'social', 'personal'],
      preview: [
        { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' }
      ]
    },
    {
      id: '2',
      name: 'E-commerce Products',
      description: 'Product catalog with prices, descriptions, categories, and inventory data',
      category: 'ecommerce',
      icon: ShoppingCart,
      fields: 12,
      downloads: 8900,
      rating: 4.7,
      tags: ['products', 'ecommerce', 'inventory', 'catalog'],
      preview: [
        { id: 1, name: 'Wireless Headphones', price: '$129.99', category: 'Electronics' },
        { id: 2, name: 'Cotton T-Shirt', price: '$24.99', category: 'Clothing' }
      ]
    },
    {
      id: '3',
      name: 'Company Directory',
      description: 'Business information including companies, employees, departments, and organizational structure',
      category: 'business',
      icon: Building2,
      fields: 18,
      downloads: 6700,
      rating: 4.6,
      tags: ['business', 'companies', 'employees', 'directory'],
      preview: [
        { company: 'Tech Corp', industry: 'Technology', employees: 450, location: 'San Francisco' },
        { company: 'Design Studio', industry: 'Creative', employees: 25, location: 'New York' }
      ]
    },
    {
      id: '4',
      name: 'Financial Transactions',
      description: 'Banking and payment data with transactions, accounts, and financial records',
      category: 'finance',
      icon: CreditCard,
      fields: 10,
      downloads: 5400,
      rating: 4.9,
      tags: ['finance', 'transactions', 'banking', 'payments'],
      preview: [
        { id: 'TX001', amount: '$1,250.00', type: 'Deposit', date: '2024-01-15' },
        { id: 'TX002', amount: '$89.99', type: 'Purchase', date: '2024-01-14' }
      ]
    },
    {
      id: '5',
      name: 'Social Media Posts',
      description: 'Social content with posts, comments, likes, and engagement metrics',
      category: 'social',
      icon: MessageSquare,
      fields: 14,
      downloads: 9200,
      rating: 4.5,
      tags: ['social', 'posts', 'comments', 'engagement'],
      preview: [
        { content: 'Just had an amazing coffee at the new cafe downtown! ☕', likes: 42, comments: 8 },
        { content: 'Working on an exciting new project. Can\'t wait to share!', likes: 28, comments: 12 }
      ]
    },
    {
      id: '6',
      name: 'Educational Content',
      description: 'Academic data including courses, students, grades, and learning materials',
      category: 'education',
      icon: BookOpen,
      fields: 16,
      downloads: 4100,
      rating: 4.4,
      tags: ['education', 'courses', 'students', 'academic'],
      preview: [
        { course: 'Introduction to React', instructor: 'Dr. Smith', students: 85, rating: 4.7 },
        { course: 'Advanced JavaScript', instructor: 'Prof. Johnson', students: 62, rating: 4.8 }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates', count: templates.length },
    { id: 'social', name: 'Social & Users', count: templates.filter(t => t.category === 'social').length },
    { id: 'ecommerce', name: 'E-commerce', count: templates.filter(t => t.category === 'ecommerce').length },
    { id: 'business', name: 'Business', count: templates.filter(t => t.category === 'business').length },
    { id: 'finance', name: 'Finance', count: templates.filter(t => t.category === 'finance').length },
    { id: 'education', name: 'Education', count: templates.filter(t => t.category === 'education').length },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Schema <span className="gradient-text">Templates</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started quickly with pre-built schema templates for common use cases. 
              Customize and generate data in minutes.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates by name, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="text-xs">
                    {category.name}
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {category.count}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Templates Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="bg-card/50 backdrop-blur border-slate-700 hover:border-primary/50 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <template.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-muted-foreground ml-1">
                                {template.rating}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {template.downloads.toLocaleString()} downloads
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm leading-relaxed">
                      {template.description}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{template.fields} fields</span>
                      <Badge variant="outline" className="capitalize">
                        {template.category}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {template.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {template.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{template.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Link to="/schema-builder" className="flex-1">
                        <Button size="sm" className="w-full glow-button">
                          <Download className="h-4 w-4 mr-2" />
                          Use Template
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  No templates found matching your criteria.
                </div>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto text-center mt-20">
            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">
                  Can't find what you're looking for?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Create your own custom schema from scratch or request a new template.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/schema-builder">
                    <Button className="glow-button">
                      Build Custom Schema
                    </Button>
                  </Link>
                  <Button variant="outline">
                    Request Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Templates;
