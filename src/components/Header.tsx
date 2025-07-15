import React, { useState, useContext } from 'react';
import { Menu, X, ChefHat } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import AuthModal from './AuthModal';
import SubscriptionModal from './SubscriptionModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { user, logout } = useContext(AuthContext);

  const handleSignIn = () => {
    setAuthMode('signin');
    setShowAuthModal(true);
  };

  const handleSignUp = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleSubscribeClick = async () => {
    // Send webhook data for subscription intent
    try {
      const webhookData = {
        action: 'subscription_intent',
        source: 'Header Subscribe Button',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        submittedAt: new Date().toLocaleString('en-US', {
          timeZone: 'Africa/Nairobi',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        userStatus: user ? 'logged_in' : 'not_logged_in',
        userName: user?.name || 'Not logged in'
      };

      console.log('Sending subscription intent webhook:', webhookData);

      await fetch('https://hook.eu2.make.com/6eq3bci7l4cwwn4vg5ef24gcxdrzc2em', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(webhookData)
      });

      console.log('Subscription intent webhook sent successfully');
    } catch (webhookError) {
      console.error('Subscription webhook error:', webhookError);
      // Don't fail the subscription process if webhook fails
    }

    // Show subscription modal (will handle sign-in requirement internally)
    setShowSubscriptionModal(true);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-tr from-yellow-400 via-amber-500 to-yellow-700 shadow-lg mr-2">
                <ChefHat className="h-7 w-7 text-white drop-shadow-lg" />
              </span>
              <span
                className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-wide"
                style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.04em', textShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
              >
                Recipe Street
              </span>
            </div>
            
            <nav className="hidden lg:flex space-x-6 xl:space-x-8">
              <a href="#home" className="text-gray-700 hover:text-amber-600 transition-colors duration-200">Home</a>
              <a href="#recipes" className="text-gray-700 hover:text-amber-600 transition-colors duration-200">Recipes</a>
              <a href="#subscription" className="text-gray-700 hover:text-amber-600 transition-colors duration-200">Premium</a>
              <a href="#reviews" className="text-gray-700 hover:text-amber-600 transition-colors duration-200">Reviews</a>
              <a href="#contact" className="text-gray-700 hover:text-amber-600 transition-colors duration-200">Contact</a>
            </nav>
            
            <div className="hidden md:flex space-x-2 lg:space-x-4">
              {user ? (
                <>
                  <span className="text-gray-700 px-3 py-2">Welcome, {user.name}</span>
                  <button 
                    onClick={logout}
                    className="text-gray-700 hover:text-amber-600 transition-colors duration-200 transform hover:scale-105 active:scale-95"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleSignIn} className="text-gray-700 hover:text-amber-600 transition-colors duration-200 transform hover:scale-105 active:scale-95">Sign In</button>
                  <button onClick={handleSubscribeClick} className="bg-amber-600 text-white px-3 lg:px-4 py-2 rounded-full hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
                    Subscribe
                  </button>
                </>
              )}
            </div>
            
            <button 
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          
          {isMenuOpen && (
            <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
              <nav className="flex flex-col space-y-4 p-4">
                <a href="#home" className="text-gray-700 hover:text-amber-600">Home</a>
                <a href="#recipes" className="text-gray-700 hover:text-amber-600">Recipes</a>
                <a href="#subscription" className="text-gray-700 hover:text-amber-600">Premium</a>
                <a href="#reviews" className="text-gray-700 hover:text-amber-600">Reviews</a>
                <a href="#contact" className="text-gray-700 hover:text-amber-600">Contact</a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  {user ? (
                    <>
                      <span className="text-gray-700">Welcome, {user.name}</span>
                      <button onClick={logout} className="text-gray-700 text-left">Logout</button>
                    </>
                  ) : (
                    <>
                      <button onClick={handleSignIn} className="text-gray-700 text-left">Sign In</button>
                      <button onClick={handleSubscribeClick} className="bg-amber-600 text-white px-4 py-2 rounded-full text-left hover:bg-amber-700 transition-all duration-300 transform hover:scale-105">
                        Subscribe
                      </button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
      {showAuthModal && <AuthModal mode={authMode} onClose={() => setShowAuthModal(false)} />}
      {showSubscriptionModal && <SubscriptionModal onClose={() => setShowSubscriptionModal(false)} />}
    </>
  );
};

export default Header;