
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Database, Globe } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '50K+',
    label: 'Active Developers',
    change: '+24% this month'
  },
  {
    icon: Database,
    value: '2.5M+',
    label: 'Records Generated',
    change: '+89% this quarter'
  },
  {
    icon: Globe,
    value: '180+',
    label: 'Countries Served',
    change: '+12 new regions'
  },
  {
    icon: TrendingUp,
    value: '99.9%',
    label: 'Uptime SLA',
    change: 'Enterprise grade'
  }
];

export const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Trusted by <span className="gradient-text">Developers Worldwide</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers who are building the future with intelligent synthetic data
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur border-slate-700 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-2 gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                <div className="text-xs text-emerald-400">{stat.change}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
