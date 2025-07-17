import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { users, projects, reviews } from '../data/dummyData';
import { FiMapPin, FiGlobe, FiCalendar, FiMessageSquare, FiStar } from 'react-icons/fi';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

const PublicProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'projects' | 'reviews'>('projects');
  const [showContactModal, setShowContactModal] = useState(false);
  const [message, setMessage] = useState('');
  
  // Find the user with the matching ID
  const profileUser = users.find(u => u.id === id);
  
  // Get user's projects
  const userProjects = projects.filter(project => project.student.id === id);
  
  // Get reviews for the user
  const userReviews = reviews.filter(review => review.reviewee.id === id);
  
  if (!profileUser) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">User Not Found</h1>
          <p className="text-gray-600 mb-6">The user profile you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSendMessage = () => {
    // In a real app, this would send the message to the user
    console.log(`Sending message to ${profileUser.name}: ${message}`);
    setShowContactModal(false);
    setMessage('');
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-32"></div>
          <div className="px-6 py-4 relative">
            <div className="flex flex-col md:flex-row">
              <div className="flex-shrink-0 -mt-16 md:-mt-20">
                <img 
                  src={profileUser.avatar || 'https://via.placeholder.com/150'} 
                  alt={profileUser.name} 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover"
                />
              </div>
              <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{profileUser.name}</h1>
                    <p className="text-gray-600 capitalize">{profileUser.role}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Button 
                      onClick={() => setShowContactModal(true)}
                      leftIcon={<FiMessageSquare />}
                    >
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              {profileUser.bio && (
                <p className="text-gray-700 mb-4">{profileUser.bio}</p>
              )}
              
              <div className="flex flex-col md:flex-row md:items-center text-gray-600 gap-y-2 md:gap-x-6">
                {profileUser.location && (
                  <div className="flex items-center">
                    <FiMapPin className="mr-2 text-gray-500" />
                    <span>{profileUser.location}</span>
                  </div>
                )}
                
                {profileUser.website && (
                  <div className="flex items-center">
                    <FiGlobe className="mr-2 text-gray-500" />
                    <a 
                      href={profileUser.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-500 hover:text-primary-600"
                    >
                      {profileUser.website.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  </div>
                )}
                
                <div className="flex items-center">
                  <FiCalendar className="mr-2 text-gray-500" />
                  <span>Member since {new Date(profileUser.joinedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Skills Section (for students) */}
        {profileUser.role === 'student' && profileUser.skills && profileUser.skills.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profileUser.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Tabs for Projects and Reviews */}
        {profileUser.role === 'student' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex border-b">
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'projects'
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('projects')}
              >
                Projects
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'reviews'
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'projects' ? (
                userProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userProjects.map((project) => (
                      <div key={project.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title} 
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                          <p className="text-gray-600 mt-1 line-clamp-2">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {project.skills.slice(0, 3).map((skill, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                {skill}
                              </span>
                            ))}
                            {project.skills.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                +{project.skills.length - 3} more
                              </span>
                            )}
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                              {new Date(project.createdAt).toLocaleDateString()}
                            </span>
                            {project.link && (
                              <a 
                                href={project.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary-500 hover:text-primary-600 flex items-center text-sm"
                              >
                                View Project
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No projects to display.</p>
                  </div>
                )
              ) : (
                userReviews.length > 0 ? (
                  <div className="space-y-6">
                    {userReviews.map((review) => (
                      <div key={review.id} className="border rounded-lg p-4">
                        <div className="flex items-start">
                          <img 
                            src={review.reviewer.avatar || 'https://via.placeholder.com/40'} 
                            alt={review.reviewer.name} 
                            className="w-10 h-10 rounded-full mr-4"
                          />
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-gray-900">{review.reviewer.name}</h3>
                                <p className="text-gray-500 text-sm">
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <FiStar 
                                    key={i} 
                                    className={`w-4 h-4 ${
                                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 mt-2">{review.comment}</p>
                            {review.gig && (
                              <div className="mt-2 text-sm">
                                <span className="text-gray-500">For: </span>
                                <Link 
                                  to={`/gigs/${review.gig.id}`}
                                  className="text-primary-500 hover:text-primary-600"
                                >
                                  {review.gig.title}
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No reviews yet.</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Contact Modal */}
      <Modal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        title={`Contact ${profileUser.name}`}
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowContactModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSendMessage} 
              disabled={message.trim().length < 10}
            >
              Send Message
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center">
            <img 
              src={profileUser.avatar || 'https://via.placeholder.com/40'} 
              alt={profileUser.name} 
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h3 className="font-medium text-gray-900">{profileUser.name}</h3>
              <p className="text-gray-600 text-sm capitalize">{profileUser.role}</p>
            </div>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="form-input"
              placeholder={`Write your message to ${profileUser.name}...`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              Minimum 10 characters. Currently: {message.length} characters
              {message.length < 10 && message.length > 0 && (
                <span className="text-red-500"> (too short)</span>
              )}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PublicProfile;