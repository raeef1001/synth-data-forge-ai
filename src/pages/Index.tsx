
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { HeroSection } from '@/components/Landing/HeroSection';
import { FeaturesSection } from '@/components/Landing/FeaturesSection';
import { HowItWorksSection } from '@/components/Landing/HowItWorksSection';
import { PricingTeaser } from '@/components/Landing/PricingTeaser';
import { CTASection } from '@/components/Landing/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingTeaser />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
