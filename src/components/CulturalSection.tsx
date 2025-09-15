import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Calendar, Users } from "lucide-react";
import tribalCrafts from "@/assets/tribal-crafts.jpg";

const CulturalSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-tribal/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Rich
              <span className="bg-gradient-to-r from-tribal to-accent bg-clip-text text-transparent ml-3">
                Tribal Heritage
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Immerse yourself in the vibrant culture of 32 tribal communities. Experience authentic 
              handicrafts, traditional festivals, and age-old customs that have been preserved for generations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center p-6 hover:shadow-glow transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-r from-tribal to-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-6 h-6 text-tribal-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Local Marketplace</h3>
                <p className="text-sm text-muted-foreground">Authentic handicrafts and tribal art</p>
              </Card>

              <Card className="text-center p-6 hover:shadow-glow transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-r from-accent to-tribal rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Cultural Events</h3>
                <p className="text-sm text-muted-foreground">Traditional festivals and celebrations</p>
              </Card>

              <Card className="text-center p-6 hover:shadow-glow transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-r from-nature to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-nature-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Community Tours</h3>
                <p className="text-sm text-muted-foreground">Meet local artisans and learn traditions</p>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="tribal" size="lg">
                Explore Marketplace
              </Button>
              <Button variant="outline" size="lg">
                Cultural Calendar
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src={tribalCrafts} 
                alt="Traditional tribal handicrafts from Jharkhand"
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tribal/20 to-transparent" />
              
              {/* Floating Cards */}
              <div className="absolute top-6 right-6 bg-card/90 backdrop-blur-sm rounded-lg p-4 border border-card-foreground/10">
                <div className="text-2xl font-bold text-tribal">32</div>
                <div className="text-sm text-muted-foreground">Tribal Communities</div>
              </div>
              
              <div className="absolute bottom-6 left-6 bg-card/90 backdrop-blur-sm rounded-lg p-4 border border-card-foreground/10">
                <div className="text-2xl font-bold text-accent">200+</div>
                <div className="text-sm text-muted-foreground">Handicraft Items</div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-tribal to-accent rounded-full opacity-20 animate-pulse" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-accent to-nature rounded-full opacity-20 animate-pulse animation-delay-1000" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CulturalSection;