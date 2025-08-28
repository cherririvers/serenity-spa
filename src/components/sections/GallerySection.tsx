import React, { useState } from 'react';
import { 
  Camera, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  Download,
  Share2,
  Heart,
  Eye,
  Grid3X3,
  Filter,
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  Sparkles
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useModal } from '../../hooks/useModal';
import { cn } from '../../utils/cn';

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: string;
  description: string;
  location: string;
  photographer?: string;
  date: string;
  tags: string[];
  featured?: boolean;
  popular?: boolean;
}

const GallerySection: React.FC = () => {
  const { ref: galleryRef, isVisible: galleryVisible } = useScrollAnimation();
  const { ref: categoriesRef, isVisible: categoriesVisible } = useScrollAnimation();
  const { isOpen: isLightboxOpen, openModal: openLightbox, closeModal: closeLightbox } = useModal();
  
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');

  const galleryImages: GalleryImage[] = [
    {
      id: 'hero-spa',
      src: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Serene Spa Treatment Room',
      category: 'spa',
      description: 'Peaceful treatment room with lotus flowers and candles creating the perfect ambiance for healing.',
      location: 'Main Spa Building',
      date: '2024-01-15',
      tags: ['spa', 'treatment', 'candles', 'lotus', 'peaceful'],
      featured: true,
      popular: true
    },
    {
      id: 'yoga-sunrise',
      src: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Sunrise Yoga Session',
      category: 'yoga',
      description: 'Morning yoga practice with the majestic Himalayas as backdrop, connecting with nature.',
      location: 'Outdoor Yoga Pavilion',
      date: '2024-01-20',
      tags: ['yoga', 'sunrise', 'mountains', 'meditation', 'nature'],
      featured: true
    },
    {
      id: 'ayurveda-treatment',
      src: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Traditional Ayurvedic Treatment',
      category: 'spa',
      description: 'Authentic Ayurvedic therapy using traditional oils and techniques passed down through generations.',
      location: 'Ayurveda Treatment Center',
      date: '2024-01-18',
      tags: ['ayurveda', 'massage', 'oils', 'traditional', 'healing'],
      popular: true
    },
    {
      id: 'deluxe-room',
      src: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Deluxe Garden View Room',
      category: 'rooms',
      description: 'Elegantly appointed room with garden views, combining modern comfort with traditional aesthetics.',
      location: 'Main Resort Building',
      date: '2024-01-12',
      tags: ['room', 'luxury', 'garden', 'comfort', 'design']
    },
    {
      id: 'premium-suite',
      src: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Premium River View Suite',
      category: 'rooms',
      description: 'Spacious suite overlooking the sacred Ganges with private balcony and luxury amenities.',
      location: 'River Wing',
      date: '2024-01-14',
      tags: ['suite', 'river', 'ganges', 'luxury', 'balcony'],
      featured: true
    },
    {
      id: 'wellness-cuisine',
      src: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Organic Wellness Cuisine',
      category: 'dining',
      description: 'Fresh, organic ingredients transformed into nourishing meals that support your wellness journey.',
      location: 'Wellness Restaurant',
      date: '2024-01-16',
      tags: ['food', 'organic', 'healthy', 'nutrition', 'wellness']
    },
    {
      id: 'meditation-garden',
      src: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Meditation Garden',
      category: 'facilities',
      description: 'Tranquil garden space designed for quiet contemplation and mindfulness practice.',
      location: 'Zen Garden',
      date: '2024-01-22',
      tags: ['meditation', 'garden', 'peaceful', 'nature', 'zen'],
      popular: true
    },
    {
      id: 'group-yoga',
      src: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Group Yoga Class',
      category: 'yoga',
      description: 'Community yoga practice bringing together guests from around the world in shared wellness.',
      location: 'Main Yoga Hall',
      date: '2024-01-25',
      tags: ['yoga', 'group', 'community', 'practice', 'wellness']
    },
    {
      id: 'spa-reception',
      src: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Spa Reception Area',
      category: 'facilities',
      description: 'Welcoming spa reception with traditional Indian décor and modern wellness amenities.',
      location: 'Spa Entrance',
      date: '2024-01-10',
      tags: ['spa', 'reception', 'welcome', 'traditional', 'modern']
    },
    {
      id: 'chef-preparation',
      src: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Chef Preparing Ayurvedic Meal',
      category: 'dining',
      description: 'Our wellness chef carefully preparing healing meals using traditional Ayurvedic principles.',
      location: 'Wellness Kitchen',
      date: '2024-01-28',
      tags: ['chef', 'cooking', 'ayurvedic', 'preparation', 'kitchen']
    },
    {
      id: 'pool-area',
      src: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Infinity Pool with Mountain Views',
      category: 'facilities',
      description: 'Stunning infinity pool overlooking the Himalayan foothills, perfect for relaxation.',
      location: 'Pool Deck',
      date: '2024-01-30',
      tags: ['pool', 'infinity', 'mountains', 'relaxation', 'views'],
      featured: true
    },
    {
      id: 'couples-treatment',
      src: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Couples Spa Treatment',
      category: 'spa',
      description: 'Intimate couples treatment room designed for shared wellness experiences and bonding.',
      location: 'Couples Treatment Suite',
      date: '2024-02-01',
      tags: ['couples', 'spa', 'treatment', 'romantic', 'wellness']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Photos', icon: Camera, count: galleryImages.length },
    { id: 'spa', name: 'Spa & Treatments', icon: Sparkles, count: galleryImages.filter(img => img.category === 'spa').length },
    { id: 'yoga', name: 'Yoga & Meditation', icon: Heart, count: galleryImages.filter(img => img.category === 'yoga').length },
    { id: 'rooms', name: 'Rooms & Suites', icon: MapPin, count: galleryImages.filter(img => img.category === 'rooms').length },
    { id: 'dining', name: 'Dining', icon: Users, count: galleryImages.filter(img => img.category === 'dining').length },
    { id: 'facilities', name: 'Facilities', icon: Grid3X3, count: galleryImages.filter(img => img.category === 'facilities').length }
  ];

  const filteredImages = galleryImages.filter(image => {
    const matchesCategory = activeCategory === 'all' || image.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const openImageLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    openLightbox();
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? filteredImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  const toggleSlideshow = () => {
    setIsSlideshow(!isSlideshow);
  };

  // Auto-advance slideshow
  React.useEffect(() => {
    if (isSlideshow && isLightboxOpen) {
      const interval = setInterval(nextImage, 3000);
      return () => clearInterval(interval);
    }
  }, [isSlideshow, isLightboxOpen, currentImageIndex]);

  return (
    <section id="gallery" className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage-50 via-white to-lavender-50" />
      <div className="absolute top-32 left-10 w-80 h-80 bg-sage-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-32 right-10 w-96 h-96 bg-lavender-100/20 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="section-padding">
          <div className="container-max">
            <div
              ref={galleryRef}
              className={cn(
                'text-center mb-16 transition-all duration-1000 transform',
                galleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <div className="inline-flex items-center px-6 py-3 bg-sage-100 rounded-full mb-6">
                <Camera className="w-5 h-5 text-sage-600 mr-2" />
                <span className="text-sage-800 font-medium">Visual Journey</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
                Gallery
                <span className="block text-gradient">Moments of Serenity</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                Discover the beauty of our wellness retreat through stunning photography. 
                From serene spa treatments to breathtaking Himalayan views, experience the magic before you arrive.
              </p>

              {/* Search and View Controls */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search photos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'p-2 rounded-lg transition-colors',
                      viewMode === 'grid' ? 'bg-sage-600 text-white' : 'bg-white text-gray-600 hover:bg-sage-50'
                    )}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('masonry')}
                    className={cn(
                      'p-2 rounded-lg transition-colors',
                      viewMode === 'masonry' ? 'bg-sage-600 text-white' : 'bg-white text-gray-600 hover:bg-sage-50'
                    )}
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div
              ref={categoriesRef}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      'flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 transform',
                      categoriesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                      activeCategory === category.id
                        ? 'bg-sage-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-sage-50 shadow-soft'
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.name}
                    <span className="ml-2 px-2 py-1 bg-black/10 rounded-full text-xs">
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Gallery Grid */}
            <div className={cn(
              'gap-6 mb-16',
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'columns-1 md:columns-2 lg:columns-3 space-y-6'
            )}>
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className={cn(
                    'group cursor-pointer transition-all duration-1000 transform',
                    galleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                    viewMode === 'masonry' && 'break-inside-avoid mb-6'
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => openImageLightbox(image, index)}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 group-hover:-translate-y-2">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {image.featured && (
                        <span className="px-3 py-1 bg-sage-600 text-white text-xs font-medium rounded-full">
                          Featured
                        </span>
                      )}
                      {image.popular && (
                        <span className="px-3 py-1 bg-lavender-600 text-white text-xs font-medium rounded-full">
                          Popular
                        </span>
                      )}
                    </div>

                    {/* View Button */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                        <Eye className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>

                    {/* Image Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
                      <p className="text-sm text-white/90 mb-2 line-clamp-2">{image.description}</p>
                      <div className="flex items-center justify-between text-xs text-white/80">
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{image.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{new Date(image.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {filteredImages.length > 12 && (
              <div className="text-center">
                <Button variant="outline" size="lg">
                  Load More Photos
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="section-padding bg-white/50">
          <div className="container-max">
            <div className="text-center bg-gradient-to-r from-sage-600 to-lavender-600 rounded-3xl p-12 text-white">
              <Camera className="w-16 h-16 mx-auto mb-6 text-sage-100" />
              <h3 className="text-3xl font-serif font-bold mb-4">
                Experience It Yourself
              </h3>
              <p className="text-xl text-sage-100 mb-8 max-w-2xl mx-auto">
                These photos capture just a glimpse of the transformative experience waiting for you. 
                Book your wellness journey and create your own moments of serenity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-sage-600 hover:bg-sage-50"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Your Stay
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white border-white/30 hover:bg-white/10"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Gallery
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Modal
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        size="xl"
        className="p-0 bg-black/95"
      >
        {selectedImage && (
          <div className="relative w-full h-[80vh] flex items-center justify-center">
            {/* Main Image */}
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Top Controls */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleSlideshow}
                  className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white"
                >
                  {isSlideshow ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <span className="text-white/80 text-sm">
                  {currentImageIndex + 1} / {filteredImages.length}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
              <h3 className="text-2xl font-serif font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-white/90 mb-4">{selectedImage.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-white/80">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{selectedImage.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(selectedImage.date).toLocaleDateString()}</span>
                </div>
                {selectedImage.photographer && (
                  <div className="flex items-center">
                    <Camera className="w-4 h-4 mr-1" />
                    <span>{selectedImage.photographer}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedImage.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-white/20 rounded-full text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default GallerySection;