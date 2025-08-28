import React from 'react';
import { Calendar, MapPin, Star, ArrowRight, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { cn } from '../../utils/cn';

const HeroSection: React.FC = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { number: '500+', label: 'Happy Guests', icon: Star },
    { number: '50+', label: 'Wellness Programs', icon: Sparkles },
    { number: '15+', label: 'Years Experience', icon: Calendar },
    { number: '4.9/5', label: 'Guest Rating', icon: Star },
  ];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-lavender-900/40 via-lavender-800/30 to-sage-900/40 z-10" />
        <img
          src="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Serene spa environment with lotus flowers and candles"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-lavender-300/20 rounded-full blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-sage-300/20 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-beige-300/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-30 flex items-center min-h-screen">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <div
              ref={heroRef}
              className={cn(
                'transition-all duration-1000 transform',
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              {/* Welcome Badge */}
              <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8">
                <MapPin className="w-4 h-4 text-white mr-2" />
                <span className="text-white font-medium">Rishikesh, Uttarakhand • India's Wellness Capital</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight">
                Discover Your
                <span className="block bg-gradient-to-r from-lavender-200 to-beige-200 bg-clip-text text-transparent">
                  Inner Peace
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Escape to India's premier wellness retreat where ancient wisdom meets modern luxury. 
                Experience transformative spa treatments, yoga retreats, and holistic healing.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button
                  size="lg"
                  className="bg-white text-lavender-900 hover:bg-lavender-50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Book Your Retreat
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  Explore Packages
                </Button>
              </div>

              {/* Special Offer Banner */}
              <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-lavender-600/90 to-sage-600/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                <Sparkles className="w-5 h-5 text-white mr-3 animate-pulse" />
                <span className="text-white font-semibold">
                  Limited Time: 25% Off 7-Day Wellness Retreats • Starting ₹35,000
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="container-max px-6 pb-8">
          <div
            ref={statsRef}
            className={cn(
              'grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 transform',
              statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-8 h-8 text-lavender-200 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-white/80 text-sm font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex flex-col items-center text-white/70 animate-bounce">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;