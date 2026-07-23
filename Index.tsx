import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import LoopSection from "@/components/landing/LoopSection";
import CTASection from "@/components/landing/CTASection";
import BittuWidget from "@/components/mascot/BittuWidget";
import { Leaf } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <LoopSection />
      <CTASection />
      <BittuWidget />

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg gradient-forest flex items-center justify-center">
              <Leaf size={16} className="text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-900 text-foreground">EcoChamps</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2026 EcoChamps. Learn, Act, Protect Our Planet. 🌍
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
