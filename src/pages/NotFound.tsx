import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { FiAlertCircle } from 'react-icons/fi';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full text-center">
        <FiAlertCircle className="mx-auto h-16 w-16 text-primary-500" />
        <h1 className="mt-6 text-4xl font-bold text-gray-900">404</h1>
        <h2 className="mt-2 text-2xl font-semibold text-gray-900">Page Not Found</h2>
        <p className="mt-4 text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button>Go to Home</Button>
          </Link>
          <Link to="/browse-gigs">
            <Button variant="outline">Browse Gigs</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;