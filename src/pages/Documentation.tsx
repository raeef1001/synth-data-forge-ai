
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Book, Code, Database, Zap, Shield, Users } from 'lucide-react';

const Documentation = () => {
  const docSections = [
    {
      icon: Book,
      title: 'Getting Started',
      description: 'Learn the basics of DataForge and create your first dataset',
      items: [
        'Quick Start Guide',
        'Creating Your First Schema',
        'Understanding Data Types',
        'Generating Your First Dataset'
      ]
    },
    {
      icon: Database,
      title: 'Schema Definition',
      description: 'Master the art of creating complex data schemas',
      items: [
        'Field Types & Options',
        'Relationships & Constraints',
        'Custom Formulas',
        'AI-Powered Schema Suggestions'
      ]
    },
    {
      icon: Code,
      title: 'API Reference',
      description: 'Complete API documentation and examples',
      items: [
        'Authentication',
        'Endpoints Overview',
        'Request/Response Format',
        'Error Handling'
      ]
    },
    {
      icon: Zap,
      title: 'Advanced Features',
      description: 'Unlock the full potential of DataForge',
      items: [
        'Custom Data Types',
        'Bulk Operations',
        'Webhooks',
        'Custom Export Formats'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="gradient-text">Documentation</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about DataForge. From basic concepts to advanced features.
            </p>
          </div>

          {/* Quick Start */}
          <div className="max-w-4xl mx-auto mb-20">
            <Card className="bg-primary/10 border-primary/20">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Zap className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl">Quick Start</CardTitle>
                </div>
                <CardDescription>
                  Get up and running with DataForge in under 5 minutes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Badge variant="secondary">Step 1</Badge>
                    <h3 className="font-semibold">Sign Up</h3>
                    <p className="text-sm text-muted-foreground">
                      Create your free account and access the dashboard
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary">Step 2</Badge>
                    <h3 className="font-semibold">Define Schema</h3>
                    <p className="text-sm text-muted-foreground">
                      Create your data structure using our intuitive schema builder
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary">Step 3</Badge>
                    <h3 className="font-semibold">Generate Data</h3>
                    <p className="text-sm text-muted-foreground">
                      Click generate and get your data via API or download
                    </p>
                  </div>
                </div>
                <Button className="glow-button">
                  Start Building Now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Documentation Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
            {docSections.map((section, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur border-slate-700 hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* API Example */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              API Example
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-card/50 backdrop-blur border-slate-700">
                <CardHeader>
                  <CardTitle>Request</CardTitle>
                  <CardDescription>Get users from your generated dataset</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="code-block">
                    <pre>{`GET /api/datasets/users
Authorization: Bearer your-api-key

curl -H "Authorization: Bearer your-api-key" \\
  https://api.dataforge.dev/datasets/users`}</pre>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur border-slate-700">
                <CardHeader>
                  <CardTitle>Response</CardTitle>
                  <CardDescription>JSON response with generated user data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="code-block">
                    <pre>{`{
  "data": [
    {
      "id": 1,
      "name": "Sarah Johnson",
      "email": "sarah.j@example.com",
      "avatar": "https://api.dataforge.dev/...",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "total": 1000,
    "page": 1,
    "per_page": 20
  }
}`}</pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Documentation;
