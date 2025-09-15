import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock } from "lucide-react";
import hundruFalls from "@/assets/hundru-falls.jpg";
import betlaPark from "@/assets/betla-park.jpg";

const destinations = [
  {
    id: 1,
    name: "Hundru Falls",
    location: "Ranchi",
    image: hundruFalls,
    rating: 4.8,
    duration: "Half Day",
    description: "Magnificent 320-foot waterfall cascading through rocky terrain",
    highlights: ["Photography", "Trekking", "Nature"]
  },
  {
    id: 2,
    name: "Betla National Park",
    location: "Palamu",
    image: betlaPark,
    rating: 4.7,
    duration: "Full Day",
    description: "Wildlife sanctuary home to tigers, elephants, and diverse flora",
    highlights: ["Wildlife Safari", "Bird Watching", "Conservation"]
  },
  {
    id: 3,
    name: "Netarhat",
    location: "Latehar",
    image: hundruFalls, // Using this temporarily
    rating: 4.9,
    duration: "2-3 Days",
    description: "Queen of Chotanagpur plateau with breathtaking hill views",
    highlights: ["Hill Station", "Sunrise/Sunset", "Cool Climate"]
  },
  {
    id: 4,
    name: "Deoghar Temple",
    location: "Deoghar",
    image: betlaPark, // Using this temporarily
    rating: 4.6,
    duration: "Full Day",
    description: "Sacred Jyotirlinga temple and spiritual pilgrimage site",
    highlights: ["Spirituality", "Architecture", "Festivals"]
  }
];

const DestinationGrid = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore
            <span className="bg-gradient-to-r from-tribal to-accent bg-clip-text text-transparent ml-3">
              Jharkhand
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover pristine waterfalls, wildlife sanctuaries, sacred temples, and hill stations
            that showcase the natural beauty and cultural richness of Jharkhand
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <Card key={destination.id} className="group overflow-hidden hover:shadow-nature transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  <div className="bg-card/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-primary-foreground mb-1">{destination.name}</h3>
                  <div className="flex items-center gap-1 text-primary-foreground/80">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{destination.location}</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{destination.duration}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {destination.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.highlights.map((highlight, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
                
                <Button variant="nature" className="w-full">
                  Plan Visit
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DestinationGrid;