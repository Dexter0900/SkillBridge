import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  const { user } = useAuth();

  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Connect Students with Employers through Freelancing
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              SkillBridge helps students gain real-world experience while employers find fresh talent for their projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg">Go to Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button size="lg">Get Started</Button>
                  </Link>
                  <Link to="/browse-gigs">
                    <Button variant="outline" size="lg">Browse Gigs</Button>
                  </Link>
                </>
              )}
            </div>
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 10}.jpg`}
                    alt={`User ${i}`}
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Join 2,000+ users</p>
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  ))}
                  <span className="ml-1 text-sm text-gray-600">4.9/5 rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
              alt="Students collaborating"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white p-6 rounded-lg shadow-lg">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary-500">2,000+</p>
            <p className="text-gray-600 mt-2">Active Students</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary-500">500+</p>
            <p className="text-gray-600 mt-2">Employers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary-500">1,200+</p>
            <p className="text-gray-600 mt-2">Completed Gigs</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary-500">$500K+</p>
            <p className="text-gray-600 mt-2">Paid to Students</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;