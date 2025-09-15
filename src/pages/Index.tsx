import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import DestinationGrid from "@/components/DestinationGrid";
import AIAssistant from "@/components/AIAssistant";
import CulturalSection from "@/components/CulturalSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <section id="destinations">
          <DestinationGrid />
        </section>
        <section id="ai">
          <AIAssistant />
        </section>
        <section id="culture">
          <CulturalSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
