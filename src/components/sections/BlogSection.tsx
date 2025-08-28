import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  User, 
  Clock, 
  Tag,
  ArrowRight,
  Search,
  Filter,
  Heart,
  Share2,
  Eye,
  Bookmark,
  TrendingUp,
  Award,
  Leaf,
  Sparkles,
  Mountain,
  Coffee,
  Sun
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useModal } from '../../hooks/useModal';
import { cn } from '../../utils/cn';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishDate: string;
  readTime: string;
  image: string;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
  views: number;
  likes: number;
}

const BlogSection: React.FC = () => {
  const { ref: blogRef, isVisible: blogVisible } = useScrollAnimation();
  const { ref: postsRef, isVisible: postsVisible } = useScrollAnimation();
  const { isOpen: isPostOpen, openModal: openPost, closeModal: closePost } = useModal();
  
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts: BlogPost[] = [
    {
      id: 'ayurveda-doshas-guide',
      title: 'Understanding Your Dosha: A Complete Guide to Ayurvedic Body Types',
      slug: 'ayurveda-doshas-complete-guide',
      excerpt: 'Discover your unique Ayurvedic constitution and learn how to balance Vata, Pitta, and Kapha for optimal health and wellness.',
      content: 'Ayurveda, the ancient Indian system of medicine, recognizes that each person has a unique constitution called Prakriti...',
      category: 'ayurveda',
      author: {
        name: 'Dr. Priya Sharma',
        avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        role: 'Chief Wellness Officer'
      },
      publishDate: '2024-02-01',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      tags: ['Ayurveda', 'Doshas', 'Health', 'Wellness', 'Constitution'],
      featured: true,
      trending: true,
      views: 2847,
      likes: 156
    },
    {
      id: 'morning-yoga-routine',
      title: '10-Minute Morning Yoga Routine for Energy and Focus',
      slug: 'morning-yoga-routine-energy-focus',
      excerpt: 'Start your day with this energizing yoga sequence designed to awaken your body, calm your mind, and set positive intentions.',
      content: 'Morning yoga practice is one of the most powerful ways to begin your day with intention and energy...',
      category: 'yoga',
      author: {
        name: 'Yogi Arjun Patel',
        avatar: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        role: 'Senior Yoga Master'
      },
      publishDate: '2024-01-28',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      tags: ['Yoga', 'Morning Routine', 'Energy', 'Focus', 'Asanas'],
      popular: true,
      views: 1923,
      likes: 89
    },
    {
      id: 'meditation-beginners-guide',
      title: 'Meditation for Beginners: 5 Simple Techniques to Start Today',
      slug: 'meditation-beginners-guide-techniques',
      excerpt: 'New to meditation? Learn five accessible techniques that will help you develop a consistent practice and experience inner peace.',
      content: 'Meditation is often misunderstood as something complex or mystical, but it\'s actually quite simple...',
      category: 'meditation',
      author: {
        name: 'Yogi Arjun Patel',
        avatar: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        role: 'Senior Yoga Master'
      },
      publishDate: '2024-01-25',
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      tags: ['Meditation', 'Beginners', 'Mindfulness', 'Peace', 'Practice'],
      featured: true,
      views: 3156,
      likes: 201
    },
    {
      id: 'ayurvedic-nutrition-principles',
      title: 'Ayurvedic Nutrition: Eating According to Your Body Type',
      slug: 'ayurvedic-nutrition-body-type',
      excerpt: 'Learn how to choose foods that support your unique constitution and promote digestive health according to Ayurvedic principles.',
      content: 'In Ayurveda, food is considered medicine, and the way we eat is just as important as what we eat...',
      category: 'nutrition',
      author: {
        name: 'Chef Meera Gupta',
        avatar: 'https://images.pexels.com/photos/3771120/pexels-photo-3771120.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        role: 'Wellness Cuisine Director'
      },
      publishDate: '2024-01-22',
      readTime: '9 min read',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      tags: ['Nutrition', 'Ayurveda', 'Diet', 'Digestion', 'Health'],
      trending: true,
      views: 1654,
      likes: 78
    },
    {
      id: 'stress-management-techniques',
      title: 'Natural Stress Management: Ancient Wisdom for Modern Life',
      slug: 'natural-stress-management-techniques',
      excerpt: 'Discover time-tested techniques from yoga and Ayurveda to manage stress naturally and maintain emotional balance.',
      content: 'In our fast-paced modern world, stress has become an epidemic affecting millions of people...',
      category: 'wellness',
      author: {
        name: 'Dr. Priya Sharma',
        avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        role: 'Chief Wellness Officer'
      },
      publishDate: '2024-01-20',
      readTime: '10 min read',
      image: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      tags: ['Stress Management', 'Wellness', 'Mental Health', 'Balance', 'Techniques'],
      views: 2234,
      likes: 134
    },
    {
      id: 'pranayama-breathing-exercises',
      title: 'The Power of Pranayama: 7 Breathing Exercises for Vitality',
      slug: 'pranayama-breathing-exercises-vitality',
      excerpt: 'Harness the power of breath with these traditional pranayama techniques to increase energy, reduce anxiety, and improve focus.',
      content: 'Pranayama, often translated as "breath control," is actually much more than controlling the breath...',
      category: 'yoga',
      author: {
        name: 'Yogi Arjun Patel',
        avatar: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        role: 'Senior Yoga Master'
      },
      publishDate: '2024-01-18',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      tags: ['Pranayama', 'Breathing', 'Yoga', 'Vitality', 'Energy'],
      views: 1876,
      likes: 92
    },
    {
      id: 'seasonal-wellness-tips',
      title: 'Seasonal Wellness: Adapting Your Routine Throughout the Year',
      slug: 'seasonal-wellness-tips-routine',
      excerpt: 'Learn how to adjust your wellness practices according to the seasons for optimal health and harmony with nature.',
      content: 'Ayurveda teaches us that we are intimately connected to the natural world around us...',
      category: 'wellness',
      author: {
        name: 'Dr. Priya Sharma',
        avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        role: 'Chief Wellness Officer'
      },
      publishDate: '2024-01-15',
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      tags: ['Seasonal Wellness', 'Nature', 'Routine', 'Health', 'Adaptation'],
      views: 1432,
      likes: 67
    },
    {
      id: 'detox-cleansing-guide',
      title: 'Gentle Detox: A Holistic Approach to Cleansing Body and Mind',
      slug: 'gentle-detox-holistic-cleansing',
      excerpt: 'Discover gentle, natural methods to detoxify your body and mind without extreme measures or harsh cleanses.',
      content: 'The concept of detoxification has become increasingly popular, but many approaches are too extreme...',
      category: 'nutrition',
      author: {
        name: 'Chef Meera Gupta',
        avatar: 'https://images.pexels.com/photos/3771120/pexels-photo-3771120.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        role: 'Wellness Cuisine Director'
      },
      publishDate: '2024-01-12',
      readTime: '9 min read',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      tags: ['Detox', 'Cleansing', 'Nutrition', 'Holistic', 'Natural'],
      views: 1789,
      likes: 85
    }
  ];

  const categories = [
    { id: 'all', name: 'All Articles', icon: BookOpen, count: blogPosts.length },
    { id: 'ayurveda', name: 'Ayurveda', icon: Leaf, count: blogPosts.filter(post => post.category === 'ayurveda').length },
    { id: 'yoga', name: 'Yoga', icon: Mountain, count: blogPosts.filter(post => post.category === 'yoga').length },
    { id: 'meditation', name: 'Meditation', icon: Sparkles, count: blogPosts.filter(post => post.category === 'meditation').length },
    { id: 'nutrition', name: 'Nutrition', icon: Coffee, count: blogPosts.filter(post => post.category === 'nutrition').length },
    { id: 'wellness', name: 'Wellness', icon: Sun, count: blogPosts.filter(post => post.category === 'wellness').length }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const trendingPosts = blogPosts.filter(post => post.trending);

  const openPostModal = (post: BlogPost) => {
    setSelectedPost(post);
    openPost();
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-beige-50 via-white to-lavender-50" />
      <div className="absolute top-32 left-10 w-80 h-80 bg-beige-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-32 right-10 w-96 h-96 bg-lavender-100/20 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="section-padding">
          <div className="container-max">
            <div
              ref={blogRef}
              className={cn(
                'text-center mb-16 transition-all duration-1000 transform',
                blogVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <div className="inline-flex items-center px-6 py-3 bg-beige-100 rounded-full mb-6">
                <BookOpen className="w-5 h-5 text-beige-600 mr-2" />
                <span className="text-beige-800 font-medium">Wellness Wisdom</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
                Wellness Blog
                <span className="block text-gradient">Ancient Wisdom, Modern Insights</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                Discover the secrets of holistic wellness through our expert articles on Ayurveda, 
                yoga, meditation, and conscious living. Transform your life with time-tested wisdom.
              </p>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beige-500 focus:border-transparent w-80"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Filter by category</span>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      'flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 transform',
                      blogVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                      activeCategory === category.id
                        ? 'bg-beige-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-beige-50 shadow-soft'
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

            {/* Featured Articles */}
            {activeCategory === 'all' && (
              <div className="mb-20">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-3xl font-serif font-bold text-gray-900">Featured Articles</h3>
                  <div className="flex items-center text-beige-600">
                    <Award className="w-5 h-5 mr-2" />
                    <span className="font-medium">Editor's Choice</span>
                  </div>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {featuredPosts.slice(0, 2).map((post, index) => (
                    <Card
                      key={post.id}
                      className={cn(
                        'overflow-hidden cursor-pointer group transition-all duration-1000 transform',
                        blogVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      )}
                      style={{ animationDelay: `${index * 200}ms` }}
                      onClick={() => openPostModal(post)}
                    >
                      <div className="relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="px-3 py-1 bg-beige-600 text-white text-xs font-medium rounded-full">
                            Featured
                          </span>
                          {post.trending && (
                            <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full flex items-center">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </span>
                          )}
                        </div>

                        {/* Category */}
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full capitalize">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-beige-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">{post.excerpt}</p>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="w-8 h-8 rounded-full mr-3"
                            />
                            <div>
                              <p className="font-medium text-gray-700">{post.author.name}</p>
                              <p className="text-xs">{post.author.role}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center mb-1">
                              <Calendar className="w-3 h-3 mr-1" />
                              <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              <span>{post.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center">
                              <Heart className="w-4 h-4 mr-1" />
                              <span>{post.likes}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="group-hover:bg-beige-50">
                            Read More
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* All Articles Grid */}
            <div
              ref={postsRef}
              className="mb-16"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-serif font-bold text-gray-900">
                  {activeCategory === 'all' ? 'Latest Articles' : `${categories.find(cat => cat.id === activeCategory)?.name} Articles`}
                </h3>
                <div className="text-sm text-gray-600">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <Card
                    key={post.id}
                    className={cn(
                      'overflow-hidden cursor-pointer group transition-all duration-1000 transform',
                      postsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    )}
                    style={{ animationDelay: `${index * 150}ms` }}
                    onClick={() => openPostModal(post)}
                  >
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full capitalize">
                          {post.category}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                          <Bookmark className="w-4 h-4 text-gray-700" />
                        </button>
                        <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                          <Share2 className="w-4 h-4 text-gray-700" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-serif font-bold text-gray-900 mb-3 group-hover:text-beige-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          <span className="font-medium">{post.author.name}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-beige-100 text-beige-700 text-xs rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            <span>{post.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center">
                            <Heart className="w-3 h-3 mr-1" />
                            <span>{post.likes}</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(post.publishDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Load More Button */}
            {filteredPosts.length > 9 && (
              <div className="text-center mb-16">
                <Button variant="outline" size="lg">
                  Load More Articles
                </Button>
              </div>
            )}

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-r from-beige-600 to-lavender-600 rounded-3xl p-12 text-white text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-6 text-beige-100" />
              <h3 className="text-3xl font-serif font-bold mb-4">
                Stay Updated with Wellness Wisdom
              </h3>
              <p className="text-xl text-beige-100 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and receive weekly wellness tips, exclusive articles, 
                and special offers directly in your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <Button
                  variant="secondary"
                  className="bg-white text-beige-600 hover:bg-beige-50 whitespace-nowrap"
                >
                  Subscribe Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Modal */}
      <Modal
        isOpen={isPostOpen}
        onClose={closePost}
        size="xl"
        className="p-0"
      >
        {selectedPost && (
          <div className="relative">
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <img
                    src={selectedPost.author.avatar}
                    alt={selectedPost.author.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{selectedPost.author.name}</h4>
                    <p className="text-sm text-gray-600">{selectedPost.author.role}</p>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div className="flex items-center mb-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(selectedPost.publishDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{selectedPost.readTime}</span>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">{selectedPost.title}</h2>
              
              <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                <span className="px-3 py-1 bg-beige-100 text-beige-700 rounded-full capitalize">
                  {selectedPost.category}
                </span>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>{selectedPost.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  <span>{selectedPost.likes} likes</span>
                </div>
              </div>

              <div className="prose prose-lg max-w-none mb-6">
                <p className="text-xl text-gray-700 leading-relaxed mb-6">{selectedPost.excerpt}</p>
                <p className="text-gray-700 leading-relaxed">{selectedPost.content}</p>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Tags:</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedPost.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-beige-100 text-beige-700 text-sm rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                      <Heart className="w-4 h-4 mr-2" />
                      Like Article
                    </button>
                    <button className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </button>
                    <button className="flex items-center px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                      <Bookmark className="w-4 h-4 mr-2" />
                      Save
                    </button>
                  </div>
                  <Button variant="primary">
                    Read Next Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default BlogSection;