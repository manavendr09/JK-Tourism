import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Brain, Languages, Route } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AIAssistant = () => {
  const navigate = useNavigate();

  // Chat states
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      role: "bot",
      content:
        "Hi there! 👋 I’m your AI Assistant. How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const callChatAPI = async (message) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      setLoading(false);
      return data.reply;
    } catch (error) {
      setLoading(false);
      console.error("API call error:", error);
      return "⚠️ Sorry, there was an error connecting to the server.";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setChatLog((prev) => [...prev, { role: "user", content: input }]);
    const botReply = await callChatAPI(input);
    setChatLog((prev) => [...prev, { role: "bot", content: botReply }]);
    setInput("");
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your AI Travel
            <span className="bg-gradient-to-r from-tribal to-accent bg-clip-text text-transparent ml-3">
              Companion
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience intelligent travel planning with our multilingual AI
            assistant that understands your preferences and creates
            personalized itineraries for your Jharkhand adventure
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              onClick={() => navigate("/smartplanning")}
              role="button"
              tabIndex={0}
              className="group hover:shadow-nature transition-all duration-300 hover:-translate-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-tribal"
            >
              <CardHeader className="pb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-tribal to-accent rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6 text-tribal-foreground" />
                </div>
                <CardTitle className="text-lg">Smart Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  AI analyzes your interests, budget, and time to create perfect
                  itineraries.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-nature transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-nature rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Languages className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">Multilingual</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Supports Hindi, English, and local tribal languages for seamless
                  communication
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-nature transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-nature to-primary rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Route className="w-6 h-6 text-nature-foreground" />
                </div>
                <CardTitle className="text-lg">Route Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Smart routing considering traffic, weather, and seasonal
                  accessibility
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-nature transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-accent to-tribal rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-lg">24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Round-the-clock assistance for bookings, emergencies, and local
                  insights
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface Preview - Updated */}
          <div className="relative">
            <Card className="bg-gradient-to-br from-card to-secondary border-2 border-primary/20 shadow-nature">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 bg-nature rounded-full ${
                      loading ? "animate-pulse" : ""
                    }`}
                  />
                  JharkhandBot {loading && "is typing..."}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {chatLog.map((entry, index) => (
                  <div
                    key={index}
                    className={`rounded-lg p-4 border-l-4 ${
                      entry.role === "user"
                        ? "bg-primary/10 border-primary text-foreground"
                        : "bg-nature/10 border-nature text-foreground"
                    }`}
                  >
                    <p className="text-sm text-foreground/80 mb-2">
                      {entry.role === "user" ? "You:" : "JharkhandBot:"}
                    </p>
                    <p className="text-foreground">{entry.content}</p>
                  </div>
                ))}
              </CardContent>

              <div className="flex gap-2 mt-4">
                <textarea
                  className="flex-grow rounded-lg p-3 border border-gray-300 resize-none"
                  rows={1}
                  placeholder="Ask me about Jharkhand travel..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <Button variant="tribal" size="lg" onClick={handleSend} disabled={loading}>
                  <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </Button>
              </div>
            </Card>

            <div className="text-center mt-8">
              <Button variant="tribal" size="lg" className="group" onClick={handleSend}>
                <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Start Chatting with AI
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
