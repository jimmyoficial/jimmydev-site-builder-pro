
import React, { useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Simulator } from '@/components/Simulator';
import { MobileAppSimulator } from '@/components/MobileAppSimulator';
import { Differentials } from '@/components/Differentials';
import { FaqSection } from '@/components/FaqSection';
import { IntermediateCta, FinalCta } from '@/components/CallToAction';
import { SocialProof } from '@/components/SocialProof';

const Index = () => {
  // Function to handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      const animatedElements = document.querySelectorAll('.animate-on-scroll:not(.active)');
      
      animatedElements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.9) {
          element.classList.add('active');
        }
      });
    };

    // Initial check for elements in viewport on load
    setTimeout(handleScroll, 500);
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Add Google Analytics tracking for simulator usage
  useEffect(() => {
    // This would be the actual Google Analytics tracking code in a production environment
    console.log('Google Analytics initialized for tracking simulator usage');
  }, []);

  return (
    <Layout>
      <Hero />
      <Services />
      <Simulator />
      <MobileAppSimulator />
      <SocialProof />
      <Differentials />
      <IntermediateCta />
      <FaqSection />
      <FinalCta />
    </Layout>
  );
};

export default Index;
