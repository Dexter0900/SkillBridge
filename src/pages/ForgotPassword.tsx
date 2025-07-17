import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { FiMail, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send password reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
          <p className="mt-2 text-gray-600">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex items-center">
              <FiAlertCircle className="text-red-500 mr-2" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}
        
        {isSubmitted ? (
          <div className="mt-8">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <div className="flex items-center">
                <FiCheckCircle className="text-green-500 mr-2" />
                <p className="text-sm text-green-700">
                  Password reset link has been sent to your email address.
                </p>
              </div>
            </div>
            <p className="text-gray-600 mb-6 text-center">
              Please check your email and follow the instructions to reset your password.
            </p>
            <Link to="/login">
              <Button variant="outline" fullWidth>
                Back to Login
              </Button>
            </Link>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input pl-10"
                  placeholder="Email address"
                />
              </div>
            </div>
            
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
            >
              Send Reset Link
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <Link to="/login" className="text-primary-500 hover:text-primary-600 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;