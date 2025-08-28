import React, { useState, useEffect } from 'react';
import { 
  Quote, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Pause,
  Users,
  MapPin,
  Calendar,
  Heart,
  Award,
  Globe,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { cn } from '../../utils/cn';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  country: string;
  avatar: string;
  rating: number;
  date: string;
  program: string;
  testimonial: string;
  highlights: string[];
  verified: boolean;
  featured?: boolean;
  returnGuest?: boolean;
}

const TestimonialsSection: React.FC = () => {
  const { ref: testimonialsRef, isVisible: testimonialsVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 'priya-mumbai',
      name: 'Priya Sharma',
      location: 'Mumbai',
      country: 'India',
      avatar: 'https://images.pexels.com/photos/3771120/pexels-photo-3771120.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rating: 5,
      date: '2024-01-15',
      program: '7-Day Ayurvedic Detox',
      testimonial: 'My experience at Serenity Spa was truly transformative. The Panchakarma treatments helped me release years of stress and toxins. Dr. Priya\'s expertise in Ayurveda is remarkable - she created a personalized treatment plan that addressed my specific health concerns. The peaceful environment and authentic approach to healing made this the best wellness investment I\'ve ever made.',
      highlights: ['Personalized Ayurvedic treatment', 'Expert practitioners', 'Transformative results', 'Peaceful environment'],
      verified: true,
      featured: true
    },
    {
      id: 'james-london',
      name: 'James Mitchell',
      location: 'London',
      country: 'United Kingdom',
      avatar: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rating: 5,
      date: '2024-01-22',
      program: '5-Day Silent Meditation Retreat',
      testimonial: 'As a busy executive, I was skeptical about meditation retreats. But the silent retreat at Serenity Spa completely changed my perspective. Yogi Arjun\'s guidance was profound, and the noble silence allowed me to connect with myself in ways I never imagined. The Himalayan setting added a spiritual dimension that made this experience unforgettable.',
      highlights: ['Life-changing meditation', 'Expert guidance', 'Spiritual awakening', 'Himalayan setting'],
      verified: true,
      returnGuest: true
    },
    {
      id: 'anita-delhi',
      name: 'Anita Gupta',
      location: 'New Delhi',
      country: 'India',
      avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rating: 5,
      date: '2024-02-01',
      program: 'Weekend Wellness Escape',
      testimonial: 'Perfect introduction to wellness for someone like me who had never tried yoga or meditation. The weekend program was beautifully structured - not overwhelming but deeply enriching. Chef Meera\'s cooking class was a highlight, and I still use the Ayurvedic recipes at home. The staff made me feel like family from day one.',
      highlights: ['Beginner-friendly approach', 'Cooking class highlight', 'Family-like atmosphere', 'Practical takeaways'],
      verified: true
    },
    {
      id: 'david-sarah-australia',
      name: 'David & Sarah Chen',
      location: 'Sydney',
      country: 'Australia',
      avatar: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rating: 5,
      date: '2024-01-28',
      program: 'Couples Harmony Package',
      testimonial: 'Our 10th anniversary celebration at Serenity Spa exceeded all expectations. The couples massage was incredibly relaxing, and the private yoga session helped us reconnect on a deeper level. The moonlight dinner in the garden was magical. We left feeling more connected to each other and with tools to maintain wellness in our daily lives.',
      highlights: ['Romantic anniversary celebration', 'Couples reconnection', 'Magical dining experience', 'Relationship tools'],
      verified: true,
      featured: true
    },
    {
      id: 'rajesh-bangalore',
      name: 'Rajesh Patel',
      location: 'Bangalore',
      country: 'India',
      avatar: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rating: 5,
      date: '2024-02-05',
      program: 'Corporate Wellness Retreat',
      testimonial: 'Brought my team of 15 for a corporate wellness retreat, and it was the best team-building investment we\'ve made. The combination of yoga, meditation, and wellness workshops created bonds that have improved our workplace dynamics significantly. The productivity and morale boost has been lasting - we\'re already planning our next visit.',
      highlights: ['Excellent team building', 'Improved workplace dynamics', 'Lasting productivity boost', 'Planning return visit'],
      verified: true,
      returnGuest: true
    },
    {
      id: 'maria-spain',
      name: 'Maria Rodriguez',
      location: 'Barcelona',
      country: 'Spain',
      avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rating: 5,
      date: '2024-01-30',
      program: 'Hatha Yoga Intensive',
      testimonial: 'As a yoga teacher myself, I was looking for authentic training in India. The 7-day Hatha intensive was exactly what I needed. The traditional approach, combined with modern understanding of anatomy, gave me new insights into my practice. The Yoga Alliance certification was a bonus, but the personal transformation was priceless.',
      highlights: ['Authentic yoga training', 'Traditional meets modern', 'Professional development', 'Personal transformation'],
      verified: true,
      featured: true
    }
  ];

  const stats = [
    { number: '4.9/5', label: 'Average Rating', icon: Star },
    { number: '500+', label: 'Happy Guests', icon: Users },
    { number: '25+', label: 'Countries', icon: Globe },
    { number: '95%', label: 'Return Rate', icon: Heart }
  ];

  // Auto-advance carousel
  useEffect(() => {
    if (isAutoPlay && !isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, isPaused, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-lavender-50 via-white to-sage-50" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-lavender-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-sage-100/20 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="section-padding">
          <div className="container-max">
            <div
              ref={testimonialsRef}
              className={cn(
                'text-center mb-16 transition-all duration-1000 transform',
                testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <div className="inline-flex items-center px-6 py-3 bg-lavender-100 rounded-full mb-6">
                <Quote className="w-5 h-5 text-lavender-600 mr-2" />
                <span className="text-lavender-800 font-medium">Guest Stories</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
                Testimonials
                <span className="block text-gradient">Voices of Transformation</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Discover how our guests have experienced healing, growth, and transformation 
                through their wellness journeys at Serenity Spa.
              </p>
            </div>

            {/* Main Testimonial Carousel */}
            <div className="max-w-6xl mx-auto mb-16">
              <Card className="relative overflow-hidden p-0">
                <div 
                  className="relative bg-gradient-to-br from-white to-lavender-50 p-12"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {/* Navigation Controls */}
                  <div className="absolute top-6 right-6 flex items-center gap-2">
                    <button
                      onClick={toggleAutoPlay}
                      className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                    >
                      {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <span className="text-sm text-gray-500">
                      {currentIndex + 1} / {testimonials.length}
                    </span>
                  </div>

                  {/* Testimonial Content */}
                  <div className="grid lg:grid-cols-3 gap-8 items-center">
                    {/* Guest Info */}
                    <div className="text-center lg:text-left">
                      <div className="relative inline-block mb-6">
                        <img
                          src={currentTestimonial.avatar}
                          alt={currentTestimonial.name}
                          className="w-24 h-24 rounded-full object-cover shadow-lg mx-auto lg:mx-0"
                        />
                        {currentTestimonial.verified && (
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                        {currentTestimonial.name}
                      </h3>
                      
                      <div className="flex items-center justify-center lg:justify-start text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{currentTestimonial.location}, {currentTestimonial.country}</span>
                      </div>

                      <div className="flex items-center justify-center lg:justify-start mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'w-5 h-5',
                              i < currentTestimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            )}
                          />
                        ))}
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center justify-center lg:justify-start">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{new Date(currentTestimonial.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center justify-center lg:justify-start">
                          <Sparkles className="w-4 h-4 mr-2" />
                          <span>{currentTestimonial.program}</span>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 justify-center lg:justify-start mt-4">
                        {currentTestimonial.featured && (
                          <span className="px-3 py-1 bg-lavender-100 text-lavender-700 text-xs rounded-full">
                            Featured Review
                          </span>
                        )}
                        {currentTestimonial.returnGuest && (
                          <span className="px-3 py-1 bg-sage-100 text-sage-700 text-xs rounded-full">
                            Return Guest
                          </span>
                        )}
                        {currentTestimonial.verified && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            Verified Stay
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <div className="lg:col-span-2">
                      <Quote className="w-12 h-12 text-lavender-300 mb-6" />
                      
                      <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                        "{currentTestimonial.testimonial}"
                      </blockquote>

                      {/* Highlights */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Experience Highlights:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {currentTestimonial.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevTestimonial}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                  </button>
                </div>

                {/* Testimonial Dots */}
                <div className="flex justify-center space-x-2 p-6 bg-white">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToTestimonial(index)}
                      className={cn(
                        'w-3 h-3 rounded-full transition-all duration-300',
                        index === currentIndex 
                          ? 'bg-lavender-600 w-8' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      )}
                    />
                  ))}
                </div>
              </Card>
            </div>

            {/* Guest Statistics */}
            <div
              ref={statsRef}
              className={cn(
                'grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 transition-all duration-1000 transform',
                statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card
                    key={stat.label}
                    className={cn(
                      'text-center transition-all duration-1000 transform',
                      statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    )}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <Icon className="w-8 h-8 text-lavender-600 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </Card>
                );
              })}
            </div>

            {/* All Reviews Grid */}
            <div className="mb-16">
              <h3 className="text-3xl font-serif font-bold text-gray-900 text-center mb-12">
                More Guest Stories
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.slice(0, 6).map((testimonial, index) => (
                  <Card
                    key={testimonial.id}
                    className={cn(
                      'cursor-pointer transition-all duration-1000 transform hover:scale-105',
                      testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => goToTestimonial(index)}
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.location}</p>
                      </div>
                      {testimonial.verified && (
                        <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                      )}
                    </div>
                    
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'w-4 h-4',
                            i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          )}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{testimonial.program}</span>
                    </div>
                    
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                      "{testimonial.testimonial}"
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="section-padding bg-gradient-to-r from-lavender-600 to-sage-600">
          <div className="container-max">
            <div className="text-center text-white">
              <Award className="w-16 h-16 mx-auto mb-6 text-lavender-100" />
              <h3 className="text-3xl font-serif font-bold mb-4">
                Join Our Community of Wellness
              </h3>
              <p className="text-xl text-lavender-100 mb-8 max-w-2xl mx-auto">
                Become part of our growing family of guests who have discovered transformation, 
                healing, and lasting wellness at Serenity Spa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-lavender-600 hover:bg-lavender-50"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Start Your Journey
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white border-white/30 hover:bg-white/10"
                >
                  Read All Reviews
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;