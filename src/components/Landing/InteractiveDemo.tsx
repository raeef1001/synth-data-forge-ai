
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Sparkles, Code, Database } from 'lucide-react';

const demoSteps = [
  {
    id: 'schema',
    title: 'Define Schema',
    description: 'Describe your data structure',
    code: `{
  "users": {
    "name": "AI_GENERATED_NAME",
    "email": "EMAIL",
    "age": "NUMBER(18,65)",
    "bio": "AI_GENERATED_BIO(50)"
  }
}`
  },
  {
    id: 'generate',
    title: 'AI Generation',
    description: 'Watch AI create realistic data',
    code: `[
  {
    "name": "Sarah Chen",
    "email": "sarah.chen@email.com",
    "age": 28,
    "bio": "Software engineer passionate about AI"
  },
  {
    "name": "Marcus Johnson",
    "email": "m.johnson@company.co",
    "age": 34,
    "bio": "Tech lead building scalable systems"
  }
]`
  },
  {
    id: 'api',
    title: 'Instant API',
    description: 'Get your endpoint immediately',
    code: `GET https://api.dataforge.dev/users/abc123

{
  "data": [...],
  "count": 1000,
  "endpoint": "https://api.dataforge.dev/users/abc123",
  "rate_limit": "1000/hour"
}`
  }
];

export const InteractiveDemo = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % demoSteps.length);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            See <span className="gradient-text">DataForge</span> in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch how our AI transforms simple schemas into production-ready APIs in seconds
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              {demoSteps.map((step, index) => (
                <Card 
                  key={step.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    index === activeStep 
                      ? 'border-primary shadow-lg shadow-primary/20 bg-card' 
                      : 'border-slate-700 bg-card/50 backdrop-blur hover:border-primary/30'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === activeStep ? 'bg-primary text-white' : 'bg-slate-700 text-slate-300'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                      {index === activeStep && (
                        <Badge variant="secondary" className="ml-auto">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                </Card>
              ))}

              <div className="flex gap-4 pt-4">
                <Button onClick={handleGenerate} disabled={isGenerating} className="glow-button">
                  {isGenerating ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Run Demo
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <Code className="h-4 w-4 mr-2" />
                  View Code
                </Button>
              </div>
            </div>

            <div className="lg:sticky lg:top-8">
              <Card className="bg-slate-900/50 backdrop-blur border-slate-700">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{demoSteps[activeStep].title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
                    <pre className="text-sm text-slate-300 whitespace-pre-wrap overflow-x-auto">
                      {demoSteps[activeStep].code}
                    </pre>
                  </div>
                  
                  {activeStep === 1 && isGenerating && (
                    <div className="mt-4 flex items-center gap-2 text-emerald-400">
                      <div className="animate-spin h-4 w-4 border-2 border-emerald-400 border-t-transparent rounded-full" />
                      <span className="text-sm">AI is generating realistic data...</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
