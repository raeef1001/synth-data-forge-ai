
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Zap, Download, Globe } from 'lucide-react';

const steps = [
  {
    icon: Edit,
    step: '01',
    title: 'Define Your Schema',
    description: 'Use our intuitive interface to define your data structure, or describe it in natural language and let AI build it for you.'
  },
  {
    icon: Zap,
    step: '02', 
    title: 'Generate with AI',
    description: 'Our AI analyzes your schema and generates realistic, contextually relevant data that maintains proper relationships.'
  },
  {
    icon: Globe,
    step: '03',
    title: 'Get Instant APIs',
    description: 'Access your data immediately through REST endpoints. Complete with documentation and authentication options.'
  },
  {
    icon: Download,
    step: '04',
    title: 'Export & Integrate',
    description: 'Download in multiple formats or integrate directly with your applications using our APIs and SDKs.'
  }
];

export const HowItWorksSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From schema to API in minutes. Our streamlined process gets you from idea to implementation faster than ever.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur border-slate-700 relative">
              <CardHeader className="text-center">
                <div className="mx-auto h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 relative">
                  <step.icon className="h-8 w-8 text-primary" />
                  <div className="absolute -top-2 -right-2 h-6 w-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{step.step}</span>
                  </div>
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground">
                  {step.description}
                </CardDescription>
              </CardContent>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="h-0.5 w-8 bg-gradient-to-r from-primary to-emerald-400"></div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
