
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Database, Zap, Code, Shield, Globe, Users, BarChart, Settings, Download } from 'lucide-react';

const featureCategories = [
  {
    title: 'AI-Powered Generation',
    description: 'Intelligent data creation that understands context and relationships',
    features: [
      {
        icon: Brain,
        title: 'Natural Language Schemas',
        description: 'Describe your data needs in plain English and get AI-suggested schemas',
        tag: 'AI'
      },
      {
        icon: Users,
        title: 'Contextual Relationships',
        description: 'Generate data that maintains realistic relationships between entities',
        tag: 'Smart'
      },
      {
        icon: BarChart,
        title: 'Statistical Accuracy',
        description: 'Data that preserves statistical properties and distributions',
        tag: 'Advanced'
      }
    ]
  },
  {
    title: 'Data Types & Customization',
    description: 'Extensive library of data types with powerful customization options',
    features: [
      {
        icon: Database,
        title: '100+ Data Types',
        description: 'From basic types to complex AI-generated content like bios and descriptions',
        tag: 'Extensive'
      },
      {
        icon: Settings,
        title: 'Advanced Controls',
        description: 'Fine-tune null rates, constraints, and custom validation rules',
        tag: 'Flexible'
      },
      {
        icon: Code,
        title: 'Custom Formulas',
        description: 'Create complex derived fields using JavaScript expressions',
        tag: 'Pro'
      }
    ]
  },
  {
    title: 'API & Integration',
    description: 'Seamless integration with your development workflow',
    features: [
      {
        icon: Zap,
        title: 'Instant REST APIs',
        description: 'Get fully functional APIs immediately after data generation',
        tag: 'Fast'
      },
      {
        icon: Globe,
        title: 'GraphQL Support',
        description: 'Query your data with GraphQL for maximum flexibility',
        tag: 'Modern'
      },
      {
        icon: Download,
        title: 'Multiple Formats',
        description: 'Export as JSON, CSV, SQL, Excel, XML, and more',
        tag: 'Versatile'
      }
    ]
  },
  {
    title: 'Security & Privacy',
    description: 'Enterprise-grade security with privacy-first synthetic data',
    features: [
      {
        icon: Shield,
        title: 'Privacy-Preserving',
        description: 'Generate synthetic data that protects sensitive information',
        tag: 'Secure'
      },
      {
        icon: Users,
        title: 'Team Collaboration',
        description: 'Share schemas and datasets securely with your team',
        tag: 'Team'
      },
      {
        icon: Settings,
        title: 'Access Controls',
        description: 'Fine-grained permissions and API key management',
        tag: 'Enterprise'
      }
    ]
  }
];

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Powerful Features for{' '}
              <span className="gradient-text">Modern Development</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to generate, customize, and integrate high-quality synthetic data 
              into your development workflow.
            </p>
          </div>

          {/* Feature Categories */}
          <div className="space-y-20">
            {featureCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">{category.title}</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {category.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {category.features.map((feature, featureIndex) => (
                    <Card key={featureIndex} className="bg-card/50 backdrop-blur border-slate-700 hover:border-primary/50 transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-4">
                          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <feature.icon className="h-6 w-6 text-primary" />
                          </div>
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                            {feature.tag}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;
