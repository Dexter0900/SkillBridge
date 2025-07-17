import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { FiUser, FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check for role in URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role') as UserRole | null;
    
    if (roleParam && (roleParam === 'student' || roleParam === 'employer')) {
      setRole(roleParam);
    }
  }, [location.search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Validate password strength
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signup(name, email, password, role);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
      toast.error('Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create an account</h2>
          <p className="mt-2 text-gray-600">Join SkillBridge today</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex items-center">
              <FiAlertCircle className="text-red-500 mr-2" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input pl-10"
                  placeholder="Full name"
                />
              </div>
            </div>
            
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
            
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pl-10"
                  placeholder="Password (min. 8 characters)"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input pl-10"
                  placeholder="Confirm password"
                />
              </div>
            </div>
            
            <div>
              <label className="form-label">I am a</label>
              <div className="mt-1 grid grid-cols-2 gap-3">
                <div
                  className={`flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
                    role === 'student'
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setRole('student')}
                >
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={role === 'student'}
                    onChange={() => setRole('student')}
                    className="sr-only"
                  />
                  <span className="font-medium">Student</span>
                </div>
                <div
                  className={`flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
                    role === 'employer'
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setRole('employer')}
                >
                  <input
                    type="radio"
                    name="role"
                    value="employer"
                    checked={role === 'employer'}
                    onChange={() => setRole('employer')}
                    className="sr-only"
                  />
                  <span className="font-medium">Employer</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <Link to="/terms-of-service" className="text-primary-500 hover:text-primary-600">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy-policy" className="text-primary-500 hover:text-primary-600">
                Privacy Policy
              </Link>
            </label>
          </div>
          
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
          >
            Create Account
          </Button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-500 hover:text-primary-600 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;