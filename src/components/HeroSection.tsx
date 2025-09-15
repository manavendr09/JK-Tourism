import { Button } from "@/components/ui/button";
import { MessageCircle, MapPin, Camera } from "lucide-react";
import netarhatHero from "@/assets/netarhat-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={netarhatHero} 
          alt="Netarhat - Queen of Chotanagpur"
          className="w-full h-full object-cover"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-nature/70" /> */}
      </div>

      {/* Content */}
      {/* <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Discover the
            <span className="block bg-gradient-to-r from-accent to-tribal bg-clip-text text-transparent">
              Heart of India
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
            Experience Jharkhand's untamed beauty, rich tribal heritage, and breathtaking landscapes 
            through our AI-powered digital tourism platform
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="lg" className="group">
              <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Start Planning with AI
            </Button>
            <Button variant="tribal" size="lg" className="group">
              <MapPin className="w-5 h-5 group-hover:bounce transition-transform" />
              Explore Destinations
            </Button>
            <Button variant="nature" size="lg" className="group">
              <Camera className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Virtual Tours
            </Button>
          </div> */}

          {/* Quick Stats */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-card/20 backdrop-blur-sm rounded-lg p-6 border border-card-foreground/10">
              <div className="text-3xl font-bold text-accent mb-2">50+</div>
              <div className="text-primary-foreground/80">Tourist Destinations</div>
            </div>
            <div className="bg-card/20 backdrop-blur-sm rounded-lg p-6 border border-card-foreground/10">
              <div className="text-3xl font-bold text-tribal mb-2">32</div>
              <div className="text-primary-foreground/80">Tribal Communities</div>
            </div>
            <div className="bg-card/20 backdrop-blur-sm rounded-lg p-6 border border-card-foreground/10">
              <div className="text-3xl font-bold text-nature mb-2">24/7</div>
              <div className="text-primary-foreground/80">AI Assistant</div>
            </div> */}
          {/* </div> */}
        {/* </div> */}
      {/* </div> */}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;