import React from 'react';
import { Heart, Leaf, Users, Award, Clock, Globe, Sparkles, Mountain } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { cn } from '../../utils/cn';

const AboutSection: React.FC = () => {
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollAnimation();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation();
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const coreValues = [
    {
      icon: Heart,
      title: 'Holistic Healing',
      description: 'We believe in treating the whole person - mind, body, and spirit - through ancient Ayurvedic wisdom and modern wellness practices.',
      color: 'text-red-500'
    },
    {
      icon: Leaf,
      title: 'Natural Harmony',
      description: 'Our treatments use only organic, locally-sourced ingredients and sustainable practices that honor Mother Earth.',
      color: 'text-green-500'
    },
    {
      icon: Users,
      title: 'Community Wellness',
      description: 'Creating a supportive community where guests connect, heal, and grow together on their wellness journey.',
      color: 'text-blue-500'
    },
    {
      icon: Sparkles,
      title: 'Transformative Experience',
      description: 'Every program is designed to create lasting positive change that extends far beyond your stay with us.',
      color: 'text-purple-500'
    }
  ];

  const milestones = [
    { year: '2009', event: 'Founded in the spiritual heart of Rishikesh' },
    { year: '2012', event: 'Yoga Alliance certification achieved' },
    { year: '2015', event: 'Ayurveda Board recognition received' },
    { year: '2018', event: 'Expanded to 50+ wellness programs' },
    { year: '2021', event: 'Sustainability certification earned' },
    { year: '2024', event: 'Serving 500+ guests annually' }
  ];

  const teamMembers = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Chief Wellness Officer',
      credentials: 'BAMS, 20+ years Ayurveda',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Leading Ayurvedic practitioner with expertise in panchakarma and herbal medicine.'
    },
    {
      name: 'Yogi Arjun Patel',
      role: 'Senior Yoga Master',
      credentials: 'E-RYT 500, Meditation Expert',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Traditional Hatha and Vinyasa yoga teacher with 15 years of teaching experience.'
    },
    {
      name: 'Chef Meera Gupta',
      role: 'Wellness Cuisine Director',
      credentials: 'Certified Nutritionist',
      image: 'https://images.pexels.com/photos/3771120/pexels-photo-3771120.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Creates healing meals using organic ingredients and Ayurvedic principles.'
    }
  ];

  return (
    <section id="about" className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-beige-50 via-white to-sage-50" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-lavender-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-sage-100/30 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Main About Content */}
        <div className="section-padding">
          <div className="container-max">
            <div
              ref={aboutRef}
              className={cn(
                'text-center mb-16 transition-all duration-1000 transform',
                aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <div className="inline-flex items-center px-6 py-3 bg-lavender-100 rounded-full mb-6">
                <Mountain className="w-5 h-5 text-lavender-600 mr-2" />
                <span className="text-lavender-800 font-medium">Our Story</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
                Where Ancient Wisdom
                <span className="block text-gradient">Meets Modern Wellness</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Nestled in the spiritual heart of Rishikesh, Serenity Spa has been a sanctuary of healing 
                and transformation for over 15 years. Our journey began with a simple vision: to create 
                a space where ancient Ayurvedic wisdom could flourish alongside modern wellness practices.
              </p>
            </div>

            {/* Story Grid */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              <div className={cn(
                'transition-all duration-1000 transform',
                aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              )}>
                <img
                  src="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Serene meditation space with candles and lotus flowers"
                  className="w-full h-96 object-cover rounded-3xl shadow-soft-lg"
                />
              </div>
              
              <div className={cn(
                'transition-all duration-1000 transform',
                aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              )}>
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  A Legacy of Healing
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Founded by wellness pioneers who recognized the need for authentic healing experiences, 
                  Serenity Spa has grown from a small retreat center to India's premier wellness destination. 
                  We've maintained our commitment to traditional practices while embracing innovations that 
                  enhance the healing journey.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our location in Rishikesh, known as the "Yoga Capital of the World," provides the perfect 
                  backdrop for transformation. Surrounded by the majestic Himalayas and the sacred Ganges, 
                  our guests find themselves immersed in an environment that naturally promotes healing and self-discovery.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-white rounded-2xl shadow-soft">
                    <div className="text-3xl font-bold text-lavender-600 mb-2">15+</div>
                    <div className="text-gray-600 font-medium">Years of Excellence</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-2xl shadow-soft">
                    <div className="text-3xl font-bold text-sage-600 mb-2">5000+</div>
                    <div className="text-gray-600 font-medium">Lives Transformed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="section-padding bg-white/50">
          <div className="container-max">
            <div
              ref={valuesRef}
              className={cn(
                'text-center mb-16 transition-all duration-1000 transform',
                valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <h3 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                Our Core Values
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These principles guide everything we do, from the treatments we offer to the 
                environment we create for our guests.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card
                    key={value.title}
                    className={cn(
                      'text-center h-full transition-all duration-1000 transform',
                      valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    )}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center`}>
                      <Icon className={`w-8 h-8 ${value.color}`} />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="section-padding">
          <div className="container-max">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                Our Journey
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Milestones that have shaped our commitment to wellness excellence.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-lavender-300 to-sage-300" />
                
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={cn(
                      'relative flex items-center mb-12 transition-all duration-1000 transform',
                      valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                      index % 2 === 0 ? 'justify-start' : 'justify-end'
                    )}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className={cn(
                      'w-5/12 p-6 bg-white rounded-2xl shadow-soft',
                      index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                    )}>
                      <div className="text-2xl font-bold text-lavender-600 mb-2">{milestone.year}</div>
                      <p className="text-gray-700 font-medium">{milestone.event}</p>
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-lavender-500 rounded-full border-4 border-white shadow-md" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="section-padding bg-gradient-to-br from-sage-50 to-beige-50">
          <div className="container-max">
            <div
              ref={teamRef}
              className={cn(
                'text-center mb-16 transition-all duration-1000 transform',
                teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <h3 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                Meet Our Wellness Experts
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our team of certified practitioners brings decades of experience in traditional 
                and modern wellness practices.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card
                  key={member.name}
                  className={cn(
                    'text-center transition-all duration-1000 transform',
                    teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  )}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-lavender-600 text-white text-xs rounded-full">
                      {member.credentials}
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h4>
                  <p className="text-lavender-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="section-padding">
          <div className="container-max">
            <div className="text-center bg-gradient-to-r from-lavender-600 to-sage-600 rounded-3xl p-12 text-white">
              <Globe className="w-16 h-16 mx-auto mb-6 text-lavender-100" />
              <h3 className="text-3xl font-serif font-bold mb-4">
                Ready to Begin Your Wellness Journey?
              </h3>
              <p className="text-xl text-lavender-100 mb-8 max-w-2xl mx-auto">
                Join thousands of guests who have discovered transformation, healing, and inner peace at Serenity Spa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-lavender-600 hover:bg-lavender-50"
                >
                  <Clock className="w-5 h-5 mr-2" />
                  Book Consultation
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white border-white/30 hover:bg-white/10"
                >
                  View Programs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;