import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { gigs } from '../data/dummyData';
import { FiPlus, FiEdit2, FiTrash2, FiUsers, FiEye } from 'react-icons/fi';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

const EmployerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [gigToDelete, setGigToDelete] = useState<string | null>(null);
  
  // Filter gigs by the current employer
  const myGigs = gigs.filter(gig => gig.employer.id === user?.id);
  
  // Filter active and completed gigs
  const activeGigs = myGigs.filter(gig => gig.status === 'open' || gig.status === 'in-progress');
  const completedGigs = myGigs.filter(gig => gig.status === 'completed');

  const handleDeleteClick = (gigId: string) => {
    setGigToDelete(gigId);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    // In a real app, this would call an API to delete the gig
    console.log(`Deleting gig ${gigToDelete}`);
    setDeleteModalOpen(false);
    setGigToDelete(null);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
            <p className="text-gray-600 mt-1">Manage your gigs and find talented students.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/employer-dashboard/post-gig">
              <Button leftIcon={<FiPlus />}>Post a New Gig</Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Gigs</h3>
          <p className="text-3xl font-bold text-primary-500">{activeGigs.length}</p>
          <p className="text-gray-600 mt-1">Currently open or in progress</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Completed Gigs</h3>
          <p className="text-3xl font-bold text-secondary-500">{completedGigs.length}</p>
          <p className="text-gray-600 mt-1">Successfully completed</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Spent</h3>
          <p className="text-3xl font-bold text-accent-500">$3,750</p>
          <p className="text-gray-600 mt-1">On all gigs</p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b">
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'active'
                ? 'text-primary-600 border-b-2 border-primary-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('active')}
          >
            Active Gigs
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'completed'
                ? 'text-primary-600 border-b-2 border-primary-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            Completed Gigs
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'active' ? (
            activeGigs.length > 0 ? (
              <div className="space-y-4">
                {activeGigs.map((gig) => (
                  <div key={gig.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{gig.title}</h3>
                        <p className="text-gray-600 mt-1">{gig.category} • ${gig.budget} • {gig.duration}</p>
                        <div className="flex items-center mt-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            gig.status === 'open' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {gig.status === 'open' ? 'Open' : 'In Progress'}
                          </span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-sm text-gray-500">
                            Posted on {new Date(gig.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center">
                          <FiUsers className="text-gray-400 mr-1" />
                          <span className="text-sm text-gray-600">
                            {gig.applicants?.length || 0} applicant{(gig.applicants?.length || 0) !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-2">
                        <Link to={`/gigs/${gig.id}`}>
                          <Button variant="outline" size="sm" leftIcon={<FiEye />}>
                            View
                          </Button>
                        </Link>
                        <Link to={`/employer-dashboard/edit-gig/${gig.id}`}>
                          <Button variant="outline" size="sm" leftIcon={<FiEdit2 />}>
                            Edit
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          leftIcon={<FiTrash2 />} 
                          onClick={() => handleDeleteClick(gig.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">You don't have any active gigs.</p>
                <Link to="/employer-dashboard/post-gig">
                  <Button>Post Your First Gig</Button>
                </Link>
              </div>
            )
          ) : (
            completedGigs.length > 0 ? (
              <div className="space-y-4">
                {completedGigs.map((gig) => (
                  <div key={gig.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{gig.title}</h3>
                        <p className="text-gray-600 mt-1">{gig.category} • ${gig.budget} • {gig.duration}</p>
                        <div className="flex items-center mt-2">
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            Completed
                          </span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-sm text-gray-500">
                            Completed on {new Date(gig.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Link to={`/gigs/${gig.id}`}>
                          <Button variant="outline" size="sm" leftIcon={<FiEye />}>
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">You don't have any completed gigs yet.</p>
              </div>
            )
          )}
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Gig"
        size="sm"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </div>
        }
      >
        <p className="text-gray-700">
          Are you sure you want to delete this gig? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default EmployerDashboard;