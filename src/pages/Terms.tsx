
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 1, 2024</p>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using DataForge, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                DataForge provides AI-powered synthetic data generation services. We offer tools 
                to create realistic, privacy-preserving synthetic datasets for development, 
                testing, and research purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Acceptable Use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">You agree to use our service only for:</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Software development and testing</li>
                    <li>Research and educational purposes</li>
                    <li>Data analysis and machine learning</li>
                    <li>Creating demonstrations and prototypes</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">You agree NOT to use our service to:</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Generate data for illegal activities</li>
                    <li>Create misleading or fraudulent content</li>
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe on intellectual property rights</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Account Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You are responsible for all activities that occur under your account</li>
                <li>You must notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Payment and Billing</h2>
              <p className="text-muted-foreground leading-relaxed">
                Paid subscriptions are billed in advance on a monthly or annual basis. 
                You authorize us to charge your payment method for all fees incurred. 
                Refunds are provided according to our refund policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">API Usage and Limits</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your use of our API is subject to rate limits and usage quotas based on your 
                subscription plan. Exceeding these limits may result in temporary restrictions 
                or additional charges.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                You retain ownership of data you input into our service. We retain ownership 
                of our platform, algorithms, and generated synthetic data patterns. 
                The synthetic data generated through our service can be used freely by you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may terminate or suspend your account at any time for violations of these terms. 
                You may cancel your account at any time through your account settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                DataForge shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages resulting from your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                Questions about the Terms of Service should be sent to us at legal@dataforge.dev.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
