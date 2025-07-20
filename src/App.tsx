import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import RecipeLibrary from './components/RecipeLibrary';
import Subscription from './components/Subscription';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Reviews from './components/Reviews';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <Hero />
        <RecipeLibrary />
        <Subscription />
        <Reviews />
        <Contact />
        <Footer />
        <ChatBot />
      </div>
    </AuthProvider>
  );
}

export default App;