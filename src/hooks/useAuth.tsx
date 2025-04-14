
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define user types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'faculty' | 'student';
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample user data - in a real app, this would come from an API
const SAMPLE_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Professor Smith',
    email: 'faculty@example.com',
    password: 'faculty123',
    role: 'faculty'
  },
  {
    id: '3',
    name: 'John Student',
    email: 'student@example.com',
    password: 'student123',
    role: 'student'
  }
];

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing user session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string, role: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user with matching credentials
      const matchedUser = SAMPLE_USERS.find(u => 
        u.email === email && 
        u.password === password && 
        u.role === role
      );
      
      if (matchedUser) {
        // Create user object (exclude password)
        const loggedInUser = {
          id: matchedUser.id,
          name: matchedUser.name,
          email: matchedUser.email,
          role: matchedUser.role as 'admin' | 'faculty' | 'student'
        };
        
        // Save to state and localStorage
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
      } else {
        setError('Invalid email, password, or role');
      }
    } catch (err) {
      setError('Failed to login. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
