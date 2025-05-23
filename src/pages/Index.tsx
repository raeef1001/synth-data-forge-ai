
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { HeroSection } from '@/components/Landing/HeroSection';
import { StatsSection } from '@/components/Landing/StatsSection';
import { FeaturesSection } from '@/components/Landing/FeaturesSection';
import { InteractiveDemo } from '@/components/Landing/InteractiveDemo';
import { HowItWorksSection } from '@/components/Landing/HowItWorksSection';
import { TechStackSection } from '@/components/Landing/TechStackSection';
import { TestimonialsSection } from '@/components/Landing/TestimonialsSection';
import { PricingTeaser } from '@/components/Landing/PricingTeaser';
import { CTASection } from '@/components/Landing/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <InteractiveDemo />
        <HowItWorksSection />
        <TechStackSection />
        <TestimonialsSection />
        <PricingTeaser />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
