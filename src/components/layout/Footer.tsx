import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Leaf,
  Heart,
  Award,
  Send
} from 'lucide-react';
import Button from '../ui/Button';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Rooms & Suites', href: '#rooms' },
    { name: 'Spa Treatments', href: '#spa' },
    { name: 'Wellness Retreats', href: '#retreats' },
    { name: 'Dining', href: '#dining' },
    { name: 'Gallery', href: '#gallery' },
  ];

  const wellnessServices = [
    { name: 'Ayurvedic Treatments', href: '#spa' },
    { name: 'Yoga Classes', href: '#retreats' },
    { name: 'Meditation Programs', href: '#retreats' },
    { name: 'Detox Packages', href: '#spa' },
    { name: 'Corporate Wellness', href: '#retreats' },
    { name: 'Couple Retreats', href: '#retreats' },
  ];

  const policies = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Cancellation Policy', href: '#' },
    { name: 'Health & Safety', href: '#' },
    { name: 'Accessibility', href: '#' },
    { name: 'Sustainability', href: '#' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-600' },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-lavender-900 via-lavender-800 to-sage-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <Leaf className="w-8 h-8 text-lavender-200 mr-3" />
              <h3 className="text-3xl font-serif font-bold">Stay Connected with Wellness</h3>
            </div>
            <p className="text-lavender-100 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to receive wellness tips, exclusive offers, and updates about our latest retreat programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-lavender-300 focus:border-transparent backdrop-blur-sm"
              />
              <Button
                variant="secondary"
                className="bg-white text-lavender-900 hover:bg-lavender-50 whitespace-nowrap"
              >
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-lavender-400 to-lavender-600 rounded-full flex items-center justify-center">
                <span className="text-white font-serif text-xl font-bold">S</span>
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold">Serenity Spa</h2>
                <p className="text-lavender-200 text-sm">Wellness Retreat</p>
              </div>
            </div>
            
            <p className="text-lavender-100 mb-6 leading-relaxed">
              India's premier wellness destination where ancient Ayurvedic wisdom meets modern luxury. 
              Experience transformation through holistic healing.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-lavender-300 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Serenity Spa Resort</p>
                  <p className="text-lavender-200 text-sm">
                    Tapovan, Rishikesh<br />
                    Uttarakhand 249192, India
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-lavender-300" />
                <div>
                  <p className="text-white">+91 98765 43210</p>
                  <p className="text-lavender-200 text-sm">24/7 Reservations</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-lavender-300" />
                <div>
                  <p className="text-white">hello@serenityspa.in</p>
                  <p className="text-lavender-200 text-sm">General Inquiries</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-lavender-300" />
                <div>
                  <p className="text-white">Check-in: 2:00 PM</p>
                  <p className="text-lavender-200 text-sm">Check-out: 12:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Heart className="w-5 h-5 text-lavender-300 mr-2" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-lavender-200 hover:text-white transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Wellness Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Leaf className="w-5 h-5 text-lavender-300 mr-2" />
              Wellness Services
            </h3>
            <ul className="space-y-3">
              {wellnessServices.map((service) => (
                <li key={service.name}>
                  <button
                    onClick={() => scrollToSection(service.href)}
                    className="text-lavender-200 hover:text-white transition-colors duration-200 text-left"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies & Certifications */}
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Award className="w-5 h-5 text-lavender-300 mr-2" />
              Policies & Info
            </h3>
            <ul className="space-y-3 mb-6">
              {policies.map((policy) => (
                <li key={policy.name}>
                  <a
                    href={policy.href}
                    className="text-lavender-200 hover:text-white transition-colors duration-200"
                  >
                    {policy.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Certifications */}
            <div className="space-y-3">
              <h4 className="text-lg font-medium text-white">Certifications</h4>
              <div className="space-y-2 text-sm text-lavender-200">
                <p>• Yoga Alliance Certified</p>
                <p>• Ayurveda Board Approved</p>
                <p>• ISO 9001:2015 Quality</p>
                <p>• Green Hotel Certified</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Awards */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Social Media */}
            <div className="flex items-center space-x-6">
              <span className="text-lavender-200 font-medium">Follow Us:</span>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`text-lavender-300 ${social.color} transition-colors duration-200 transform hover:scale-110`}
                    aria-label={social.name}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>

            {/* Awards & Recognition */}
            <div className="flex items-center space-x-8 text-center lg:text-right">
              <div>
                <p className="text-white font-semibold">TripAdvisor</p>
                <p className="text-lavender-200 text-sm">Excellence Award 2024</p>
              </div>
              <div>
                <p className="text-white font-semibold">Conde Nast</p>
                <p className="text-lavender-200 text-sm">Top Wellness Resort</p>
              </div>
              <div>
                <p className="text-white font-semibold">Spa India</p>
                <p className="text-lavender-200 text-sm">Best Ayurveda Spa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-lavender-200">
              © {currentYear} Serenity Spa Wellness Retreat. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-lavender-200">
              <span>Made with ❤️ in India</span>
              <span>•</span>
              <span>Designed for Wellness</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;