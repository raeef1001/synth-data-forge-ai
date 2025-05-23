
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-emerald-500/5"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <span className="text-sm font-medium text-primary">
              ✨ AI-Powered Data Generation
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
            Generate Intelligent{' '}
            <span className="gradient-text">Dummy Data</span>{' '}
            with AI
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Create realistic, customizable synthetic data for APIs, testing, and development. 
            Our AI understands context and relationships to generate data that actually makes sense.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/signup">
              <Button size="lg" className="glow-button animate-pulse-glow">
                Start Generating Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/features">
              <Button variant="outline" size="lg">
                Explore Features
              </Button>
            </Link>
          </div>
          
          <div className="bg-slate-900/50 backdrop-blur border border-slate-700 rounded-xl p-6 max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground mb-3">Quick example - Generate user data:</p>
            <div className="code-block text-left">
              <div className="text-emerald-400">// Define your schema</div>
              <div className="text-slate-300 mt-2">
                {`{
  "name": "AI_GENERATED_NAME",
  "email": "EMAIL",
  "age": "NUMBER(18,65)", 
  "bio": "AI_GENERATED_BIO"
}`}
              </div>
              <div className="text-emerald-400 mt-3">// Get instant API endpoint</div>
              <div className="text-primary mt-2">
                https://api.dataforge.dev/users/abc123
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
