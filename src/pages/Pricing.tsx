
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out DataForge',
    features: [
      'Up to 1,000 records per dataset',
      '3 datasets per month',
      'Basic data types',
      'JSON & CSV export',
      'Community support',
      'Public API access'
    ],
    limitations: [
      'No AI-powered generation',
      'No custom relationships',
      'Limited API calls (100/day)'
    ],
    cta: 'Get Started Free',
    ctaVariant: 'outline' as const,
    popular: false
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    description: 'For professional developers and teams',
    features: [
      'Up to 100,000 records per dataset',
      'Unlimited datasets',
      'All data types including AI-generated',
      'All export formats',
      'Custom relationships',
      'Natural language schema creation',
      'Priority support',
      'Private API endpoints',
      'Advanced customization options'
    ],
    limitations: [],
    cta: 'Start Pro Trial',
    ctaVariant: 'default' as const,
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact sales',
    description: 'For large teams and organizations',
    features: [
      'Unlimited records',
      'Unlimited datasets',
      'Custom AI training',
      'On-premise deployment',
      'Dedicated support',
      'SLA guarantees',
      'Custom integrations',
      'White-label options',
      'Advanced security features'
    ],
    limitations: [],
    cta: 'Contact Sales',
    ctaVariant: 'outline' as const,
    popular: false
  }
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Choose Your{' '}
              <span className="gradient-text">Perfect Plan</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free and scale as you grow. All plans include our core features 
              with no hidden fees.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative bg-card/50 backdrop-blur border-slate-700 hover:border-primary/50 transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-primary/50 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period !== 'contact sales' && (
                      <span className="text-muted-foreground">/{plan.period}</span>
                    )}
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.limitations.map((limitation, limitationIndex) => (
                      <div key={limitationIndex} className="flex items-start space-x-3">
                        <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{limitation}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA */}
                  <Link to={plan.name === 'Enterprise' ? '/contact' : '/signup'}>
                    <Button 
                      variant={plan.ctaVariant}
                      className={`w-full ${plan.popular ? 'glow-button' : ''}`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Can I change plans at any time?</h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">What happens to my data if I downgrade?</h3>
                <p className="text-muted-foreground">
                  Your existing datasets remain accessible, but you'll be limited by your new plan's constraints for new data generation.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground">
                  We offer a 30-day money-back guarantee for all paid plans. No questions asked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
