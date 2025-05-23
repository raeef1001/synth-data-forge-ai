
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Sparkles, Zap } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-emerald-500/5"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl animate-pulse opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-3xl animate-pulse opacity-20 animation-delay-2000"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto text-center">
          {/* Announcement badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 hover:bg-primary/15 transition-colors cursor-pointer group">
            <Sparkles className="h-4 w-4 text-primary mr-2 group-hover:animate-spin" />
            <span className="text-sm font-medium text-primary mr-2">
              New: AI-Powered Schema Builder
            </span>
            <Badge variant="secondary" className="text-xs">
              Beta
            </Badge>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 animate-fade-in">
            Generate Intelligent{' '}
            <span className="gradient-text relative">
              Dummy Data
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-400 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            </span>{' '}
            with AI
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Create realistic, customizable synthetic data for APIs, testing, and development. 
            Our AI understands context and relationships to generate data that actually makes sense.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link to="/signup">
              <Button size="lg" className="glow-button animate-pulse-glow group text-lg px-8 py-4 h-auto">
                <Zap className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Start Generating Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/playground">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto group">
                <Play className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Try Live Demo
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></div>
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></div>
              Free forever plan
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></div>
              Enterprise ready
            </div>
          </div>
          
          {/* Interactive code example */}
          <div className="bg-slate-900/50 backdrop-blur border border-slate-700 rounded-2xl p-8 max-w-4xl mx-auto hover:border-primary/30 transition-colors group">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">Quick example - Generate user data:</p>
              <Badge variant="outline" className="text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Powered
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
              <div>
                <div className="text-emerald-400 text-sm mb-2">// Define your schema</div>
                <div className="code-block">
                  <div className="text-slate-300">
                    {`{
  "name": "AI_GENERATED_NAME",
  "email": "EMAIL",
  "age": "NUMBER(18,65)", 
  "bio": "AI_GENERATED_BIO(50)",
  "avatar": "AI_GENERATED_IMAGE"
}`}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-emerald-400 text-sm mb-2">// Get instant API endpoint</div>
                <div className="code-block">
                  <div className="text-primary">
                    https://api.dataforge.dev/users/abc123
                  </div>
                  <div className="text-slate-500 text-sm mt-2">
                    ✓ 1000 records generated<br/>
                    ✓ REST API ready<br/>
                    ✓ Rate limiting included
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Production-ready in seconds, not hours
                </span>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">JSON</Badge>
                  <Badge variant="outline" className="text-xs">CSV</Badge>
                  <Badge variant="outline" className="text-xs">SQL</Badge>
                  <Badge variant="outline" className="text-xs">GraphQL</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
