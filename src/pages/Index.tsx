import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const AnimatedWord = ({ children, delay = 0 }: { children: string; delay?: number }) => {
    return (
      <span 
        className={`inline-block animate-fade-in-delay-${delay + 1}`}
        style={{ animationDelay: `${delay * 0.2}s` }}
      >
        {children}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Minimalist Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <nav className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              LoL Engine
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/showcase" className="link-underline font-medium">
                Showcase
              </Link>
              <Link to="/login" className="link-underline font-medium">
                Login
              </Link>
              <Link to="/register" className="btn-minimalist">
                Get Started
              </Link>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <Link to="/showcase" className="font-medium">Showcase</Link>
                <Link to="/login" className="font-medium">Login</Link>
                <Link to="/register" className="font-medium">Get Started</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-4">
            {/* Main Animated Typography */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tight">
              <div className="mb-4">
                <AnimatedWord delay={0}>Smart</AnimatedWord>{" "}
                <AnimatedWord delay={1}>Supplement</AnimatedWord>
              </div>
              <div className="mb-4">
                <AnimatedWord delay={2}>Recommendations</AnimatedWord>
              </div>
              <div>
                <AnimatedWord delay={3}>Powered</AnimatedWord>{" "}
                <AnimatedWord delay={4}>by</AnimatedWord>{" "}
                <span className="animate-fade-in-delay-4 inline-block">
                  <span className="letter-float inline-block">A</span>
                  <span className="letter-float inline-block">I</span>
                </span>
              </div>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed animate-fade-in-delay-4 opacity-0 mt-12">
              The first Brazilian platform that uses artificial intelligence to recommend 
              personalized supplements based on your profile, goals and health history.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-16 animate-fade-in-delay-4 opacity-0">
              <Link to="/onboarding" className="btn-minimalist">
                Start Free Analysis
              </Link>
              <Link to="/showcase" className="link-underline font-medium">
                See How it Works
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowRight className="rotate-90" size={24} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-20 tracking-tight">
            Why Choose LoL Engine?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-20">
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-bold">Advanced AI Analysis</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Machine learning algorithms analyze your profile to deliver precise recommendations 
                based on thousands of scientific data points.
              </p>
            </div>
            
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-bold">Personalized Goals</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Define your objectives and receive supplements aligned with your specific goals 
                and lifestyle requirements.
              </p>
            </div>
            
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-bold">Scientific Evidence</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                All recommendations are based on peer-reviewed research and proven safety standards 
                for optimal results.
              </p>
            </div>
            
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-bold">Continuous Monitoring</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Track your progress and automatically adjust recommendations as your body 
                and goals evolve over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-20 tracking-tight">
            How It Works
          </h2>
          
          <div className="space-y-20">
            <div className="text-center">
              <div className="text-8xl md:text-9xl font-bold text-gray-200 mb-4">01</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Profile Analysis</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Complete our detailed questionnaire about your goals, health history, and lifestyle.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-8xl md:text-9xl font-bold text-gray-200 mb-4">02</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">AI Processing</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our AI analyzes thousands of scientific data points to find the ideal supplements for you.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-8xl md:text-9xl font-bold text-gray-200 mb-4">03</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Personalized Recommendations</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Receive your personalized list with dosages, timing, and scientific explanations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-4xl md:text-6xl font-bold mb-2">50K+</div>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold mb-2">1M+</div>
              <p className="text-gray-600">Recommendations Generated</p>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold mb-2">98%</div>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold mb-2">24/7</div>
              <p className="text-gray-600">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
            Ready to Transform Your Supplementation?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Join thousands who have discovered the power of intelligent supplementation with AI.
          </p>
          <Link to="/onboarding" className="btn-minimalist">
            Start Now - It's Free
          </Link>
        </div>
      </section>

      {/* Minimalist Footer */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-2xl font-bold tracking-tight mb-4 md:mb-0">
            LoL Engine
          </div>
          <p className="text-gray-600 text-center md:text-right">
            © 2024 LoL Engine. All rights reserved.<br />
            Intelligent supplementation powered by AI.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;