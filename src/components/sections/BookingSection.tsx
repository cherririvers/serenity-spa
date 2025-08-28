import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  Check,
  ArrowRight,
  Star,
  Heart,
  Gift,
  Phone,
  Mail,
  CreditCard,
  Shield,
  Award,
  Sparkles,
  Leaf,
  Mountain,
  Sun,
  Moon,
  Coffee,
  Wifi,
  Car,
  Utensils
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useModal } from '../../hooks/useModal';
import { cn } from '../../utils/cn';

interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  specialRequests: string;
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
  };
  addOns: string[];
  totalAmount: number;
}

const BookingSection: React.FC = () => {
  const { ref: bookingRef, isVisible: bookingVisible } = useScrollAnimation();
  const { ref: availabilityRef, isVisible: availabilityVisible } = useScrollAnimation();
  const { isOpen: isBookingOpen, openModal: openBooking, closeModal: closeBooking } = useModal();
  const { isOpen: isConfirmOpen, openModal: openConfirm, closeModal: closeConfirm } = useModal();
  
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    checkIn: '',
    checkOut: '',
    guests: 2,
    roomType: '',
    specialRequests: '',
    guestInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: 'India'
    },
    addOns: [],
    totalAmount: 0
  });

  const [availabilityData, setAvailabilityData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    roomType: 'any'
  });

  const [availableRooms, setAvailableRooms] = useState<any[]>([]);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

  const roomTypes = [
    {
      id: 'deluxe-garden',
      name: 'Deluxe Garden View',
      price: 8500,
      originalPrice: 10000,
      size: '350 sq ft',
      occupancy: 2,
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      amenities: ['King Size Bed', 'Garden View', 'Air Conditioning', 'Mini Bar', 'Free WiFi'],
      available: 3,
      popular: true
    },
    {
      id: 'premium-river',
      name: 'Premium River View',
      price: 12500,
      originalPrice: 15000,
      size: '450 sq ft',
      occupancy: 2,
      image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      amenities: ['King Size Bed', 'River View', 'Private Balcony', 'Air Conditioning', 'Mini Bar'],
      available: 2
    },
    {
      id: 'luxury-suite',
      name: 'Himalayan Luxury Suite',
      price: 18500,
      originalPrice: 22000,
      size: '650 sq ft',
      occupancy: 3,
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      amenities: ['Separate Living Area', 'Mountain View', 'Private Balcony', 'Jacuzzi', 'Butler Service'],
      available: 1,
      luxury: true
    },
    {
      id: 'wellness-villa',
      name: 'Wellness Villa',
      price: 25000,
      originalPrice: 30000,
      size: '800 sq ft',
      occupancy: 4,
      image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      amenities: ['Private Garden', 'Outdoor Pavilion', 'Kitchen', 'Living Room', 'Two Bedrooms'],
      available: 1,
      luxury: true
    }
  ];

  const addOnServices = [
    { id: 'airport-transfer', name: 'Airport Transfer', price: 1500, description: 'Round-trip from Dehradun Airport' },
    { id: 'spa-package', name: 'Welcome Spa Package', price: 3500, description: '90-min Abhyanga massage + herbal facial' },
    { id: 'yoga-classes', name: 'Daily Yoga Classes', price: 2500, description: '7 days of morning yoga sessions' },
    { id: 'ayurvedic-consultation', name: 'Ayurvedic Consultation', price: 2000, description: 'Personal dosha assessment with Dr. Priya' },
    { id: 'cooking-class', name: 'Cooking Workshop', price: 1800, description: 'Learn Ayurvedic cooking with Chef Meera' },
    { id: 'meditation-program', name: 'Meditation Program', price: 3000, description: '5-day guided meditation course' }
  ];

  const checkAvailability = async () => {
    setIsCheckingAvailability(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Filter rooms based on criteria
    const filtered = roomTypes.filter(room => {
      if (availabilityData.roomType !== 'any' && room.id !== availabilityData.roomType) return false;
      if (room.occupancy < availabilityData.guests) return false;
      return room.available > 0;
    });
    
    setAvailableRooms(filtered);
    setIsCheckingAvailability(false);
  };

  const selectRoom = (room: any) => {
    setBookingData(prev => ({
      ...prev,
      roomType: room.id,
      totalAmount: room.price
    }));
    openBooking();
  };

  const handleBookingSubmit = () => {
    closeBooking();
    openConfirm();
  };

  const calculateTotal = () => {
    const room = roomTypes.find(r => r.id === bookingData.roomType);
    const roomPrice = room ? room.price : 0;
    const addOnTotal = bookingData.addOns.reduce((total, addOnId) => {
      const addOn = addOnServices.find(a => a.id === addOnId);
      return total + (addOn ? addOn.price : 0);
    }, 0);
    const subtotal = roomPrice + addOnTotal;
    const tax = Math.round(subtotal * 0.18);
    return { roomPrice, addOnTotal, subtotal, tax, total: subtotal + tax };
  };

  return (
    <section id="booking" className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-lavender-50 via-white to-sage-50" />
      <div className="absolute top-32 left-10 w-80 h-80 bg-lavender-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-32 right-10 w-96 h-96 bg-sage-100/20 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="section-padding">
          <div className="container-max">
            <div
              ref={bookingRef}
              className={cn(
                'text-center mb-16 transition-all duration-1000 transform',
                bookingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <div className="inline-flex items-center px-6 py-3 bg-lavender-100 rounded-full mb-6">
                <Calendar className="w-5 h-5 text-lavender-600 mr-2" />
                <span className="text-lavender-800 font-medium">Reserve Your Stay</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
                Book Your Retreat
                <span className="block text-gradient">Secure Your Wellness Journey</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                Reserve your transformative wellness experience at India's premier spa retreat. 
                Check availability, select your perfect room, and begin your journey to inner peace.
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-lavender-600 mr-2" />
                  <span>Instant Confirmation</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-lavender-600 mr-2" />
                  <span>Best Rate Guarantee</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-lavender-600 mr-2" />
                  <span>Free Cancellation</span>
                </div>
              </div>
            </div>

            {/* Availability Checker */}
            <div
              ref={availabilityRef}
              className={cn(
                'max-w-4xl mx-auto mb-16 transition-all duration-1000 transform',
                availabilityVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <Card className="p-8">
                <h3 className="text-3xl font-serif font-bold text-gray-900 text-center mb-8">
                  Check Availability
                </h3>
                
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                    <input
                      type="date"
                      value={availabilityData.checkIn}
                      onChange={(e) => setAvailabilityData(prev => ({ ...prev, checkIn: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                    <input
                      type="date"
                      value={availabilityData.checkOut}
                      onChange={(e) => setAvailabilityData(prev => ({ ...prev, checkOut: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                      min={availabilityData.checkIn || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                    <select
                      value={availabilityData.guests}
                      onChange={(e) => setAvailabilityData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                    <select
                      value={availabilityData.roomType}
                      onChange={(e) => setAvailabilityData(prev => ({ ...prev, roomType: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                    >
                      <option value="any">Any Room Type</option>
                      <option value="deluxe-garden">Deluxe Garden View</option>
                      <option value="premium-river">Premium River View</option>
                      <option value="luxury-suite">Luxury Suite</option>
                      <option value="wellness-villa">Wellness Villa</option>
                    </select>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={checkAvailability}
                    disabled={!availabilityData.checkIn || !availabilityData.checkOut || isCheckingAvailability}
                    className="px-12"
                  >
                    {isCheckingAvailability ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Checking Availability...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5 mr-2" />
                        Check Availability
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </div>

            {/* Available Rooms */}
            {availableRooms.length > 0 && (
              <div className="mb-16">
                <h3 className="text-4xl font-serif font-bold text-gray-900 text-center mb-12">
                  Available Rooms
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {availableRooms.map((room, index) => (
                    <Card
                      key={room.id}
                      className={cn(
                        'overflow-hidden transition-all duration-1000 transform',
                        availabilityVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      )}
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div className="relative">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-64 object-cover"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          {room.popular && (
                            <span className="px-3 py-1 bg-lavender-600 text-white text-xs font-medium rounded-full">
                              Most Popular
                            </span>
                          )}
                          {room.luxury && (
                            <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-medium rounded-full">
                              Luxury
                            </span>
                          )}
                        </div>

                        {/* Availability */}
                        <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                          {room.available} Available
                        </div>

                        {/* Price */}
                        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3">
                          <div className="text-right">
                            {room.originalPrice && (
                              <div className="text-sm text-gray-500 line-through">₹{room.originalPrice.toLocaleString()}</div>
                            )}
                            <div className="text-xl font-bold text-lavender-600">₹{room.price.toLocaleString()}</div>
                            <div className="text-xs text-gray-600">per night</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">{room.name}</h3>
                        
                        <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{room.size}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            <span>Up to {room.occupancy} guests</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-500" />
                            <span>4.8/5</span>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-2">Amenities</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {room.amenities.slice(0, 4).map((amenity: string) => (
                              <div key={amenity} className="flex items-center text-sm text-gray-600">
                                <Check className="w-3 h-3 text-lavender-600 mr-2 flex-shrink-0" />
                                <span>{amenity}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button
                          variant="primary"
                          className="w-full"
                          onClick={() => selectRoom(room)}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Select Room
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Booking Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center p-8">
                <Phone className="w-12 h-12 text-lavender-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Call to Book</h3>
                <p className="text-gray-600 mb-4">Speak with our wellness experts for personalized recommendations</p>
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  +91 98765 43210
                </Button>
              </Card>

              <Card className="text-center p-8">
                <Mail className="w-12 h-12 text-sage-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Email Inquiry</h3>
                <p className="text-gray-600 mb-4">Send us your requirements and we'll create a custom package</p>
                <Button variant="outline" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </Card>

              <Card className="text-center p-8">
                <Gift className="w-12 h-12 text-beige-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Gift Vouchers</h3>
                <p className="text-gray-600 mb-4">Give the gift of wellness with our retreat vouchers</p>
                <Button variant="outline" className="w-full">
                  <Gift className="w-4 h-4 mr-2" />
                  Buy Voucher
                </Button>
              </Card>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="section-padding bg-white/50">
          <div className="container-max">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                Why Book Direct?
              </h3>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Award, title: 'Best Rate Guarantee', description: 'Lowest prices guaranteed when you book direct' },
                { icon: Shield, title: 'Secure Booking', description: 'SSL encrypted booking with secure payment processing' },
                { icon: Heart, title: 'Personal Service', description: '24/7 support and personalized wellness consultation' },
                { icon: Sparkles, title: 'Exclusive Perks', description: 'Complimentary upgrades and special amenities' }
              ].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.title} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-lavender-100 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-lavender-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={isBookingOpen}
        onClose={closeBooking}
        title="Complete Your Booking"
        size="xl"
      >
        <div className="space-y-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                  step <= bookingStep ? 'bg-lavender-600 text-white' : 'bg-gray-200 text-gray-600'
                )}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={cn(
                    'w-12 h-0.5 mx-2',
                    step < bookingStep ? 'bg-lavender-600' : 'bg-gray-200'
                  )} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          {bookingStep === 1 && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Guest Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500"
                  value={bookingData.guestInfo.firstName}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    guestInfo: { ...prev.guestInfo, firstName: e.target.value }
                  }))}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500"
                  value={bookingData.guestInfo.lastName}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    guestInfo: { ...prev.guestInfo, lastName: e.target.value }
                  }))}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500"
                  value={bookingData.guestInfo.email}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    guestInfo: { ...prev.guestInfo, email: e.target.value }
                  }))}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500"
                  value={bookingData.guestInfo.phone}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    guestInfo: { ...prev.guestInfo, phone: e.target.value }
                  }))}
                />
              </div>
              <Button
                variant="primary"
                className="w-full mt-6"
                onClick={() => setBookingStep(2)}
              >
                Continue to Add-ons
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {bookingStep === 2 && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Enhance Your Stay</h3>
              <div className="space-y-4">
                {addOnServices.map((addOn) => (
                  <div key={addOn.id} className="flex items-center p-4 border rounded-lg">
                    <input
                      type="checkbox"
                      id={addOn.id}
                      checked={bookingData.addOns.includes(addOn.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBookingData(prev => ({
                            ...prev,
                            addOns: [...prev.addOns, addOn.id]
                          }));
                        } else {
                          setBookingData(prev => ({
                            ...prev,
                            addOns: prev.addOns.filter(id => id !== addOn.id)
                          }));
                        }
                      }}
                      className="mr-4"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{addOn.name}</h4>
                      <p className="text-sm text-gray-600">{addOn.description}</p>
                    </div>
                    <div className="text-lg font-bold text-lavender-600">
                      ₹{addOn.price.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-6">
                <Button variant="outline" className="flex-1" onClick={() => setBookingStep(1)}>
                  Back
                </Button>
                <Button variant="primary" className="flex-1" onClick={() => setBookingStep(3)}>
                  Review Booking
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {bookingStep === 3 && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Booking Summary</h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                {(() => {
                  const { roomPrice, addOnTotal, subtotal, tax, total } = calculateTotal();
                  return (
                    <>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span>Room (per night)</span>
                          <span>₹{roomPrice.toLocaleString()}</span>
                        </div>
                        {addOnTotal > 0 && (
                          <div className="flex justify-between">
                            <span>Add-on Services</span>
                            <span>₹{addOnTotal.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>GST (18%)</span>
                          <span>₹{tax.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="border-t pt-4 flex justify-between text-lg font-bold">
                        <span>Total Amount</span>
                        <span>₹{total.toLocaleString()}</span>
                      </div>
                    </>
                  );
                })()}
              </div>
              <div className="flex gap-4 mt-6">
                <Button variant="outline" className="flex-1" onClick={() => setBookingStep(2)}>
                  Back
                </Button>
                <Button variant="primary" className="flex-1" onClick={handleBookingSubmit}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Payment
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmOpen}
        onClose={closeConfirm}
        size="lg"
      >
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Booking Confirmed!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for choosing Serenity Spa. Your wellness journey begins soon!
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">Booking Reference: <strong>SSR-2024-001</strong></p>
            <p className="text-sm text-gray-600">Confirmation email sent to your registered email</p>
          </div>
          <Button variant="primary" onClick={closeConfirm}>
            Close
          </Button>
        </div>
      </Modal>
    </section>
  );
};

export default BookingSection;