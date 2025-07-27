import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export type UserRole = 'student' | 'employer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  skills?: string[];
  location?: string;
  website?: string;
  joinedAt: Date;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: '1',
    name: 'John Student',
    email: 'student@example.com',
    password: 'password123',
    role: 'student' as UserRole,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'Computer Science student with a passion for web development',
    skills: ['React', 'JavaScript', 'Node.js', 'UI/UX Design'],
    location: 'New York, USA',
    website: 'https://johnstudent.com',
    joinedAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Jane Employer',
    email: 'employer@example.com',
    password: 'password123',
    role: 'employer' as UserRole,
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    bio: 'Tech startup founder looking for talented students',
    location: 'San Francisco, USA',
    website: 'https://techstartup.com',
    joinedAt: new Date('2022-11-05')
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin' as UserRole,
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    joinedAt: new Date('2022-01-01')
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('skillbridge_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          ...parsedUser,
          joinedAt: new Date(parsedUser.joinedAt)
        });
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('skillbridge_user');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      setLoading(false);
      throw new Error('Invalid email or password');
    }
    
    // Remove password before storing
    const { password: _, ...userWithoutPassword } = foundUser;
    
    // Store user in localStorage
    localStorage.setItem('skillbridge_user', JSON.stringify(userWithoutPassword));
    
    setUser(userWithoutPassword);
    setLoading(false);
  };

  // Signup function
  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      setLoading(false);
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser = {
      id: `${MOCK_USERS.length + 1}`,
      name,
      email,
      role,
      joinedAt: new Date(),
    };
    
    // Store user in localStorage
    localStorage.setItem('skillbridge_user', JSON.stringify(newUser));
    
    setUser(newUser);
    setLoading(false);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('skillbridge_user');
    setUser(null);
  };

  // Forgot password function
  const forgotPassword = async (email: string) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(u => u.email === email);
    
    if (!foundUser) {
      setLoading(false);
      throw new Error('No account found with this email');
    }
    
    // In a real app, this would send a password reset email
    console.log(`Password reset link sent to ${email}`);
    
    setLoading(false);
  };

  // Update profile function
  const updateProfile = async (userData: Partial<User>) => {
    setLoading(true);
    
    if (!user) {
      setLoading(false);
      throw new Error('No user logged in');
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedUser = { ...user, ...userData };
    
    // Store updated user in localStorage
    localStorage.setItem('skillbridge_user', JSON.stringify(updatedUser));
    
    setUser(updatedUser);
    setLoading(false);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    forgotPassword,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};