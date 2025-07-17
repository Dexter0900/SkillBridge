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
      
      {/* About Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About SkillBridge
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                SkillBridge was founded with a simple mission: to bridge the gap between talented students seeking real-world experience and employers looking for fresh perspectives and skills.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our platform provides a safe, structured environment where students can showcase their abilities, build their portfolios, and earn income while studying. For employers, we offer access to a diverse pool of motivated talent at competitive rates.
              </p>
              <p className="text-lg text-gray-600">
                We believe in the power of meaningful work experiences to transform education and help students launch successful careers. Every gig on our platform is an opportunity for growth, learning, and professional development.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt="Team collaboration"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;