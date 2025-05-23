
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const integrations = [
  { name: 'React', category: 'Frontend', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  { name: 'Node.js', category: 'Backend', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
  { name: 'Python', category: 'Backend', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  { name: 'PostgreSQL', category: 'Database', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
  { name: 'MongoDB', category: 'Database', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  { name: 'GraphQL', category: 'API', color: 'bg-pink-500/10 text-pink-400 border-pink-500/20' },
  { name: 'Docker', category: 'DevOps', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
  { name: 'Kubernetes', category: 'DevOps', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
];

export const TechStackSection = () => {
  return (
    <section className="py-20 bg-slate-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Integrates with Your <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            DataForge works seamlessly with popular frameworks, databases, and deployment platforms
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/50 backdrop-blur border-slate-700 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {integrations.map((integration, index) => (
                <div key={index} className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-slate-800/50 transition-colors group">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="h-6 w-6 rounded bg-gradient-to-br from-primary to-emerald-400"></div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-sm">{integration.name}</div>
                    <Badge variant="outline" className={`text-xs mt-1 ${integration.color}`}>
                      {integration.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Can't find your tech stack? We support custom integrations and webhooks.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">REST APIs</Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Webhooks</Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Custom SDKs</Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Enterprise SSO</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
