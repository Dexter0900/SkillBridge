import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
    </div>
  );
};

export default Home;