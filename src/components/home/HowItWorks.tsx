import React from 'react';
import { FiUserPlus, FiBriefcase, FiCheckCircle, FiDollarSign } from 'react-icons/fi';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <FiUserPlus className="w-10 h-10 text-primary-500" />,
      title: 'Create an Account',
      description: 'Sign up as a student or employer and complete your profile with relevant skills and information.',
      color: 'bg-primary-50',
    },
    {
      icon: <FiBriefcase className="w-10 h-10 text-secondary-500" />,
      title: 'Post or Find Gigs',
      description: 'Employers post gigs with requirements and budget. Students browse and apply to relevant opportunities.',
      color: 'bg-secondary-50',
    },
    {
      icon: <FiCheckCircle className="w-10 h-10 text-accent-500" />,
      title: 'Collaborate on Projects',
      description: 'Once matched, work together through our platform with messaging, file sharing, and milestone tracking.',
      color: 'bg-accent-50',
    },
    {
      icon: <FiDollarSign className="w-10 h-10 text-green-500" />,
      title: 'Get Paid Securely',
      description: 'Students receive payment upon completion of milestones. Employers release funds when satisfied with the work.',
      color: 'bg-green-50',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How SkillBridge Works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform makes it easy for students and employers to connect, collaborate, and complete projects successfully.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className={`flex items-center justify-center w-20 h-20 rounded-full mb-6 ${step.color}`}>
                {step.icon}
              </div>
              <div className="relative mb-6 flex items-center justify-center">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500 text-white font-bold text-lg">
                  {index + 1}
                </span>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute w-full h-0.5 bg-gray-200 left-full top-1/2 transform -translate-y-1/2 ml-4"></div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-700 mb-6">
            Ready to get started with SkillBridge?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/signup?role=student"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
            >
              Join as Student
            </a>
            <a
              href="/signup?role=employer"
              className="inline-flex items-center justify-center px-6 py-3 bg-secondary-500 text-white font-medium rounded-lg hover:bg-secondary-600 transition-colors"
            >
              Join as Employer
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;