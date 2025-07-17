import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { gigs } from '../data/dummyData';
import { FiCalendar, FiDollarSign, FiClock, FiUser, FiMapPin, FiTag, FiMessageSquare, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import toast from 'react-hot-toast';

const GigDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Find the gig with the matching ID
  const gig = gigs.find(g => g.id === id);
  
  // Check if the current user has already applied
  const hasApplied = gig?.applicants?.some(applicant => applicant.id === user?.id);
  
  // Check if the current user is the employer who posted this gig
  const isEmployer = user?.id === gig?.employer.id;
  
  const handleApply = () => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      setShowApplyModal(false);
      toast.success('Application submitted successfully!');
    }, 1500);
  };
  
  if (!gig) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <FiAlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Gig Not Found</h1>
          <p className="text-gray-600 mb-6">The gig you're looking for doesn't exist or has been removed.</p>
          <Link to="/browse-gigs">
            <Button>Browse Other Gigs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Gig Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{gig.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-gray-600 mb-4">
                <span className="flex items-center">
                  <FiTag className="mr-1" />
                  {gig.category}
                </span>
                <span className="flex items-center">
                  <FiCalendar className="mr-1" />
                  Posted {new Date(gig.createdAt).toLocaleDateString()}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  gig.status === 'open' 
                    ? 'bg-green-100 text-green-800' 
                    : gig.status === 'in-progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                }`}>
                  {gig.status.charAt(0).toUpperCase() + gig.status.slice(1).replace('-', ' ')}
                </span>
              </div>
            </div>
            
            {user && !isEmployer && gig.status === 'open' && (
              <div className="mt-4 md:mt-0">
                {hasApplied ? (
                  <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                    <FiCheckCircle className="mr-2" />
                    <span>Applied</span>
                  </div>
                ) : (
                  <Button onClick={() => setShowApplyModal(true)}>
                    Apply Now
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Gig Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 mb-6 whitespace-pre-line">{gig.description}</p>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {gig.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
              
              {gig.deadline && (
                <div className="border-t pt-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Deadline</h2>
                  <p className="text-gray-700 flex items-center">
                    <FiCalendar className="mr-2 text-gray-500" />
                    {new Date(gig.deadline).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
            
            {/* Employer Info (Mobile) */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 md:hidden">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About the Employer</h2>
              <div className="flex items-center mb-4">
                <img 
                  src={gig.employer.avatar || 'https://via.placeholder.com/60'} 
                  alt={gig.employer.name} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{gig.employer.name}</h3>
                  <p className="text-gray-600 text-sm">
                    Member since {new Date(gig.employer.joinedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              {gig.employer.location && (
                <p className="text-gray-700 flex items-center mb-3">
                  <FiMapPin className="mr-2 text-gray-500" />
                  {gig.employer.location}
                </p>
              )}
              
              {!isEmployer && (
                <Button 
                  variant="outline" 
                  fullWidth 
                  leftIcon={<FiMessageSquare />}
                >
                  Contact Employer
                </Button>
              )}
            </div>
          </div>
          
          <div className="md:col-span-1">
            {/* Gig Details Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Gig Details</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiDollarSign className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-gray-600 text-sm">Budget</p>
                    <p className="font-medium text-gray-900">${gig.budget}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiClock className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-gray-600 text-sm">Duration</p>
                    <p className="font-medium text-gray-900">{gig.duration}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiUser className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-gray-600 text-sm">Applicants</p>
                    <p className="font-medium text-gray-900">{gig.applicants?.length || 0}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Employer Info (Desktop) */}
            <div className="bg-white rounded-lg shadow-md p-6 hidden md:block">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About the Employer</h2>
              <div className="flex items-center mb-4">
                <img 
                  src={gig.employer.avatar || 'https://via.placeholder.com/60'} 
                  alt={gig.employer.name} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{gig.employer.name}</h3>
                  <p className="text-gray-600 text-sm">
                    Member since {new Date(gig.employer.joinedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              {gig.employer.location && (
                <p className="text-gray-700 flex items-center mb-3">
                  <FiMapPin className="mr-2 text-gray-500" />
                  {gig.employer.location}
                </p>
              )}
              
              {!isEmployer && (
                <Button 
                  variant="outline" 
                  fullWidth 
                  leftIcon={<FiMessageSquare />}
                >
                  Contact Employer
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Related Gigs */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Similar Gigs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gigs
              .filter(g => g.id !== gig.id && g.category === gig.category)
              .slice(0, 2)
              .map(relatedGig => (
                <Link key={relatedGig.id} to={`/gigs/${relatedGig.id}`} className="block">
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-medium text-gray-900 mb-2">{relatedGig.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{relatedGig.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-primary-500 font-medium">${relatedGig.budget}</span>
                      <span className="text-gray-500 text-sm">{relatedGig.duration}</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
      
      {/* Apply Modal */}
      <Modal
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        title="Apply for Gig"
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowApplyModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleApply} 
              isLoading={isSubmitting}
              disabled={coverLetter.trim().length < 50}
            >
              Submit Application
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">{gig.title}</h3>
            <p className="text-gray-600">{gig.employer.name} • ${gig.budget} • {gig.duration}</p>
          </div>
          
          <div>
            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
              Cover Letter
            </label>
            <textarea
              id="coverLetter"
              rows={6}
              className="form-input"
              placeholder="Introduce yourself and explain why you're a good fit for this gig..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              Minimum 50 characters. Currently: {coverLetter.length} characters
              {coverLetter.length < 50 && coverLetter.length > 0 && (
                <span className="text-red-500"> (too short)</span>
              )}
            </p>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <FiAlertCircle className="text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-700">
                  Your profile information will be shared with the employer. Make sure your profile is up to date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GigDetails;