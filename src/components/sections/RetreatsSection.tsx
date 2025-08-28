import React, { useState } from 'react';
import { Bot as Lotus, Mountain, Users, Calendar, Clock, Star, ArrowRight, Check, Heart, Sunrise, Moon, Leaf, Award, Globe, Building, Gift, Sparkles, User, MapPin, Phone } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useModal } from '../../hooks/useModal';
import { cn } from '../../utils/cn';

interface Retreat {
  id: string;
  name: string;
  type: string;
  price: number;
  originalPrice?: number;
  duration: string;
  level: string;
  maxParticipants: number;
  description: string;
  highlights: string[];
  includes: string[];
  schedule: string[];
  image: string;
  popular?: boolean;
  signature?: boolean;
  intensive?: boolean;
}

interface Program {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  duration: string;
  sessions: number;
  description: string;
  benefits: string[];
  includes: string[];
  image: string;
  popular?: boolean;
  beginner?: boolean;
}

const RetreatsSection: React.FC = () => {
  const { ref: retreatsRef, isVisible: retreatsVisible } = useScrollAnimation();
  const { ref: programsRef, isVisible: programsVisible } = useScrollAnimation();
  const { ref: corporateRef, isVisible: corporateVisible } = useScrollAnimation();
  const { isOpen: isRetreatOpen, openModal: openRetreat, closeModal: closeRetreat } = useModal();
  const { isOpen: isProgramOpen, openModal: openProgram, closeModal: closeProgram } = useModal();
  const { isOpen: isBookingOpen, openModal: openBooking, closeModal: closeBooking } = useModal();
  
  const [selectedRetreat, setSelectedRetreat] = useState<Retreat | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [activeTab, setActiveTab] = useState('retreats');

  const retreats: Retreat[] = [
    {
      id: 'hatha-intensive',
      name: '7-Day Hatha Yoga Intensive',
      type: 'Yoga Retreat',
      price: 35000,
      originalPrice: 42000,
      duration: '7 days / 6 nights',
      level: 'All Levels',
      maxParticipants: 12,
      description: 'Immerse yourself in traditional Hatha yoga practice with daily asanas, pranayama, and meditation in the spiritual atmosphere of Rishikesh.',
      highlights: ['Daily 2-hour yoga sessions', 'Pranayama & meditation', 'Philosophy classes', 'Ganga Aarti ceremony', 'Himalayan trek'],
      includes: ['Accommodation', 'Vegetarian meals', 'Yoga materials', 'Certification', 'Airport transfer'],
      schedule: ['6:00 AM - Morning meditation', '7:00 AM - Hatha yoga practice', '9:00 AM - Breakfast', '11:00 AM - Philosophy class', '1:00 PM - Lunch', '4:00 PM - Pranayama', '6:00 PM - Evening yoga', '8:00 PM - Dinner'],
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      popular: true
    },
    {
      id: 'meditation-retreat',
      name: '5-Day Silent Meditation Retreat',
      type: 'Meditation Retreat',
      price: 28000,
      originalPrice: 33000,
      duration: '5 days / 4 nights',
      level: 'Intermediate',
      maxParticipants: 8,
      description: 'Deep meditation practice in noble silence, combining Vipassana and mindfulness techniques for profound inner transformation.',
      highlights: ['Noble silence practice', 'Vipassana meditation', 'Walking meditation', 'Dharma talks', 'Personal guidance'],
      includes: ['Private room', 'Sattvic meals', 'Meditation cushions', 'Guidance sessions', 'Completion certificate'],
      schedule: ['5:00 AM - Morning sit', '6:30 AM - Walking meditation', '8:00 AM - Breakfast', '9:00 AM - Dharma talk', '10:30 AM - Sitting practice', '12:00 PM - Lunch', '2:00 PM - Rest', '3:30 PM - Sitting practice', '5:00 PM - Walking meditation', '7:00 PM - Dinner'],
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      signature: true
    },
    {
      id: 'ayurveda-detox',
      name: '10-Day Ayurvedic Detox Retreat',
      type: 'Ayurveda Retreat',
      price: 65000,
      originalPrice: 75000,
      duration: '10 days / 9 nights',
      level: 'All Levels',
      maxParticipants: 6,
      description: 'Complete Panchakarma detoxification program with personalized Ayurvedic treatments, yoga, and dietary guidance.',
      highlights: ['Panchakarma treatments', 'Personalized diet plan', 'Daily yoga & meditation', 'Ayurvedic consultations', 'Herbal medicines'],
      includes: ['Luxury accommodation', 'Ayurvedic meals', 'All treatments', 'Medicines', 'Follow-up consultation'],
      schedule: ['6:00 AM - Yoga practice', '8:00 AM - Ayurvedic breakfast', '9:00 AM - Treatment session', '12:00 PM - Lunch', '2:00 PM - Rest', '4:00 PM - Consultation', '5:30 PM - Meditation', '7:30 PM - Dinner'],
      image: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      intensive: true
    },
    {
      id: 'weekend-wellness',
      name: 'Weekend Wellness Escape',
      type: 'Mini Retreat',
      price: 15000,
      originalPrice: 18000,
      duration: '2 days / 1 night',
      level: 'Beginner',
      maxParticipants: 20,
      description: 'Perfect introduction to wellness practices with yoga, meditation, spa treatments, and healthy cuisine.',
      highlights: ['Yoga classes', 'Spa treatment', 'Meditation session', 'Healthy cooking class', 'Nature walk'],
      includes: ['Accommodation', 'All meals', 'Spa treatment', 'Yoga materials', 'Recipe book'],
      schedule: ['Day 1: Arrival, yoga, lunch, spa, meditation, dinner', 'Day 2: Morning yoga, breakfast, cooking class, lunch, departure'],
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      popular: true
    }
  ];

  const programs: Program[] = [
    {
      id: 'morning-yoga',
      name: 'Daily Morning Yoga Classes',
      category: 'Yoga',
      price: 2500,
      originalPrice: 3000,
      duration: '1 week',
      sessions: 7,
      description: 'Start your day with energizing Hatha yoga practice suitable for all levels, focusing on alignment and breath awareness.',
      benefits: ['Improved flexibility', 'Better posture', 'Stress reduction', 'Increased energy', 'Mental clarity'],
      includes: ['Yoga mat', 'Props', 'Instruction', 'Tea after class', 'Practice guide'],
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      popular: true,
      beginner: true
    },
    {
      id: 'pranayama-course',
      name: 'Pranayama Mastery Course',
      category: 'Breathwork',
      price: 4500,
      originalPrice: 5500,
      duration: '5 days',
      sessions: 10,
      description: 'Learn ancient breathing techniques to enhance vitality, calm the mind, and prepare for deeper meditation practice.',
      benefits: ['Improved lung capacity', 'Stress relief', 'Better sleep', 'Enhanced focus', 'Emotional balance'],
      includes: ['Course materials', 'Practice recordings', 'Personal guidance', 'Completion certificate', 'Follow-up session'],
      image: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    {
      id: 'meditation-foundation',
      name: 'Meditation Foundation Program',
      category: 'Meditation',
      price: 3500,
      originalPrice: 4200,
      duration: '1 week',
      sessions: 7,
      description: 'Comprehensive introduction to various meditation techniques including mindfulness, loving-kindness, and concentration practices.',
      benefits: ['Reduced anxiety', 'Better focus', 'Emotional stability', 'Improved relationships', 'Inner peace'],
      includes: ['Meditation cushion', 'Guided recordings', 'Workbook', 'Group discussions', 'Personal consultation'],
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      beginner: true
    },
    {
      id: 'sound-healing',
      name: 'Tibetan Sound Healing Sessions',
      category: 'Sound Therapy',
      price: 1800,
      duration: '1 session',
      sessions: 1,
      description: 'Therapeutic sound bath using Tibetan singing bowls, gongs, and chimes to promote deep relaxation and healing.',
      benefits: ['Deep relaxation', 'Stress release', 'Energy balancing', 'Improved sleep', 'Emotional healing'],
      includes: ['Sound bath session', 'Comfortable setup', 'Eye pillow', 'Herbal tea', 'Relaxation time'],
      image: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    }
  ];

  const corporatePackages = [
    {
      name: 'Corporate Wellness Day',
      price: '₹2,500 per person',
      duration: '1 day',
      minParticipants: 10,
      description: 'Team building through wellness activities including yoga, meditation, and stress management workshops.',
      includes: ['Yoga session', 'Meditation workshop', 'Healthy lunch', 'Stress management talk', 'Take-home wellness kit']
    },
    {
      name: 'Executive Retreat Weekend',
      price: '₹15,000 per person',
      duration: '2 days',
      minParticipants: 8,
      description: 'Leadership development retreat combining wellness practices with team building and strategic planning.',
      includes: ['Accommodation', 'All meals', 'Wellness sessions', 'Team activities', 'Meeting facilities']
    },
    {
      name: 'Annual Wellness Program',
      price: 'Custom pricing',
      duration: '12 months',
      minParticipants: 20,
      description: 'Year-long corporate wellness program with monthly sessions, health assessments, and progress tracking.',
      includes: ['Monthly sessions', 'Health assessments', 'Wellness coaching', 'Progress reports', 'Employee portal']
    }
  ];

  const openRetreatModal = (retreat: Retreat) => {
    setSelectedRetreat(retreat);
    openRetreat();
  };

  const openProgramModal = (program: Program) => {
    setSelectedProgram(program);
    openProgram();
  };

  const openRetreatBooking = (retreat: Retreat) => {
    setSelectedRetreat(retreat);
    openBooking();
  };

  return (
    <section id="retreats" className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage-50 via-white to-lavender-50" />
      <div className="absolute top-32 left-10 w-80 h-80 bg-sage-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-32 right-10 w-96 h-96 bg-lavender-100/20 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="section-padding">
          <div className="container-max">
            <div
              ref={retreatsRef}
              className={cn(
                'text-center mb-16 transition-all duration-1000 transform',
                retreatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <div className="inline-flex items-center px-6 py-3 bg-sage-100 rounded-full mb-6">
                <Lotus className="w-5 h-5 text-sage-600 mr-2" />
                <span className="text-sage-800 font-medium">Wellness Programs</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
                Transformative Retreats
                <span className="block text-gradient">& Wellness Programs</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                Embark on a journey of self-discovery through our authentic yoga retreats, meditation programs, 
                and Ayurvedic healing experiences in the spiritual heart of India.
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-sage-600 mr-2" />
                  <span>Certified Yoga Alliance Programs</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-sage-600 mr-2" />
                  <span>Traditional Ayurvedic Approach</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-sage-600 mr-2" />
                  <span>Small Group Experiences</span>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="bg-white rounded-2xl p-2 shadow-soft">
                <button
                  onClick={() => setActiveTab('retreats')}
                  className={cn(
                    'px-8 py-3 rounded-xl font-medium transition-all duration-300',
                    activeTab === 'retreats'
                      ? 'bg-sage-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-sage-50'
                  )}
                >
                  <Mountain className="w-4 h-4 mr-2 inline" />
                  Retreats
                </button>
                <button
                  onClick={() => setActiveTab('programs')}
                  className={cn(
                    'px-8 py-3 rounded-xl font-medium transition-all duration-300',
                    activeTab === 'programs'
                      ? 'bg-sage-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-sage-50'
                  )}
                >
                  <Lotus className="w-4 h-4 mr-2 inline" />
                  Programs
                </button>
                <button
                  onClick={() => setActiveTab('corporate')}
                  className={cn(
                    'px-8 py-3 rounded-xl font-medium transition-all duration-300',
                    activeTab === 'corporate'
                      ? 'bg-sage-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-sage-50'
                  )}
                >
                  <Building className="w-4 h-4 mr-2 inline" />
                  Corporate
                </button>
              </div>
            </div>

            {/* Retreats Tab */}
            {activeTab === 'retreats' && (
              <div className="grid md:grid-cols-2 gap-8">
                {retreats.map((retreat, index) => (
                  <Card
                    key={retreat.id}
                    className={cn(
                      'overflow-hidden transition-all duration-1000 transform',
                      retreatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    )}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {/* Retreat Image */}
                    <div className="relative mb-6">
                      <img
                        src={retreat.image}
                        alt={retreat.name}
                        className="w-full h-64 object-cover rounded-xl"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        {retreat.popular && (
                          <span className="px-3 py-1 bg-sage-600 text-white text-xs font-medium rounded-full">
                            Most Popular
                          </span>
                        )}
                        {retreat.signature && (
                          <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-medium rounded-full">
                            Signature
                          </span>
                        )}
                        {retreat.intensive && (
                          <span className="px-3 py-1 bg-lavender-600 text-white text-xs font-medium rounded-full">
                            Intensive
                          </span>
                        )}
                      </div>

                      {/* Price Badge */}
                      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3">
                        <div className="text-right">
                          {retreat.originalPrice && (
                            <div className="text-sm text-gray-500 line-through">₹{retreat.originalPrice.toLocaleString()}</div>
                          )}
                          <div className="text-xl font-bold text-sage-600">₹{retreat.price.toLocaleString()}</div>
                          <div className="text-xs text-gray-600">{retreat.duration}</div>
                        </div>
                      </div>
                    </div>

                    {/* Retreat Details */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-2xl font-serif font-bold text-gray-900">{retreat.name}</h3>
                          <p className="text-sage-600 font-medium">{retreat.type}</p>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                          <Heart className="w-5 h-5" />
                        </button>
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed">{retreat.description}</p>

                      {/* Retreat Info */}
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{retreat.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          <span>Max {retreat.maxParticipants} people</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="w-4 h-4 mr-2" />
                          <span>{retreat.level}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-2 text-yellow-500" />
                          <span>4.9/5 rating</span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Program Highlights</h4>
                        <div className="space-y-1">
                          {retreat.highlights.slice(0, 3).map((highlight) => (
                            <div key={highlight} className="flex items-center text-sm text-gray-600">
                              <Sparkles className="w-3 h-3 text-sage-600 mr-2 flex-shrink-0" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button
                          variant="primary"
                          className="flex-1"
                          onClick={() => openRetreatBooking(retreat)}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Retreat
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => openRetreatModal(retreat)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Programs Tab */}
            {activeTab === 'programs' && (
              <div
                ref={programsRef}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {programs.map((program, index) => (
                  <Card
                    key={program.id}
                    className={cn(
                      'overflow-hidden cursor-pointer transition-all duration-1000 transform',
                      programsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    )}
                    style={{ animationDelay: `${index * 150}ms` }}
                    onClick={() => openProgramModal(program)}
                  >
                    {/* Program Image */}
                    <div className="relative mb-6">
                      <img
                        src={program.image}
                        alt={program.name}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        {program.popular && (
                          <span className="px-3 py-1 bg-sage-600 text-white text-xs font-medium rounded-full">
                            Popular
                          </span>
                        )}
                        {program.beginner && (
                          <span className="px-3 py-1 bg-lavender-600 text-white text-xs font-medium rounded-full">
                            Beginner
                          </span>
                        )}
                      </div>

                      {/* Price Badge */}
                      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3">
                        <div className="text-right">
                          {program.originalPrice && (
                            <div className="text-sm text-gray-500 line-through">₹{program.originalPrice.toLocaleString()}</div>
                          )}
                          <div className="text-xl font-bold text-sage-600">₹{program.price.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    {/* Program Details */}
                    <div>
                      <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">{program.name}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">{program.description}</p>

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{program.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          <span>{program.sessions} sessions</span>
                        </div>
                      </div>

                      <Button variant="primary" className="w-full">
                        <Calendar className="w-4 h-4 mr-2" />
                        Join Program
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Corporate Tab */}
            {activeTab === 'corporate' && (
              <div
                ref={corporateRef}
                className="space-y-8"
              >
                <div
                  className={cn(
                    'text-center mb-12 transition-all duration-1000 transform',
                    corporateVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  )}
                >
                  <h3 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                    Corporate Wellness Programs
                  </h3>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Enhance employee wellbeing and productivity through customized wellness programs 
                    designed for modern organizations.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {corporatePackages.map((pkg, index) => (
                    <Card
                      key={pkg.name}
                      className={cn(
                        'text-center transition-all duration-1000 transform',
                        corporateVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      )}
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage-100 flex items-center justify-center">
                        <Building className="w-8 h-8 text-sage-600" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3">{pkg.name}</h4>
                      <div className="text-2xl font-bold text-sage-600 mb-2">{pkg.price}</div>
                      <div className="text-sm text-gray-600 mb-4">{pkg.duration} • Min {pkg.minParticipants} participants</div>
                      <p className="text-gray-600 mb-6 leading-relaxed">{pkg.description}</p>
                      
                      <div className="space-y-2 mb-6">
                        {pkg.includes.map((item) => (
                          <div key={item} className="flex items-center text-sm text-gray-600">
                            <Check className="w-3 h-3 text-sage-600 mr-2 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <Button variant="primary" className="w-full">
                        <Phone className="w-4 h-4 mr-2" />
                        Get Quote
                      </Button>
                    </Card>
                  ))}
                </div>

                {/* Corporate Benefits */}
                <div className="bg-gradient-to-r from-sage-600 to-lavender-600 rounded-3xl p-12 text-white text-center">
                  <Globe className="w-16 h-16 mx-auto mb-6 text-sage-100" />
                  <h3 className="text-3xl font-serif font-bold mb-4">
                    Why Choose Corporate Wellness?
                  </h3>
                  <div className="grid md:grid-cols-3 gap-8 mt-8">
                    <div>
                      <div className="text-3xl font-bold mb-2">40%</div>
                      <div className="text-sage-100">Reduced Stress Levels</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">25%</div>
                      <div className="text-sage-100">Increased Productivity</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">60%</div>
                      <div className="text-sage-100">Better Team Cohesion</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="section-padding bg-white/50">
          <div className="container-max">
            <div className="text-center bg-gradient-to-r from-sage-600 to-lavender-600 rounded-3xl p-12 text-white">
              <Mountain className="w-16 h-16 mx-auto mb-6 text-sage-100" />
              <h3 className="text-3xl font-serif font-bold mb-4">
                Ready to Transform Your Life?
              </h3>
              <p className="text-xl text-sage-100 mb-8 max-w-2xl mx-auto">
                Join thousands who have discovered inner peace, improved health, and lasting transformation 
                through our authentic wellness programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-sage-600 hover:bg-sage-50"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Free Consultation
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white border-white/30 hover:bg-white/10"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call +91 98765 43210
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Retreat Details Modal */}
      <Modal
        isOpen={isRetreatOpen}
        onClose={closeRetreat}
        size="xl"
        className="p-0"
      >
        {selectedRetreat && (
          <div className="relative">
            <img
              src={selectedRetreat.image}
              alt={selectedRetreat.name}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900">{selectedRetreat.name}</h3>
                  <p className="text-sage-600 font-medium">{selectedRetreat.type}</p>
                </div>
                <div className="text-right">
                  {selectedRetreat.originalPrice && (
                    <div className="text-sm text-gray-500 line-through">₹{selectedRetreat.originalPrice.toLocaleString()}</div>
                  )}
                  <div className="text-2xl font-bold text-sage-600">₹{selectedRetreat.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">{selectedRetreat.duration}</div>
                </div>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{selectedRetreat.description}</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Program Highlights:</h4>
                  <div className="space-y-2">
                    {selectedRetreat.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-center text-sm text-gray-600">
                        <Sparkles className="w-4 h-4 text-sage-600 mr-3 flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Includes:</h4>
                  <div className="space-y-2">
                    {selectedRetreat.includes.map((item) => (
                      <div key={item} className="flex items-center text-sm text-gray-600">
                        <Check className="w-4 h-4 text-sage-600 mr-3 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Daily Schedule:</h4>
                <div className="bg-sage-50 rounded-lg p-4">
                  <div className="grid gap-2">
                    {selectedRetreat.schedule.map((item, index) => (
                      <div key={index} className="text-sm text-gray-700">{item}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={closeRetreat}>
                  Close
                </Button>
                <Button variant="primary" className="flex-1" onClick={() => openRetreatBooking(selectedRetreat)}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Program Details Modal */}
      <Modal
        isOpen={isProgramOpen}
        onClose={closeProgram}
        size="lg"
        className="p-0"
      >
        {selectedProgram && (
          <div className="relative">
            <img
              src={selectedProgram.image}
              alt={selectedProgram.name}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900">{selectedProgram.name}</h3>
                  <p className="text-sage-600 font-medium">{selectedProgram.category}</p>
                </div>
                <div className="text-right">
                  {selectedProgram.originalPrice && (
                    <div className="text-sm text-gray-500 line-through">₹{selectedProgram.originalPrice.toLocaleString()}</div>
                  )}
                  <div className="text-2xl font-bold text-sage-600">₹{selectedProgram.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">{selectedProgram.sessions} sessions</div>
                </div>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{selectedProgram.description}</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Benefits:</h4>
                  <div className="space-y-2">
                    {selectedProgram.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center text-sm text-gray-600">
                        <Heart className="w-4 h-4 text-sage-600 mr-3 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Includes:</h4>
                  <div className="space-y-2">
                    {selectedProgram.includes.map((item) => (
                      <div key={item} className="flex items-center text-sm text-gray-600">
                        <Check className="w-4 h-4 text-sage-600 mr-3 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={closeProgram}>
                  Close
                </Button>
                <Button variant="primary" className="flex-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  Join Program
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Booking Modal */}
      <Modal
        isOpen={isBookingOpen}
        onClose={closeBooking}
        title="Book Your Retreat"
        size="lg"
      >
        {selectedRetreat && (
          <div>
            <div className="flex items-center mb-6">
              <img
                src={selectedRetreat.image}
                alt={selectedRetreat.name}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedRetreat.name}</h3>
                <p className="text-sage-600">{selectedRetreat.duration}</p>
                <p className="text-lg font-bold text-sage-600">₹{selectedRetreat.price.toLocaleString()}</p>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Start Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Participants</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent">
                    <option>1 Person</option>
                    <option>2 People</option>
                    <option>3 People</option>
                    <option>4 People</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Accommodation Preference</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent">
                  <option>Shared Room</option>
                  <option>Private Room (+₹5,000)</option>
                  <option>Luxury Suite (+₹12,000)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Dietary restrictions, health conditions, or special requests..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                />
              </div>

              <div className="bg-sage-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Booking Summary</h4>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Retreat Fee</span>
                  <span>₹{selectedRetreat.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Service Tax (18%)</span>
                  <span>₹{Math.round(selectedRetreat.price * 0.18).toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-gray-900">
                  <span>Total Amount</span>
                  <span>₹{Math.round(selectedRetreat.price * 1.18).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={closeBooking}>
                  Cancel
                </Button>
                <Button variant="primary" className="flex-1">
                  Confirm Booking
                </Button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default RetreatsSection;