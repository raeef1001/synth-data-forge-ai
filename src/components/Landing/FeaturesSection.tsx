
import { Database, Zap, Shield, Code, Brain, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Intelligence',
    description: 'Our AI understands context and relationships, generating data that maintains statistical accuracy and realistic patterns.'
  },
  {
    icon: Database,
    title: 'Multiple Data Types',
    description: 'From basic strings to complex AI-generated content like product descriptions, user profiles, and financial records.'
  },
  {
    icon: Zap,
    title: 'Instant API Endpoints',
    description: 'Get REST APIs immediately after generation. No setup required - just generate and start using your endpoints.'
  },
  {
    icon: Code,
    title: 'Multiple Export Formats',
    description: 'Download your data as JSON, CSV, SQL, Excel, or XML. Perfect for any workflow or technology stack.'
  },
  {
    icon: Shield,
    title: 'Privacy-First Synthetic Data',
    description: 'Generate synthetic data that preserves statistical properties while protecting sensitive information.'
  },
  {
    icon: Globe,
    title: 'Natural Language Schemas',
    description: 'Describe what you need in plain English and let our AI suggest the perfect schema structure for you.'
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-slate-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Choose <span className="gradient-text">DataForge</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Move beyond simple random data. Our AI-powered platform creates intelligent, 
            contextual synthetic data that accelerates your development workflow.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur border-slate-700 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
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
    </section>
  );
};
