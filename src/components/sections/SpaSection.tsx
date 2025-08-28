import React, { useState } from 'react';
import { 
  Sparkles, 
  Leaf, 
  Heart, 
  Clock, 
  Users, 
  Star,
  ArrowRight,
  Check,
  Calendar,
  Gift,
  Flower,
  Sun,
  Moon,
  Droplets,
  Zap,
  Shield,
  Award
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useModal } from '../../hooks/useModal';
import { cn } from '../../utils/cn';

interface Treatment {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  duration: string;
  description: string;
  benefits: string[];
  image: string;
  popular?: boolean;
  signature?: boolean;
  ayurvedic?: boolean;
}

interface Package {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  duration: string;
  treatments: string[];
  description: string;
  includes: string[];
  image: string;
  popular?: boolean;
  luxury?: boolean;
}

const SpaSection: React.FC = () => {
  const { ref: spaRef, isVisible: spaVisible } = useScrollAnimation();
  const { ref: treatmentsRef, isVisible: treatmentsVisible } = useScrollAnimation();
  const { ref: packagesRef, isVisible: packagesVisible } = useScrollAnimation();
  const { isOpen: isTreatmentOpen, openModal: openTreatment, closeModal: closeTreatment } = useModal();
  const { isOpen: isBookingOpen, openModal: openBooking, closeModal: closeBooking } = useModal();
  
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const treatments: Treatment[] = [
    {
      id: 'abhyanga',
      name: 'Abhyanga Full Body Massage',
      category: 'ayurvedic',
      price: 3500,
      originalPrice: 4000,
      duration: '90 minutes',
      description: 'Traditional Ayurvedic full-body oil massage using warm herbal oils to balance doshas and promote deep relaxation.',
      benefits: ['Improves circulation', 'Reduces stress', 'Balances doshas', 'Nourishes skin', 'Promotes better sleep'],
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      popular: true,
      ayurvedic: true
    },
    {
      id: 'shirodhara',
      name: 'Shirodhara Therapy',
      category: 'ayurvedic',
      price: 4500,
      originalPrice: 5500,
      duration: '60 minutes',
      description: 'Continuous stream of warm oil poured over the forehead to calm the nervous system and achieve mental clarity.',
      benefits: ['Reduces anxiety', 'Improves mental clarity', 'Balances nervous system', 'Enhances meditation', 'Relieves insomnia'],
      image: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      signature: true,
      ayurvedic: true
    },
    {
      id: 'panchakarma',
      name: 'Panchakarma Detox',
      category: 'ayurvedic',
      price: 12000,
      originalPrice: 15000,
      duration: '3 hours',
      description: 'Complete Ayurvedic detoxification program including multiple therapies to cleanse and rejuvenate the body.',
      benefits: ['Deep detoxification', 'Boosts immunity', 'Improves digestion', 'Increases energy', 'Mental clarity'],
      image: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      signature: true,
      ayurvedic: true
    },
    {
      id: 'hot-stone',
      name: 'Himalayan Hot Stone Massage',
      category: 'massage',
      price: 4000,
      originalPrice: 4800,
      duration: '75 minutes',
      description: 'Therapeutic massage using heated Himalayan stones to release tension and promote deep muscle relaxation.',
      benefits: ['Relieves muscle tension', 'Improves circulation', 'Reduces stress', 'Promotes relaxation', 'Pain relief'],
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      popular: true
    },
    {
      id: 'aromatherapy',
      name: 'Aromatherapy Massage',
      category: 'massage',
      price: 3200,
      originalPrice: 3800,
      duration: '60 minutes',
      description: 'Relaxing massage with essential oils chosen specifically for your needs and preferences.',
      benefits: ['Reduces stress', 'Improves mood', 'Enhances relaxation', 'Boosts immunity', 'Better sleep quality'],
      image: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    {
      id: 'deep-tissue',
      name: 'Deep Tissue Therapy',
      category: 'massage',
      price: 3800,
      duration: '75 minutes',
      description: 'Intensive massage targeting deep muscle layers to release chronic tension and knots.',
      benefits: ['Releases chronic tension', 'Improves mobility', 'Reduces pain', 'Better posture', 'Increased flexibility'],
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    {
      id: 'herbal-facial',
      name: 'Ayurvedic Herbal Facial',
      category: 'facial',
      price: 2800,
      originalPrice: 3200,
      duration: '60 minutes',
      description: 'Rejuvenating facial using organic herbs and natural ingredients to restore skin radiance.',
      benefits: ['Glowing skin', 'Reduces signs of aging', 'Deep cleansing', 'Natural hydration', 'Improved texture'],
      image: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      ayurvedic: true
    },
    {
      id: 'gold-facial',
      name: '24K Gold Luxury Facial',
      category: 'facial',
      price: 5500,
      originalPrice: 6500,
      duration: '90 minutes',
      description: 'Premium anti-aging facial with 24K gold to rejuvenate and firm the skin for a youthful glow.',
      benefits: ['Anti-aging effects', 'Firms skin', 'Reduces fine lines', 'Luxury experience', 'Radiant complexion'],
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      signature: true
    }
  ];

  const packages: Package[] = [
    {
      id: 'wellness-day',
      name: 'Complete Wellness Day',
      price: 8500,
      originalPrice: 10500,
      duration: '6 hours',
      treatments: ['Abhyanga Massage', 'Herbal Facial', 'Yoga Session', 'Meditation'],
      description: 'Full day of rejuvenation combining traditional Ayurvedic treatments with yoga and meditation.',
      includes: ['Welcome drink', 'Healthy lunch', 'Herbal tea', 'Wellness consultation', 'Take-home products'],
      image: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      popular: true
    },
    {
      id: 'detox-retreat',
      name: '3-Day Detox Retreat',
      price: 18500,
      originalPrice: 22000,
      duration: '3 days',
      treatments: ['Panchakarma', 'Daily Yoga', 'Meditation', 'Nutritional Counseling'],
      description: 'Comprehensive 3-day program to cleanse body and mind through Ayurvedic detox and lifestyle practices.',
      includes: ['Accommodation', 'All meals', 'Daily treatments', 'Yoga classes', 'Wellness consultation'],
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      luxury: true
    },
    {
      id: 'couples-package',
      name: 'Couples Harmony Package',
      price: 12000,
      originalPrice: 14000,
      duration: '4 hours',
      treatments: ['Couples Massage', 'Private Yoga', 'Meditation Session', 'Romantic Dinner'],
      description: 'Romantic wellness experience designed for couples to reconnect and rejuvenate together.',
      includes: ['Private treatment room', 'Champagne', 'Romantic dinner', 'Rose petals', 'Couples consultation'],
      image: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      popular: true
    },
    {
      id: 'luxury-experience',
      name: 'Ultimate Luxury Experience',
      price: 25000,
      originalPrice: 30000,
      duration: '8 hours',
      treatments: ['Shirodhara', '24K Gold Facial', 'Hot Stone Massage', 'Private Chef'],
      description: 'The pinnacle of luxury wellness with premium treatments and personalized service.',
      includes: ['Private villa', 'Personal butler', 'Gourmet meals', 'Premium products', 'Luxury amenities'],
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      luxury: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Treatments', icon: Sparkles },
    { id: 'ayurvedic', name: 'Ayurvedic', icon: Leaf },
    { id: 'massage', name: 'Massage', icon: Heart },
    { id: 'facial', name: 'Facial', icon: Sun }
  ];

  const filteredTreatments = activeCategory === 'all' 
    ? treatments 
    : treatments.filter(treatment => treatment.category === activeCategory);

  const openTreatmentModal = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
    openTreatment();
  };

  const openPackageBooking = (pkg: Package) => {
    setSelectedPackage(pkg);
    openBooking();
  };

  return (
    <section id="spa" className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-lavender-50 via-white to-sage-50" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-lavender-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-sage-100/20 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="section-padding">
          <div className="container-max">
            <div
              ref={spaRef}
              className={cn(
                'text-center mb-16 transition-all duration-1000 transform',
                spaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <div className="inline-flex items-center px-6 py-3 bg-lavender-100 rounded-full mb-6">
                <Sparkles className="w-5 h-5 text-lavender-600 mr-2" />
                <span className="text-lavender-800 font-medium">Spa & Wellness</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
                Rejuvenating Treatments
                <span className="block text-gradient">Ancient Wisdom, Modern Luxury</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                Experience authentic Ayurvedic treatments and modern spa therapies designed to restore 
                balance, promote healing, and rejuvenate your mind, body, and spirit.
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-lavender-600 mr-2" />
                  <span>Certified Ayurvedic Practitioners</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-lavender-600 mr-2" />
                  <span>Organic & Natural Products</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-lavender-600 mr-2" />
                  <span>Personalized Treatment Plans</span>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      'flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300',
                      activeCategory === category.id
                        ? 'bg-lavender-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-lavender-50 shadow-soft'
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.name}
                  </button>
                );
              })}
            </div>

            {/* Treatments Grid */}
            <div
              ref={treatmentsRef}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
            >
              {filteredTreatments.map((treatment, index) => (
                <Card
                  key={treatment.id}
                  className={cn(
                    'overflow-hidden cursor-pointer transition-all duration-1000 transform',
                    treatmentsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  )}
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => openTreatmentModal(treatment)}
                >
                  {/* Treatment Image */}
                  <div className="relative mb-6">
                    <img
                      src={treatment.image}
                      alt={treatment.name}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {treatment.popular && (
                        <span className="px-3 py-1 bg-lavender-600 text-white text-xs font-medium rounded-full">
                          Popular
                        </span>
                      )}
                      {treatment.signature && (
                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-medium rounded-full">
                          Signature
                        </span>
                      )}
                      {treatment.ayurvedic && (
                        <span className="px-3 py-1 bg-sage-600 text-white text-xs font-medium rounded-full">
                          Ayurvedic
                        </span>
                      )}
                    </div>

                    {/* Price Badge */}
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-right">
                        {treatment.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">₹{treatment.originalPrice.toLocaleString()}</div>
                        )}
                        <div className="text-xl font-bold text-lavender-600">₹{treatment.price.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  {/* Treatment Details */}
                  <div>
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">{treatment.name}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">{treatment.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{treatment.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        <span>4.8/5</span>
                      </div>
                    </div>

                    <Button variant="primary" className="w-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Treatment
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Wellness Packages */}
        <div className="section-padding bg-white/50">
          <div className="container-max">
            <div
              ref={packagesRef}
              className={cn(
                'text-center mb-16 transition-all duration-1000 transform',
                packagesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <h3 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                Wellness Packages
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive wellness experiences combining multiple treatments for 
                maximum benefit and value.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {packages.map((pkg, index) => (
                <Card
                  key={pkg.id}
                  className={cn(
                    'overflow-hidden transition-all duration-1000 transform',
                    packagesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  )}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Package Image */}
                  <div className="relative mb-6">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {pkg.popular && (
                        <span className="px-3 py-1 bg-lavender-600 text-white text-xs font-medium rounded-full">
                          Most Popular
                        </span>
                      )}
                      {pkg.luxury && (
                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-medium rounded-full">
                          Luxury
                        </span>
                      )}
                    </div>

                    {/* Price Badge */}
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-right">
                        {pkg.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">₹{pkg.originalPrice.toLocaleString()}</div>
                        )}
                        <div className="text-2xl font-bold text-lavender-600">₹{pkg.price.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">{pkg.duration}</div>
                      </div>
                    </div>
                  </div>

                  {/* Package Details */}
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">{pkg.name}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{pkg.description}</p>

                    {/* Treatments Included */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Treatments Included:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {pkg.treatments.map((treatment) => (
                          <div key={treatment} className="flex items-center text-sm text-gray-600">
                            <Sparkles className="w-3 h-3 text-lavender-600 mr-2 flex-shrink-0" />
                            <span>{treatment}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Package Includes */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Package Includes:</h4>
                      <div className="space-y-1">
                        {pkg.includes.slice(0, 3).map((item) => (
                          <div key={item} className="flex items-center text-sm text-gray-600">
                            <Check className="w-3 h-3 text-sage-600 mr-2 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => openPackageBooking(pkg)}
                    >
                      <Gift className="w-4 h-4 mr-2" />
                      Book Package
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Therapist Expertise */}
        <div className="section-padding">
          <div className="container-max">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                Expert Therapists
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                Our certified practitioners bring years of experience in traditional 
                Ayurvedic healing and modern wellness techniques.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Award,
                  title: 'Certified Ayurvedic Doctors',
                  description: 'BAMS qualified practitioners with 10+ years experience in traditional healing.',
                  color: 'text-lavender-600'
                },
                {
                  icon: Shield,
                  title: 'Licensed Massage Therapists',
                  description: 'Internationally certified therapists specializing in various massage techniques.',
                  color: 'text-sage-600'
                },
                {
                  icon: Flower,
                  title: 'Holistic Wellness Experts',
                  description: 'Specialists in aromatherapy, reflexology, and energy healing modalities.',
                  color: 'text-beige-600'
                }
              ].map((expert, index) => {
                const Icon = expert.icon;
                return (
                  <Card key={expert.title} className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center`}>
                      <Icon className={`w-8 h-8 ${expert.color}`} />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">{expert.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{expert.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="section-padding bg-gradient-to-r from-lavender-600 to-sage-600">
          <div className="container-max">
            <div className="text-center text-white">
              <Droplets className="w-16 h-16 mx-auto mb-6 text-lavender-100" />
              <h3 className="text-3xl font-serif font-bold mb-4">
                Begin Your Healing Journey
              </h3>
              <p className="text-xl text-lavender-100 mb-8 max-w-2xl mx-auto">
                Book a consultation with our wellness experts to create a personalized 
                treatment plan for your unique needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-lavender-600 hover:bg-lavender-50"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Consultation
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white border-white/30 hover:bg-white/10"
                >
                  Call +91 98765 43210
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Treatment Details Modal */}
      <Modal
        isOpen={isTreatmentOpen}
        onClose={closeTreatment}
        size="lg"
        className="p-0"
      >
        {selectedTreatment && (
          <div className="relative">
            <img
              src={selectedTreatment.image}
              alt={selectedTreatment.name}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900">{selectedTreatment.name}</h3>
                  <p className="text-lavender-600 font-medium">{selectedTreatment.category}</p>
                </div>
                <div className="text-right">
                  {selectedTreatment.originalPrice && (
                    <div className="text-sm text-gray-500 line-through">₹{selectedTreatment.originalPrice.toLocaleString()}</div>
                  )}
                  <div className="text-2xl font-bold text-lavender-600">₹{selectedTreatment.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">{selectedTreatment.duration}</div>
                </div>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{selectedTreatment.description}</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Treatment Benefits:</h4>
                <div className="grid grid-cols-1 gap-2">
                  {selectedTreatment.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-sage-600 mr-3 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={closeTreatment}>
                  Close
                </Button>
                <Button variant="primary" className="flex-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Package Booking Modal */}
      <Modal
        isOpen={isBookingOpen}
        onClose={closeBooking}
        title="Book Wellness Package"
        size="lg"
      >
        {selectedPackage && (
          <div>
            <div className="flex items-center mb-6">
              <img
                src={selectedPackage.image}
                alt={selectedPackage.name}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedPackage.name}</h3>
                <p className="text-sage-600">{selectedPackage.duration}</p>
                <p className="text-lg font-bold text-lavender-600">₹{selectedPackage.price.toLocaleString()}</p>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent">
                    <option>9:00 AM</option>
                    <option>11:00 AM</option>
                    <option>2:00 PM</option>
                    <option>4:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent">
                  <option>1 Person</option>
                  <option>2 People</option>
                  <option>3 People</option>
                  <option>4 People</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Any health conditions, allergies, or special preferences..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                />
              </div>

              <div className="bg-lavender-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Package Summary</h4>
                <div className="space-y-1 text-sm text-gray-600 mb-3">
                  {selectedPackage.treatments.map((treatment) => (
                    <div key={treatment} className="flex items-center">
                      <Sparkles className="w-3 h-3 text-lavender-600 mr-2" />
                      <span>{treatment}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Package Price</span>
                  <span>₹{selectedPackage.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Service Tax (18%)</span>
                  <span>₹{Math.round(selectedPackage.price * 0.18).toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-gray-900">
                  <span>Total Amount</span>
                  <span>₹{Math.round(selectedPackage.price * 1.18).toLocaleString()}</span>
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

export default SpaSection;