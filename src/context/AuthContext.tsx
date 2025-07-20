import React, { createContext, useState, useEffect, ReactNode } from 'react';

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
    return userRegistry.some(user => user.email.toLowerCase() === email.toLowerCase());
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists in registry
    const registeredUser = userRegistry.find(
      user => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );
    
    if (registeredUser) {
      // Create session user (without password)
      const sessionUser: SessionUser = {
        id: registeredUser.id,
        name: registeredUser.name,
        email: registeredUser.email,
        isSubscribed: registeredUser.isSubscribed,
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
      const newRegistryUser: RegistryUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // In a real app, this should be hashed
        isSubscribed: false,
        createdAt: new Date().toISOString(),
      };
      
      // Add to registry
      setUserRegistry(prev => [...prev, newRegistryUser]);
      
      // Create session user (without password)
      const sessionUser: SessionUser = {
        id: newRegistryUser.id,
        name: newRegistryUser.name,
        email: newRegistryUser.email,
        isSubscribed: newRegistryUser.isSubscribed,
      };
      
      setUser(sessionUser);
      localStorage.setItem('recipeStreetUser', JSON.stringify(sessionUser));
      return true;
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
      
      // Update user in registry
      setUserRegistry(prev => 
        prev.map(u => 
          u.id === user.id 
            ? { ...u, isSubscribed: true }
            : u
        )
      );
    } else {
      // Create new user with subscription
      const newRegistryUser: RegistryUser = {
        id: Date.now().toString(),
        name,
        email,
        password: '', // This would be set during signup
        isSubscribed: true,
        createdAt: new Date().toISOString(),
      };
      
      // Add to registry
      setUserRegistry(prev => [...prev, newRegistryUser]);
      
      // Create session user
      const sessionUser: SessionUser = {
        id: newRegistryUser.id,
        name: newRegistryUser.name,
        email: newRegistryUser.email,
        isSubscribed: newRegistryUser.isSubscribed,
      };
      
      setUser(sessionUser);
      localStorage.setItem('recipeStreetUser', JSON.stringify(sessionUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, subscribe, isEmailRegistered }}>
      {children}
    </AuthContext.Provider>
  );
};