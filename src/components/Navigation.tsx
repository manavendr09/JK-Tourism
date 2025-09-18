import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase.js"; 
import { doSignOut } from "../../firebase/auth.js"; 

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      console.log(currentUser)
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const navItems = [
    { name: "Destinations", href: "#destinations" },
    { name: "Cultural Heritage", href: "#culture" },
    { name: "AI Assistant", href: "#ai" },
    { name: "Virtual Tours", href: "#tours" },
    { name: "Marketplace", href: "#marketplace" },
  ];

  const handleLogout = async () => {
    await doSignOut();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-tribal to-accent rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-tribal-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">JharkhandTravel</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Tourism</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-tribal transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="profile"
                  className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
                  onClick={handleLogout}
                  title="Click to Logout"
                />
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
            <Button variant="tribal" size="sm">
              <MessageCircle className="w-4 h-4" />
              Chat with AI
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-tribal transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}

              <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
                {user ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={user.photoURL || "https://via.placeholder.com/40"}
                      alt="profile"
                      className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
                      onClick={handleLogout}
                      title="Click to Logout"
                    />
                  </div>
                ) : (
                  <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                )}
                <Button variant="tribal" size="sm">
                  <MessageCircle className="w-4 h-4" />
                  Chat with AI
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
