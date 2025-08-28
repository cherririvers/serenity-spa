import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Rooms', href: '#rooms' },
    { name: 'Spa & Wellness', href: '#spa' },
    { name: 'Retreats', href: '#retreats' },
    { name: 'Dining', href: '#dining' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-lavender-900 text-white py-2 px-4 text-sm">
        <div className="container-max flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone size={14} />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={14} />
              <span>Rishikesh, Uttarakhand, India</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Experience Tranquility • Book Your Wellness Journey</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          'fixed top-8 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft-lg'
            : 'bg-transparent'
        )}
      >
        <div className="container-max">
          <div className="flex items-center justify-between py-4 px-6">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-lavender-400 to-lavender-600 rounded-full flex items-center justify-center">
                <span className="text-white font-serif text-xl font-bold">S</span>
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-gray-900">
                  Serenity Spa
                </h1>
                <p className="text-sm text-gray-600 -mt-1">Wellness Retreat</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-700 hover:text-lavender-600 transition-colors duration-200 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lavender-600 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Button
                variant="primary"
                className="hidden md:inline-flex"
                onClick={() => scrollToSection('#booking')}
              >
                Book Now
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-lavender-600 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-soft-lg transition-all duration-300 overflow-hidden',
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <nav className="py-4">
            {navigationItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-6 py-3 text-gray-700 hover:text-lavender-600 hover:bg-lavender-50 transition-all duration-200"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {item.name}
              </button>
            ))}
            <div className="px-6 py-3">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => scrollToSection('#booking')}
              >
                Book Your Stay
              </Button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;