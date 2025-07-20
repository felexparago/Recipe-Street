import React, { useState, createContext, useContext } from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import RecipeLibrary from './components/RecipeLibrary';
import Subscription from './components/Subscription';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Reviews from './components/Reviews';
import ChatBot from './components/ChatBot';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';

// Global sign-in modal context
export const SignInModalContext = createContext({ requireSignIn: () => {} });

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  // Expose this function to trigger sign-in modal
  const requireSignIn = () => setShowSignIn(true);

  // Check for admin access (you can change this to any key combination)
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Press Ctrl+Shift+A to show admin login
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        setShowAdminLogin(true);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleAdminLogin = () => {
    // Admin password is "Group 4"
    if (adminPassword === 'Group 4') {
      setShowAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
    } else {
      alert('Incorrect admin password!');
      setAdminPassword('');
    }
  };

  if (showAdminLogin) {
    return (
      <AuthProvider>
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Access</h2>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Enter admin password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                autoFocus
              />
              <button
                onClick={handleAdminLogin}
                className="w-full bg-amber-600 text-white py-3 rounded-lg font-bold hover:bg-amber-700 transition-colors"
              >
                Access Admin Panel
              </button>
              <button
                onClick={() => setShowAdminLogin(false)}
                className="w-full bg-gray-500 text-white py-3 rounded-lg font-bold hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Press Ctrl+Shift+A to access admin panel
            </p>
          </div>
        </div>
      </AuthProvider>
    );
  }

  if (showAdmin) {
    return (
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <div className="bg-amber-600 text-white p-4 text-center">
            <button 
              onClick={() => setShowAdmin(false)}
              className="bg-white text-amber-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              ← Back to Website
            </button>
            <p className="mt-2 text-sm">Admin Panel - Press Ctrl+Shift+A to access</p>
          </div>
          <AdminPanel />
        </div>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <SignInModalContext.Provider value={{ requireSignIn }}>
        <div className="min-h-screen bg-white">
          <Header />
          <Hero />
          <RecipeLibrary />
          <Subscription />
          <Reviews />
          <Contact />
          <Footer />
          <ChatBot />
          {showSignIn && (
            <AuthModal mode="signin" onClose={() => setShowSignIn(false)} />
          )}
        </div>
      </SignInModalContext.Provider>
    </AuthProvider>
  );
}

export default App;