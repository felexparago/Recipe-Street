import React, { useState, useContext } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

interface AuthModalProps {
  mode: 'signin' | 'signup';
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose }) => {
  const [currentMode, setCurrentMode] = useState(mode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  const { login, signup, isEmailRegistered } = useContext(AuthContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors([]);
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.email) {
      newErrors.push('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.push('Please enter a valid email');
    }

    if (!formData.password) {
      newErrors.push('Password is required');
    } else if (formData.password.length < 6) {
      newErrors.push('Password must be at least 6 characters');
    }

    if (currentMode === 'signup') {
      if (!formData.name) {
        newErrors.push('Name is required');
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.push('Passwords do not match');
      }
      // Check if email is already registered
      if (formData.email && isEmailRegistered(formData.email)) {
        newErrors.push('This email is already registered. Please sign in instead.');
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      let success = false;
      
      if (currentMode === 'signin') {
        success = await login(formData.email, formData.password);
      } else {
        success = await signup(formData.email, formData.password, formData.name);
      }

      if (success) {
        // Send webhook data for authentication
        try {
          const webhookData = {
            action: currentMode === 'signin' ? 'user_signin' : 'user_signup',
            email: formData.email,
            name: formData.name || 'Not provided',
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            source: 'Recipe Street Authentication',
            submittedAt: new Date().toLocaleString('en-US', {
              timeZone: 'Africa/Nairobi',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            }),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          };

          console.log('Sending auth webhook data:', webhookData);

          await fetch('https://hook.eu2.make.com/6eq3bci7l4cwwn4vg5ef24gcxdrzc2em', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify(webhookData)
          });

          console.log('Auth webhook sent successfully');
        } catch (webhookError) {
          console.error('Auth webhook error:', webhookError);
          // Don't fail the auth process if webhook fails
        }

        onClose();
      } else {
        setErrors(['Authentication failed. Please try again.']);
      }
    } catch (error) {
      setErrors(['An error occurred. Please try again.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {currentMode === 'signin' ? (
              <Lock className="h-8 w-8 text-amber-600" />
            ) : (
              <User className="h-8 w-8 text-amber-600" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {currentMode === 'signin' ? 'Welcome Back' : 'Join Recipe Street'}
          </h2>
          <p className="text-gray-600">
            {currentMode === 'signin' 
              ? 'Sign in to access your recipes and preferences' 
              : 'Create an account to start your culinary journey'
            }
          </p>
        </div>

        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            {errors.map((error, index) => (
              <p key={index} className="text-red-600 text-sm">{error}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {currentMode === 'signup' && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full name"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {currentMode === 'signup' && (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-lg font-bold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Please wait...</span>
              </div>
            ) : (
              currentMode === 'signin' ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {currentMode === 'signin' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setCurrentMode(currentMode === 'signin' ? 'signup' : 'signin')}
              className="text-amber-600 hover:text-amber-700 font-semibold transition-colors duration-200"
            >
              {currentMode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {currentMode === 'signin' && (
          <div className="mt-4 text-center">
            <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
              Forgot your password?
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;