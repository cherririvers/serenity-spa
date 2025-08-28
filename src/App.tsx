import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import RoomsSection from './components/sections/RoomsSection';
import SpaSection from './components/sections/SpaSection';
import RetreatsSection from './components/sections/RetreatsSection';
import DiningSection from './components/sections/DiningSection';
import GallerySection from './components/sections/GallerySection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import BlogSection from './components/sections/BlogSection';
import ContactSection from './components/sections/ContactSection';
import BookingSection from './components/sections/BookingSection';

function App() {
  return (
    <div className="min-h-screen bg-beige-50">
      <Header />
      
      <main>
        <HeroSection />
        
        <AboutSection />
        
        <RoomsSection />
        
        <SpaSection />
        
        <RetreatsSection />
        
        <DiningSection />
        
        <TestimonialsSection />
        
        <BlogSection />
        
        <ContactSection />
        
        <BookingSection />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
