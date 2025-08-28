import React, { useState } from 'react';
import { 
  Utensils, 
  Leaf, 
  Heart, 
  Clock, 
  Users, 
  Star,
  ArrowRight,
  Check,
  Calendar,
  ChefHat,
  Coffee,
  Sunrise,
  Sun,
  Moon,
  Sparkles,
  Award,
  Globe,
  Phone,
  MapPin,
  Wheat,
  Fish,
  Apple,
  Salad
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useModal } from '../../hooks/useModal';
import { cn } from '../../utils/cn';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  ingredients: string[];
  dietary: string[];
  image: string;
  signature?: boolean;
  ayurvedic?: boolean;
  popular?: boolean;
}

interface DiningExperience {
  id: string;
  name: string;
  type: string;
  price: number;
  duration: string;
  description: string;
  includes: string[];
  image: string;
  popular?: boolean;
  luxury?: boolean;
}

const DiningSection: React.FC = () => {
  const { ref: diningRef, isVisible: diningVisible } = useScrollAnimation();
  const { ref: menuRef, isVisible: menuVisible } = useScrollAnimation();
  const { ref: experiencesRef, isVisible: experiencesVisible } = useScrollAnimation();
  const { isOpen: isMenuOpen, openModal: openMenu, closeModal: closeMenu } = useModal();
  const { isOpen: isBookingOpen, openModal: openBooking, closeModal: closeBooking } = useModal();
  
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<DiningExperience | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const menuItems: MenuItem[] = [
    {
      id: 'quinoa-bowl',
      name: 'Himalayan Quinoa Power Bowl',
      category: 'mains',
      price: 650,
      description: 'Nutrient-rich quinoa with roasted vegetables, avocado, and tahini dressing. Perfect post-yoga meal.',
      ingredients: ['Organic quinoa', 'Seasonal vegetables', 'Avocado', 'Tahini', 'Pumpkin seeds'],
      dietary: ['Vegan', 'Gluten-Free', 'High Protein'],
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      popular: true
    },
    {
      id: 'ayurvedic-kitchari',
      name: 'Traditional Ayurvedic Kitchari',
      category: 'mains',
      price: 450,
      description: 'Healing one-pot meal with mung dal, basmati rice, and digestive spices. Balances all three doshas.',
      ingredients: ['Mung dal', 'Basmati rice', 'Turmeric', 'Cumin', 'Ginger', 'Ghee'],
      dietary: ['Vegetarian', 'Ayurvedic', 'Digestive'],
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      ayurvedic: true,
      signature: true
    },
    {
      id: 'detox-salad',
      name: 'Green Goddess Detox Salad',
      category: 'salads',
      price: 550,
      description: 'Cleansing salad with kale, spinach, cucumber, and herb-infused dressing. Rich in antioxidants.',
      ingredients: ['Organic kale', 'Baby spinach', 'Cucumber', 'Sprouts', 'Herb dressing'],
      dietary: ['Vegan', 'Raw', 'Detox'],
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      popular: true
    },
    {
      id: 'golden-milk',
      name: 'Golden Milk Turmeric Latte',
      category: 'beverages',
      price: 280,
      description: 'Warming blend of turmeric, ginger, and coconut milk. Anti-inflammatory and soothing.',
      ingredients: ['Turmeric', 'Ginger', 'Coconut milk', 'Cinnamon', 'Black pepper', 'Honey'],
      dietary: ['Vegan Option', 'Anti-inflammatory', 'Ayurvedic'],
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      ayurvedic: true
    },
    {
      id: 'chia-pudding',
      name: 'Overnight Chia Seed Pudding',
      category: 'breakfast',
      price: 380,
      description: 'Creamy chia pudding with almond milk, topped with fresh fruits and nuts. Perfect breakfast.',
      ingredients: ['Chia seeds', 'Almond milk', 'Seasonal fruits', 'Nuts', 'Maple syrup'],
      dietary: ['Vegan', 'High Fiber', 'Omega-3'],
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    {
      id: 'herbal-tea',
      name: 'Wellness Herbal Tea Blend',
      category: 'beverages',
      price: 220,
      description: 'Custom herbal blend based on your dosha type. Promotes balance and well-being.',
      ingredients: ['Tulsi', 'Ginger', 'Cardamom', 'Fennel', 'Rose petals'],
      dietary: ['Caffeine-Free', 'Ayurvedic', 'Digestive'],
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      ayurvedic: true
    }
  ];

  const diningExperiences: DiningExperience[] = [
    {
      id: 'chef-table',
      name: 'Chef\'s Table Experience',
      type: 'Fine Dining',
      price: 2500,
      duration: '3 hours',
      description: 'Intimate 7-course tasting menu featuring seasonal, organic ingredients with wine pairings.',
      includes: ['7-course tasting menu', 'Wine pairings', 'Chef interaction', 'Recipe cards', 'Welcome drink'],
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      luxury: true
    },
    {
      id: 'cooking-class',
      name: 'Ayurvedic Cooking Workshop',
      type: 'Interactive Experience',
      price: 1800,
      duration: '2.5 hours',
      description: 'Learn to prepare healing Ayurvedic meals with our wellness chef. Includes recipe book.',
      includes: ['Hands-on cooking', 'Recipe book', 'Ingredient kit', 'Lunch', 'Spice blend'],
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      popular: true
    },
    {
      id: 'garden-dinner',
      name: 'Moonlight Garden Dinner',
      type: 'Romantic Dining',
      price: 3200,
      duration: '2 hours',
      description: 'Private dinner under the stars in our organic garden with personalized menu.',
      includes: ['Private setup', '5-course menu', 'Candle lighting', 'Live music', 'Flower arrangement'],
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      luxury: true
    },
    {
      id: 'detox-program',
      name: '7-Day Detox Meal Program',
      type: 'Wellness Program',
      price: 8500,
      duration: '7 days',
      description: 'Complete meal program designed to cleanse and energize with daily consultations.',
      includes: ['21 meals', 'Daily juices', 'Herbal teas', 'Nutrition consultation', 'Meal plan'],
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      popular: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Items', icon: Utensils },
    { id: 'breakfast', name: 'Breakfast', icon: Sunrise },
    { id: 'mains', name: 'Main Courses', icon: ChefHat },
    { id: 'salads', name: 'Salads', icon: Salad },
    { id: 'beverages', name: 'Beverages', icon: Coffee }
  ];

  const dietaryOptions = [
    { name: 'Vegan', icon: Leaf, color: 'text-green-600' },
    { name: 'Vegetarian', icon: Heart, color: 'text-red-600' },
    { name: 'Gluten-Free', icon: Wheat, color: 'text-yellow-600' },
    { name: 'Ayurvedic', icon: Sparkles, color: 'text-purple-600' }
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const openMenuItem = (item: MenuItem) => {
    setSelectedItem(item);
    openMenu();
  };

  const openExperienceBooking = (experience: DiningExperience) => {
    setSelectedExperience(experience);
    openBooking();
  };

  return (
    <section id="dining" className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-beige-50 via-white to-sage-50" />
      <div className="absolute top-32 right-10 w-80 h-80 bg-beige-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-32 left-10 w-96 h-96 bg-sage-100/20 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="section-padding">
          <div className="container-max">
            <div
              ref={diningRef}
              className={cn(
                'text-center mb-16 transition-all duration-1000 transform',
                diningVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <div className="inline-flex items-center px-6 py-3 bg-beige-100 rounded-full mb-6">
                <ChefHat className="w-5 h-5 text-beige-600 mr-2" />
                <span className="text-beige-800 font-medium">Wellness Cuisine</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
                Nourishing Dining
                <span className="block text-gradient">Farm to Table Wellness</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                Experience conscious cuisine that nourishes body and soul. Our organic, locally-sourced menu 
                combines Ayurvedic principles with modern nutrition for optimal wellness.
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-beige-600 mr-2" />
                  <span>100% Organic Ingredients</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-beige-600 mr-2" />
                  <span>Ayurvedic Meal Planning</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-beige-600 mr-2" />
                  <span>Farm-to-Table Fresh</span>
                </div>
              </div>
            </div>

            {/* Dietary Options */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {dietaryOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <div key={option.name} className="flex items-center px-4 py-2 bg-white rounded-full shadow-soft">
                    <Icon className={`w-4 h-4 mr-2 ${option.color}`} />
                    <span className="text-gray-700 font-medium">{option.name}</span>
                  </div>
                );
              })}
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
                        ? 'bg-beige-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-beige-50 shadow-soft'
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.name}
                  </button>
                );
              })}
            </div>

            {/* Menu Items Grid */}
            <div
              ref={menuRef}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
            >
              {filteredItems.map((item, index) => (
                <Card
                  key={item.id}
                  className={cn(
                    'overflow-hidden cursor-pointer transition-all duration-1000 transform',
                    menuVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  )}
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => openMenuItem(item)}
                >
                  {/* Item Image */}
                  <div className="relative mb-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {item.popular && (
                        <span className="px-3 py-1 bg-beige-600 text-white text-xs font-medium rounded-full">
                          Popular
                        </span>
                      )}
                      {item.signature && (
                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-medium rounded-full">
                          Signature
                        </span>
                      )}
                      {item.ayurvedic && (
                        <span className="px-3 py-1 bg-sage-600 text-white text-xs font-medium rounded-full">
                          Ayurvedic
                        </span>
                      )}
                    </div>

                    {/* Price Badge */}
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-xl font-bold text-beige-600">₹{item.price}</div>
                    </div>
                  </div>

                  {/* Item Details */}
                  <div>
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">{item.description}</p>

                    {/* Dietary Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.dietary.slice(0, 2).map((diet) => (
                        <span key={diet} className="px-2 py-1 bg-sage-100 text-sage-700 text-xs rounded-full">
                          {diet}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        <span>4.9/5</span>
                      </div>
                      <Button variant="primary" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Dining Experiences */}
        <div className="section-padding bg-white/50">
          <div className="container-max">
            <div
              ref={experiencesRef}
              className={cn(
                'text-center mb-16 transition-all duration-1000 transform',
                experiencesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <h3 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                Culinary Experiences
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Elevate your dining with immersive culinary experiences that combine 
                education, wellness, and exceptional flavors.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {diningExperiences.map((experience, index) => (
                <Card
                  key={experience.id}
                  className={cn(
                    'overflow-hidden transition-all duration-1000 transform',
                    experiencesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  )}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Experience Image */}
                  <div className="relative mb-6">
                    <img
                      src={experience.image}
                      alt={experience.name}
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {experience.popular && (
                        <span className="px-3 py-1 bg-beige-600 text-white text-xs font-medium rounded-full">
                          Popular
                        </span>
                      )}
                      {experience.luxury && (
                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-medium rounded-full">
                          Luxury
                        </span>
                      )}
                    </div>

                    {/* Price Badge */}
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-beige-600">₹{experience.price.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">{experience.duration}</div>
                      </div>
                    </div>
                  </div>

                  {/* Experience Details */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-serif font-bold text-gray-900">{experience.name}</h3>
                        <p className="text-beige-600 font-medium">{experience.type}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">{experience.description}</p>

                    {/* Experience Info */}
                    <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>Up to 8 guests</span>
                      </div>
                    </div>

                    {/* Includes */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Experience Includes:</h4>
                      <div className="space-y-1">
                        {experience.includes.slice(0, 3).map((item) => (
                          <div key={item} className="flex items-center text-sm text-gray-600">
                            <Check className="w-3 h-3 text-beige-600 mr-2 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => openExperienceBooking(experience)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Experience
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Restaurant Features */}
        <div className="section-padding">
          <div className="container-max">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                Our Culinary Philosophy
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                Every dish is crafted with intention, combining ancient Ayurvedic wisdom 
                with modern nutritional science for optimal wellness.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Leaf,
                  title: 'Organic & Local',
                  description: 'Sourced from our organic garden and local farmers within 50km radius for maximum freshness and nutrition.',
                  color: 'text-green-600'
                },
                {
                  icon: Heart,
                  title: 'Ayurvedic Balance',
                  description: 'Meals designed to balance your dosha type and support your wellness journey with healing spices.',
                  color: 'text-red-600'
                },
                {
                  icon: Award,
                  title: 'Chef Excellence',
                  description: 'Award-winning wellness chef with 15+ years experience in therapeutic cuisine and nutrition.',
                  color: 'text-yellow-600'
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center`}>
                      <Icon className={`w-8 h-8 ${feature.color}`} />
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
        <div className="section-padding bg-gradient-to-r from-beige-600 to-sage-600">
          <div className="container-max">
            <div className="text-center text-white">
              <Globe className="w-16 h-16 mx-auto mb-6 text-beige-100" />
              <h3 className="text-3xl font-serif font-bold mb-4">
                Taste the Wellness Difference
              </h3>
              <p className="text-xl text-beige-100 mb-8 max-w-2xl mx-auto">
                Reserve your table for a dining experience that nourishes your body, 
                delights your senses, and supports your wellness journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-beige-600 hover:bg-beige-50"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Reserve Table
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white border-white/30 hover:bg-white/10"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Restaurant
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Item Modal */}
      <Modal
        isOpen={isMenuOpen}
        onClose={closeMenu}
        size="lg"
        className="p-0"
      >
        {selectedItem && (
          <div className="relative">
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900">{selectedItem.name}</h3>
                  <p className="text-beige-600 font-medium capitalize">{selectedItem.category}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-beige-600">₹{selectedItem.price}</div>
                </div>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{selectedItem.description}</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Ingredients:</h4>
                  <div className="space-y-2">
                    {selectedItem.ingredients.map((ingredient) => (
                      <div key={ingredient} className="flex items-center text-sm text-gray-600">
                        <Leaf className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                        <span>{ingredient}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Dietary Info:</h4>
                  <div className="space-y-2">
                    {selectedItem.dietary.map((diet) => (
                      <div key={diet} className="flex items-center text-sm text-gray-600">
                        <Check className="w-4 h-4 text-beige-600 mr-3 flex-shrink-0" />
                        <span>{diet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={closeMenu}>
                  Close
                </Button>
                <Button variant="primary" className="flex-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  Order Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Experience Booking Modal */}
      <Modal
        isOpen={isBookingOpen}
        onClose={closeBooking}
        title="Book Dining Experience"
        size="lg"
      >
        {selectedExperience && (
          <div>
            <div className="flex items-center mb-6">
              <img
                src={selectedExperience.image}
                alt={selectedExperience.name}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedExperience.name}</h3>
                <p className="text-beige-600">{selectedExperience.type}</p>
                <p className="text-lg font-bold text-beige-600">₹{selectedExperience.price.toLocaleString()}</p>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beige-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beige-500 focus:border-transparent">
                    <option>6:00 PM</option>
                    <option>7:00 PM</option>
                    <option>8:00 PM</option>
                    <option>9:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beige-500 focus:border-transparent">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>4 Guests</option>
                  <option>6 Guests</option>
                  <option>8 Guests</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preferences</label>
                <textarea
                  rows={3}
                  placeholder="Any dietary restrictions, allergies, or special preferences..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beige-500 focus:border-transparent"
                />
              </div>

              <div className="bg-beige-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Experience Summary</h4>
                <div className="space-y-1 text-sm text-gray-600 mb-3">
                  {selectedExperience.includes.map((item) => (
                    <div key={item} className="flex items-center">
                      <Check className="w-3 h-3 text-beige-600 mr-2" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Experience Fee</span>
                  <span>₹{selectedExperience.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Service Charge (10%)</span>
                  <span>₹{Math.round(selectedExperience.price * 0.1).toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-gray-900">
                  <span>Total Amount</span>
                  <span>₹{Math.round(selectedExperience.price * 1.1).toLocaleString()}</span>
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

export default DiningSection;