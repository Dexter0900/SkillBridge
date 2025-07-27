import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { gigs, projects } from '../data/dummyData';
import { FiExternalLink, FiPlus, FiSearch } from 'react-icons/fi';
import Button from '../components/ui/Button';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'applications' | 'projects'>('applications');
  
  // Filter gigs where the current user is an applicant
  const myApplications = gigs.filter(gig => 
    gig.applicants?.some(applicant => applicant.id === user?.id)
  );
  
  // Filter projects by the current user
  const myProjects = projects.filter(project => project.student.id === user?.id);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
            <p className="text-gray-600 mt-1">Here's what's happening with your gigs and projects.</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link to="/browse-gigs">
              <Button leftIcon={<FiSearch />}>Find Gigs</Button>
            </Link>
            <Link to="/student-dashboard/add-project">
              <Button variant="outline" leftIcon={<FiPlus />}>Add Project</Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Applications</h3>
          <p className="text-3xl font-bold text-primary-500">{myApplications.length}</p>
          <p className="text-gray-600 mt-1">Total gigs applied</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Projects</h3>
          <p className="text-3xl font-bold text-secondary-500">{myProjects.length}</p>
          <p className="text-gray-600 mt-1">Portfolio projects</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Earnings</h3>
          <p className="text-3xl font-bold text-accent-500">$1,250</p>
          <p className="text-gray-600 mt-1">Total earned</p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b">
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'applications'
                ? 'text-primary-600 border-b-2 border-primary-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('applications')}
          >
            My Applications
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'projects'
                ? 'text-primary-600 border-b-2 border-primary-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('projects')}
          >
            My Projects
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'applications' ? (
            myApplications.length > 0 ? (
              <div className="space-y-4">
                {myApplications.map((gig) => (
                  <div key={gig.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{gig.title}</h3>
                        <p className="text-gray-600 mt-1">{gig.employer.name} • {gig.category}</p>
                        <div className="flex items-center mt-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            gig.status === 'open' 
                              ? 'bg-green-100 text-green-800' 
                              : gig.status === 'in-progress'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}>
                            {gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
                          </span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-sm text-gray-500">${gig.budget}</span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-sm text-gray-500">{gig.duration}</span>
                        </div>
                      </div>
                      <Link to={`/gigs/${gig.id}`} className="mt-4 md:mt-0">
                        <Button variant="outline" size="sm" rightIcon={<FiExternalLink />}>
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">You haven't applied to any gigs yet.</p>
                <Link to="/browse-gigs">
                  <Button>Browse Available Gigs</Button>
                </Link>
              </div>
            )
          ) : (
            myProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myProjects.map((project) => (
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
                            View Project <FiExternalLink className="ml-1" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">You haven't added any projects to your portfolio yet.</p>
                <Button>Add Your First Project</Button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;