import React from 'react';
import { 
  FiShield, 
  FiDollarSign, 
  FiStar, 
  FiMessageSquare, 
  FiTrendingUp, 
  FiUsers 
} from 'react-icons/fi';

const Features: React.FC = () => {
  const features = [
    {
      icon: <FiShield className="w-8 h-8 text-primary-500" />,
      title: 'Secure Platform',
      description: 'Our platform ensures secure transactions and protects user data with advanced encryption.',
    },
    {
      icon: <FiDollarSign className="w-8 h-8 text-primary-500" />,
      title: 'Fair Pricing',
      description: 'Students set competitive rates while employers get quality work at reasonable prices.',
    },
    {
      icon: <FiStar className="w-8 h-8 text-primary-500" />,
      title: 'Skill Verification',
      description: 'We verify student skills through assessments and project history to ensure quality.',
    },
    {
      icon: <FiMessageSquare className="w-8 h-8 text-primary-500" />,
      title: 'Seamless Communication',
      description: 'Built-in messaging system makes collaboration between students and employers easy.',
    },
    {
      icon: <FiTrendingUp className="w-8 h-8 text-primary-500" />,
      title: 'Portfolio Building',
      description: 'Students build professional portfolios with real-world projects and client testimonials.',
    },
    {
      icon: <FiUsers className="w-8 h-8 text-primary-500" />,
      title: 'Community Support',
      description: 'Join a community of students and employers sharing opportunities and knowledge.',
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Features That Make Us Different
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            SkillBridge offers a comprehensive platform designed specifically for students and employers to connect and collaborate effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-primary-50 rounded-xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Ready to Experience SkillBridge?
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Join thousands of students and employers already using our platform to connect, collaborate, and create amazing projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/signup"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Sign Up Now
                </a>
                <a
                  href="/browse-gigs"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-500 font-medium rounded-lg border border-primary-500 hover:bg-primary-50 transition-colors"
                >
                  Browse Gigs
                </a>
              </div>
            </div>
            <div className="md:w-1/3">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Students collaborating"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;