import React, { useState } from 'react';
import { 
  Bed, 
  Users, 
  Wifi, 
  Coffee, 
  Car, 
  Waves, 
  Mountain, 
  Star,
  ArrowRight,
  Check,
  Calendar,
  MapPin,
  Sparkles,
  Eye,
  Heart
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useModal } from '../../hooks/useModal';
import { cn } from '../../utils/cn';

interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  originalPrice?: number;
  size: string;
  occupancy: number;
  images: string[];
  description: string;
  amenities: string[];
  features: string[];
  popular?: boolean;
  luxury?: boolean;
}

const RoomsSection: React.FC = () => {
  const { ref: roomsRef, isVisible: roomsVisible } = useScrollAnimation();
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation();
  const { isOpen: isGalleryOpen, openModal: openGallery, closeModal: closeGallery } = useModal();
  const { isOpen: isBookingOpen, openModal: openBooking, closeModal: closeBooking } = useModal();
  
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const rooms: Room[] = [
    {
      id: 'deluxe-garden',
      name: 'Deluxe Garden View',
      type: 'Standard Room',
      price: 8500,
      originalPrice: 10000,
      size: '350 sq ft',
      occupancy: 2,
      images: [
        'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      ],
      description: 'Peaceful garden-facing room with traditional Indian décor and modern amenities. Perfect for couples seeking tranquility.',
      amenities: ['King Size Bed', 'Garden View', 'Air Conditioning', 'Mini Bar', 'Free WiFi', 'Tea/Coffee Maker'],
      features: ['Yoga Mat', 'Meditation Corner', 'Organic Toiletries', 'Daily Housekeeping'],
      popular: true
    },
    {
      id: 'premium-river',
      name: 'Premium River View',
      type: 'Premium Room',
      price: 12500,
      originalPrice: 15000,
      size: '450 sq ft',
      occupancy: 2,
      images: [
        'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      ],
      description: 'Spacious room overlooking the sacred Ganges with private balcony. Experience the spiritual energy of the holy river.',
      amenities: ['King Size Bed', 'River View', 'Private Balcony', 'Air Conditioning', 'Mini Bar', 'Free WiFi'],
      features: ['Meditation Balcony', 'Premium Linens', 'Ayurvedic Amenities', 'River Sound Therapy']
    },
    {
      id: 'luxury-suite',
      name: 'Himalayan Luxury Suite',
      type: 'Luxury Suite',
      price: 18500,
      originalPrice: 22000,
      size: '650 sq ft',
      occupancy: 3,
      images: [
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      ],
      description: 'Luxurious suite with panoramic Himalayan views, separate living area, and premium wellness amenities.',
      amenities: ['Separate Living Area', 'Mountain View', 'Private Balcony', 'Jacuzzi', 'Mini Bar', 'Butler Service'],
      features: ['Private Yoga Space', 'Himalayan Salt Lamp', 'Premium Spa Products', 'Complimentary Massage'],
      luxury: true
    },
    {
      id: 'wellness-villa',
      name: 'Wellness Villa',
      type: 'Private Villa',
      price: 25000,
      originalPrice: 30000,
      size: '800 sq ft',
      occupancy: 4,
      images: [
        'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      ],
      description: 'Ultimate luxury villa with private garden, outdoor meditation pavilion, and dedicated wellness concierge.',
      amenities: ['Private Garden', 'Outdoor Pavilion', 'Kitchen', 'Living Room', 'Two Bedrooms', 'Private Pool'],
      features: ['Wellness Concierge', 'Private Chef Option', 'Meditation Garden', 'Spa Treatment Room'],
      luxury: true
    }
  ];

  const hotelFeatures = [
    {
      icon: Waves,
      title: 'Ganges Proximity',
      description: 'Just 200m from the sacred Ganges river for morning meditation and spiritual cleansing.'
    },
    {
      icon: Mountain,
      title: 'Himalayan Views',
      description: 'Breathtaking views of the majestic Himalayas from premium rooms and suites.'
    },
    {
      icon: Sparkles,
      title: 'Wellness Amenities',
      description: 'Every room includes yoga mats, meditation corners, and organic wellness products.'
    },
    {
      icon: Car,
      title: 'Airport Transfer',
      description: 'Complimentary pickup from Dehradun airport (45 minutes) for suite bookings.'
    }
  ];

  const openRoomGallery = (room: Room, imageIndex: number = 0) => {
    setSelectedRoom(room);
    setCurrentImageIndex(imageIndex);
    openGallery();
  };

  const openRoomBooking = (room: Room) => {
    setSelectedRoom(room);
    openBooking();
  };

  const nextImage = () => {
    if (selectedRoom) {
      setCurrentImageIndex((prev) => 
        prev === selectedRoom.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedRoom) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedRoom.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <section id="rooms" className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage-50 via-white to-beige-50" />
      <div className="absolute top-32 left-10 w-72 h-72 bg-lavender-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-32 right-10 w-96 h-96 bg-sage-100/20 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="section-padding">
          <div className="container-max">
            <div
              ref={roomsRef}
              className={cn(
                'text-center mb-16 transition-all duration-1000 transform',
                roomsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <div className="inline-flex items-center px-6 py-3 bg-sage-100 rounded-full mb-6">
                <Bed className="w-5 h-5 text-sage-600 mr-2" />
                <span className="text-sage-800 font-medium">Luxury Accommodations</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
                Rooms & Suites
                <span className="block text-gradient">Designed for Wellness</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                Each accommodation is thoughtfully designed to enhance your wellness journey, 
                featuring serene décor, premium amenities, and stunning views of the Himalayas or sacred Ganges.
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-sage-600 mr-2" />
                  <span>Starting ₹8,500/night</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-sage-600 mr-2" />
                  <span>Free WiFi & Breakfast</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-sage-600 mr-2" />
                  <span>Wellness Amenities Included</span>
                </div>
              </div>
            </div>

            {/* Rooms Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-20">
              {rooms.map((room, index) => (
                <Card
                  key={room.id}
                  className={cn(
                    'overflow-hidden transition-all duration-1000 transform',
                    roomsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  )}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Room Image Gallery */}
                  <div className="relative mb-6">
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      className="w-full h-64 object-cover rounded-xl"
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

                    {/* Gallery Button */}
                    <button
                      onClick={() => openRoomGallery(room)}
                      className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                    >
                      <Eye className="w-4 h-4 text-gray-700" />
                    </button>

                    {/* Price Badge */}
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

                  {/* Room Details */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-serif font-bold text-gray-900">{room.name}</h3>
                        <p className="text-sage-600 font-medium">{room.type}</p>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">{room.description}</p>

                    {/* Room Info */}
                    <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        <span>{room.size}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>Up to {room.occupancy} guests</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        <span>4.8/5 rating</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Key Amenities</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {room.amenities.slice(0, 4).map((amenity) => (
                          <div key={amenity} className="flex items-center text-sm text-gray-600">
                            <Check className="w-3 h-3 text-sage-600 mr-2 flex-shrink-0" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button
                        variant="primary"
                        className="flex-1"
                        onClick={() => openRoomBooking(room)}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Now
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => openRoomGallery(room)}
                      >
                        View Gallery
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Hotel Features */}
        <div className="section-padding bg-white/50">
          <div className="container-max">
            <div
              ref={featuresRef}
              className={cn(
                'text-center mb-16 transition-all duration-1000 transform',
                featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <h3 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                Why Choose Serenity Spa
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the perfect blend of luxury accommodation and wellness amenities 
                in the spiritual heart of India.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {hotelFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={feature.title}
                    className={cn(
                      'text-center transition-all duration-1000 transform',
                      featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    )}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage-100 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-sage-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="section-padding">
          <div className="container-max">
            <div className="text-center bg-gradient-to-r from-sage-600 to-lavender-600 rounded-3xl p-12 text-white">
              <MapPin className="w-16 h-16 mx-auto mb-6 text-sage-100" />
              <h3 className="text-3xl font-serif font-bold mb-4">
                Ready for Your Wellness Retreat?
              </h3>
              <p className="text-xl text-sage-100 mb-8 max-w-2xl mx-auto">
                Book your perfect room and begin your journey to inner peace and rejuvenation 
                in the spiritual capital of India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-sage-600 hover:bg-sage-50"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Check Availability
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

      {/* Gallery Modal */}
      <Modal
        isOpen={isGalleryOpen}
        onClose={closeGallery}
        size="xl"
        className="p-0"
      >
        {selectedRoom && (
          <div className="relative">
            <img
              src={selectedRoom.images[currentImageIndex]}
              alt={`${selectedRoom.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-96 object-cover rounded-t-2xl"
            />
            
            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
              {currentImageIndex + 1} / {selectedRoom.images.length}
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">{selectedRoom.name}</h3>
              <p className="text-gray-600 mb-4">{selectedRoom.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Amenities</h4>
                  <ul className="space-y-1">
                    {selectedRoom.amenities.map((amenity) => (
                      <li key={amenity} className="flex items-center text-sm text-gray-600">
                        <Check className="w-3 h-3 text-sage-600 mr-2" />
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Wellness Features</h4>
                  <ul className="space-y-1">
                    {selectedRoom.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-600">
                        <Sparkles className="w-3 h-3 text-lavender-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Booking Modal */}
      <Modal
        isOpen={isBookingOpen}
        onClose={closeBooking}
        title="Book Your Room"
        size="lg"
      >
        {selectedRoom && (
          <div>
            <div className="flex items-center mb-6">
              <img
                src={selectedRoom.images[0]}
                alt={selectedRoom.name}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedRoom.name}</h3>
                <p className="text-sage-600">{selectedRoom.type}</p>
                <p className="text-lg font-bold text-lavender-600">₹{selectedRoom.price.toLocaleString()}/night</p>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adults</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent">
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>3 Adults</option>
                    <option>4 Adults</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Children</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent">
                    <option>0 Children</option>
                    <option>1 Child</option>
                    <option>2 Children</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
                <textarea
                  rows={3}
                  placeholder="Any special requirements or preferences..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                />
              </div>

              <div className="bg-sage-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Booking Summary</h4>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Room Rate (per night)</span>
                  <span>₹{selectedRoom.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Taxes & Fees</span>
                  <span>₹{Math.round(selectedRoom.price * 0.18).toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-gray-900">
                  <span>Total (1 night)</span>
                  <span>₹{Math.round(selectedRoom.price * 1.18).toLocaleString()}</span>
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

export default RoomsSection;