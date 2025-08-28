import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageCircle,
  Calendar,
  User,
  Building,
  Globe,
  Navigation,
  Car,
  Plane,
  Train,
  Mountain,
  Waves,
  CheckCircle,
  Award,
  Heart,
  Star,
  Coffee,
  Wifi,
  Shield
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { cn } from '../../utils/cn';

const ContactSection: React.FC = () => {
  const { ref: contactRef, isVisible: contactVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();
  const { ref: locationRef, isVisible: locationVisible } = useScrollAnimation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general',
    preferredContact: 'email',
    checkIn: '',
    checkOut: '',
    guests: '2'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone & WhatsApp',
      details: ['+91 98765 43210', '+91 98765 43211 (WhatsApp)'],
      description: '24/7 Reservations & Support',
      color: 'text-green-600'
    },
    {
      icon: Mail,
      title: 'Email Addresses',
      details: ['hello@serenityspa.in', 'bookings@serenityspa.in'],
      description: 'General Inquiries & Reservations',
      color: 'text-blue-600'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: ['Serenity Spa Wellness Retreat', 'Tapovan, Rishikesh, Uttarakhand 249192'],
      description: 'Sacred Ganges Riverside',
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      title: 'Operating Hours',
      details: ['Reception: 24/7', 'Spa: 7:00 AM - 9:00 PM', 'Restaurant: 6:30 AM - 10:00 PM'],
      description: 'Always Here for You',
      color: 'text-orange-600'
    }
  ];

  const transportOptions = [
    {
      icon: Plane,
      title: 'By Air',
      description: 'Jolly Grant Airport, Dehradun (35 km)',
      details: ['45-minute drive from airport', 'Complimentary pickup for suite bookings', 'Taxi fare: ₹1,200-1,500']
    },
    {
      icon: Train,
      title: 'By Train',
      description: 'Rishikesh Railway Station (8 km)',
      details: ['15-minute drive from station', 'Auto-rickshaw: ₹150-200', 'Taxi: ₹300-400']
    },
    {
      icon: Car,
      title: 'By Road',
      description: 'Well-connected by highways',
      details: ['Delhi: 240 km (5-6 hours)', 'Haridwar: 25 km (45 minutes)', 'Dehradun: 45 km (1 hour)']
    }
  ];

  const nearbyAttractions = [
    { name: 'Laxman Jhula', distance: '3 km', time: '10 min drive' },
    { name: 'Ram Jhula', distance: '5 km', time: '15 min drive' },
    { name: 'Beatles Ashram', distance: '4 km', time: '12 min drive' },
    { name: 'Triveni Ghat', distance: '6 km', time: '18 min drive' },
    { name: 'Neelkanth Mahadev', distance: '12 km', time: '30 min drive' },
    { name: 'Rajaji National Park', distance: '18 km', time: '45 min drive' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general',
        preferredContact: 'email',
        checkIn: '',
        checkOut: '',
        guests: '2'
      });
    }, 3000);
  };

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage-50 via-white to-lavender-50" />
      <div className="absolute top-32 right-10 w-80 h-80 bg-sage-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-32 left-10 w-96 h-96 bg-lavender-100/20 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="section-padding">
          <div className="container-max">
            <div
              ref={contactRef}
              className={cn(
                'text-center mb-16 transition-all duration-1000 transform',
                contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <div className="inline-flex items-center px-6 py-3 bg-sage-100 rounded-full mb-6">
                <MessageCircle className="w-5 h-5 text-sage-600 mr-2" />
                <span className="text-sage-800 font-medium">Get in Touch</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
                Contact Us
                <span className="block text-gradient">Begin Your Wellness Journey</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                Ready to embark on your transformative wellness experience? Our dedicated team is here 
                to help you plan the perfect retreat in the spiritual heart of India.
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-sage-600 mr-2" />
                  <span>24/7 Support Available</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-sage-600 mr-2" />
                  <span>Personalized Consultation</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-sage-600 mr-2" />
                  <span>Instant Booking Confirmation</span>
                </div>
              </div>
            </div>

            {/* Contact Information Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card
                    key={info.title}
                    className={cn(
                      'text-center transition-all duration-1000 transform',
                      contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    )}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center`}>
                      <Icon className={`w-8 h-8 ${info.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{info.title}</h3>
                    <div className="space-y-1 mb-3">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-700 font-medium">{detail}</p>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{info.description}</p>
                  </Card>
                );
              })}
            </div>

            {/* Contact Form and Map */}
            <div className="grid lg:grid-cols-2 gap-12 mb-20">
              {/* Contact Form */}
              <div
                ref={formRef}
                className={cn(
                  'transition-all duration-1000 transform',
                  formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                )}
              >
                <Card className="p-8">
                  <h3 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                    Send Us a Message
                  </h3>
                  
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h4 className="text-2xl font-semibold text-gray-900 mb-2">Message Sent!</h4>
                      <p className="text-gray-600">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type</label>
                          <select
                            name="inquiryType"
                            value={formData.inquiryType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                          >
                            <option value="general">General Inquiry</option>
                            <option value="booking">Room Booking</option>
                            <option value="spa">Spa Services</option>
                            <option value="retreat">Wellness Retreat</option>
                            <option value="corporate">Corporate Booking</option>
                            <option value="dining">Dining Reservation</option>
                          </select>
                        </div>
                      </div>

                      {(formData.inquiryType === 'booking' || formData.inquiryType === 'retreat') && (
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                            <input
                              type="date"
                              name="checkIn"
                              value={formData.checkIn}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                            <input
                              type="date"
                              name="checkOut"
                              value={formData.checkOut}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                            <select
                              name="guests"
                              value={formData.guests}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                            >
                              <option value="1">1 Guest</option>
                              <option value="2">2 Guests</option>
                              <option value="3">3 Guests</option>
                              <option value="4">4 Guests</option>
                              <option value="5+">5+ Guests</option>
                            </select>
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                          placeholder="Brief subject of your inquiry"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={5}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                          placeholder="Please share details about your wellness goals, any health conditions, dietary preferences, or special requirements..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact Method</label>
                        <div className="flex gap-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="preferredContact"
                              value="email"
                              checked={formData.preferredContact === 'email'}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            Email
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="preferredContact"
                              value="phone"
                              checked={formData.preferredContact === 'phone'}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            Phone
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="preferredContact"
                              value="whatsapp"
                              checked={formData.preferredContact === 'whatsapp'}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            WhatsApp
                          </label>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </Card>
              </div>

              {/* Location Map */}
              <div
                ref={locationRef}
                className={cn(
                  'transition-all duration-1000 transform',
                  locationVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                )}
              >
                <Card className="p-8 h-full">
                  <h3 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                    Find Us in Rishikesh
                  </h3>
                  
                  {/* Map Placeholder */}
                  <div className="relative bg-gradient-to-br from-sage-100 to-lavender-100 rounded-xl h-64 mb-6 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-sage-600 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">Interactive Map</h4>
                      <p className="text-gray-600">Serenity Spa Wellness Retreat</p>
                      <p className="text-sm text-gray-500">Tapovan, Rishikesh, Uttarakhand</p>
                    </div>
                    
                    {/* Map Markers */}
                    <div className="absolute top-4 left-4 flex items-center px-3 py-2 bg-white/90 backdrop-blur-sm rounded-lg">
                      <Mountain className="w-4 h-4 text-sage-600 mr-2" />
                      <span className="text-sm font-medium">Himalayas</span>
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center px-3 py-2 bg-white/90 backdrop-blur-sm rounded-lg">
                      <Waves className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-sm font-medium">River Ganges</span>
                    </div>
                  </div>

                  {/* Location Details */}
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Navigation className="w-5 h-5 text-sage-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">GPS Coordinates</h4>
                        <p className="text-gray-600">30.0869° N, 78.2676° E</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Globe className="w-5 h-5 text-sage-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">What3Words</h4>
                        <p className="text-gray-600">///peaceful.wellness.retreat</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Building className="w-5 h-5 text-sage-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Landmark</h4>
                        <p className="text-gray-600">200m from Ganges River, near Parmarth Niketan Ashram</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <Button variant="outline" className="w-full">
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </Card>
              </div>
            </div>

            {/* Transportation Options */}
            <div className="mb-20">
              <h3 className="text-4xl font-serif font-bold text-gray-900 text-center mb-12">
                How to Reach Us
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {transportOptions.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <Card
                      key={option.title}
                      className={cn(
                        'text-center transition-all duration-1000 transform',
                        locationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      )}
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage-100 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-sage-600" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3">{option.title}</h4>
                      <p className="text-sage-600 font-medium mb-4">{option.description}</p>
                      <div className="space-y-2">
                        {option.details.map((detail, idx) => (
                          <p key={idx} className="text-sm text-gray-600">{detail}</p>
                        ))}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Nearby Attractions */}
            <div className="mb-20">
              <h3 className="text-4xl font-serif font-bold text-gray-900 text-center mb-12">
                Nearby Attractions
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nearbyAttractions.map((attraction, index) => (
                  <div
                    key={attraction.name}
                    className={cn(
                      'flex items-center p-4 bg-white rounded-xl shadow-soft hover:shadow-soft-lg transition-all duration-300',
                      locationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <MapPin className="w-5 h-5 text-sage-600 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{attraction.name}</h4>
                      <p className="text-sm text-gray-600">{attraction.distance} • {attraction.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities & Services */}
            <div className="mb-20">
              <h3 className="text-4xl font-serif font-bold text-gray-900 text-center mb-12">
                Guest Services & Amenities
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: Car, title: 'Airport Transfer', description: 'Complimentary for suite bookings' },
                  { icon: Wifi, title: 'Free WiFi', description: 'High-speed internet throughout' },
                  { icon: Coffee, title: '24/7 Room Service', description: 'Wellness cuisine anytime' },
                  { icon: Shield, title: 'Concierge Service', description: 'Personal assistance available' }
                ].map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <div
                      key={service.title}
                      className={cn(
                        'text-center transition-all duration-1000 transform',
                        locationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      )}
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-lavender-100 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-lavender-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{service.title}</h4>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="section-padding bg-gradient-to-r from-sage-600 to-lavender-600">
          <div className="container-max">
            <div className="text-center text-white">
              <Heart className="w-16 h-16 mx-auto mb-6 text-sage-100" />
              <h3 className="text-3xl font-serif font-bold mb-4">
                Ready to Begin Your Wellness Journey?
              </h3>
              <p className="text-xl text-sage-100 mb-8 max-w-2xl mx-auto">
                Our wellness experts are standing by to help you create the perfect retreat experience. 
                Contact us today and take the first step toward transformation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-sage-600 hover:bg-sage-50"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Consultation
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white border-white/30 hover:bg-white/10"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: +91 98765 43210
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;