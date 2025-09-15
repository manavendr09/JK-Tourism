import { Button } from "@/components/ui/button";
import { MapPin, MessageCircle, Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-tribal to-accent rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-tribal-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">JharkhandTravel</h1>
                <p className="text-xs text-primary-foreground/70">AI-Powered Tourism</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-4 leading-relaxed">
              Empowering sustainable tourism in Jharkhand through AI technology, 
              connecting travelers with authentic experiences and local communities.
            </p>
            <Button variant="tribal" size="sm">
              <MessageCircle className="w-4 h-4" />
              Start Planning
            </Button>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-tribal transition-colors">Netarhat Hill Station</a></li>
              <li><a href="#" className="hover:text-tribal transition-colors">Hundru Falls</a></li>
              <li><a href="#" className="hover:text-tribal transition-colors">Betla National Park</a></li>
              <li><a href="#" className="hover:text-tribal transition-colors">Deoghar Temple</a></li>
              <li><a href="#" className="hover:text-tribal transition-colors">Patratu Valley</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-tribal transition-colors">AI Trip Planning</a></li>
              <li><a href="#" className="hover:text-tribal transition-colors">Virtual Tours</a></li>
              <li><a href="#" className="hover:text-tribal transition-colors">Local Marketplace</a></li>
              <li><a href="#" className="hover:text-tribal transition-colors">Cultural Experiences</a></li>
              <li><a href="#" className="hover:text-tribal transition-colors">Eco-Tourism</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@jharkhandtravel.com</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="hover:bg-tribal/20">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-tribal/20">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-tribal/20">
                <Instagram className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 JharkhandTravel. Empowering sustainable tourism through technology.
            </p>
            <div className="flex gap-6 text-sm text-primary-foreground/60">
              <a href="#" className="hover:text-tribal transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-tribal transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-tribal transition-colors">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;