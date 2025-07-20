import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { userDatabase, User } from '../utils/userDatabase';

interface RegistryUser {
  id: string;
  name: string;
  email: string;
  password: string; // Store hashed password in real app
  isSubscribed: boolean;
  createdAt: string;
}

interface SessionUser {
  id: string;
  name: string;
  email: string;
  isSubscribed: boolean;
  isApproved: boolean;
  isCourseApproved?: boolean;
  courseApprovedAt?: string;
}

interface AuthContextType {
  user: SessionUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  subscribe: (email: string, name: string) => void;
  isEmailRegistered: (email: string) => boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  subscribe: () => {},
  isEmailRegistered: () => false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [userRegistry, setUserRegistry] = useState<RegistryUser[]>([]);

  useEffect(() => {
    // Load user registry from localStorage
    const savedRegistry = localStorage.getItem('recipeStreetUserRegistry');
    if (savedRegistry) {
      setUserRegistry(JSON.parse(savedRegistry));
    }

    // Check for existing user session
    const savedUser = localStorage.getItem('recipeStreetUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save user registry to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('recipeStreetUserRegistry', JSON.stringify(userRegistry));
  }, [userRegistry]);

  const isEmailRegistered = (email: string): boolean => {
    return userDatabase.findUserByEmail(email) !== null;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists in database
    const registeredUser = userDatabase.findUserByEmail(email);
    
    if (registeredUser && registeredUser.password === password) {
      // Update last login
      userDatabase.updateLastLogin(email);
      
      // Create session user (without password)
      const sessionUser: SessionUser = {
        id: registeredUser.id,
        name: registeredUser.name,
        email: registeredUser.email,
        isSubscribed: registeredUser.isSubscribed,
        isApproved: registeredUser.isApproved,
        isCourseApproved: registeredUser.isCourseApproved,
        courseApprovedAt: registeredUser.courseApprovedAt,
      };
      
      setUser(sessionUser);
      localStorage.setItem('recipeStreetUser', JSON.stringify(sessionUser));
      return true;
    }
    
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email is already registered
    if (isEmailRegistered(email)) {
      return false; // Email already exists
    }
    
    if (email && password && name) {
      // Create user in database
      const newUser = userDatabase.createUser(name, email, password);
      
      if (newUser) {
        // Create session user (without password)
        const sessionUser: SessionUser = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          isSubscribed: newUser.isSubscribed,
          isApproved: newUser.isApproved,
          isCourseApproved: newUser.isCourseApproved,
          courseApprovedAt: newUser.courseApprovedAt,
        };
        
        setUser(sessionUser);
        localStorage.setItem('recipeStreetUser', JSON.stringify(sessionUser));
        return true;
      }
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('recipeStreetUser');
  };

  const subscribe = (email: string, name: string) => {
    if (user) {
      const updatedUser: SessionUser = { ...user, isSubscribed: true };
      setUser(updatedUser);
      localStorage.setItem('recipeStreetUser', JSON.stringify(updatedUser));
      
      // Update user in database
      userDatabase.updateSubscriptionStatus(user.id, true);
    } else {
      // Create new user with subscription
      const newUser = userDatabase.createUser(name, email, 'temp-password');
      
      if (newUser) {
        // Update subscription status
        userDatabase.updateSubscriptionStatus(newUser.id, true);
        
        // Create session user
        const sessionUser: SessionUser = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          isSubscribed: true,
          isApproved: newUser.isApproved,
          isCourseApproved: newUser.isCourseApproved,
          courseApprovedAt: newUser.courseApprovedAt,
        };
        
        setUser(sessionUser);
        localStorage.setItem('recipeStreetUser', JSON.stringify(sessionUser));
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, subscribe, isEmailRegistered }}>
      {children}
    </AuthContext.Provider>
  );
};