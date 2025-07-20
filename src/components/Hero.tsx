import React, { useContext, useState } from 'react';
import { Play, Star, Users } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import TutorialModal from './TutorialModal';

const Hero = () => {
  const { user } = useContext(AuthContext);
  const [showTutorial, setShowTutorial] = useState(false);

  const handleWatchTutorial = () => {
    // Open YouTube and search for cooking tutorials
    const searchQuery = encodeURIComponent('cooking tutorial');
    const youtubeUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;
    window.open(youtubeUrl, '_blank');
  };

  const handleExploreRecipes = () => {
    // Scroll to recipes section
    document.getElementById('recipes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/WEBSITE PHOTOS/download (12).png')`
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Welcome to
              <span className="block text-amber-400">Recipe Street</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Discover culinary magic through step-by-step tutorials, video guides, and exclusive chef consultations. 
              Your journey to masterful cooking starts here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button 
                onClick={handleExploreRecipes}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-110 hover:shadow-2xl active:scale-95 flex items-center space-x-2 group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">Explore Recipes</span>
              </button>
              <button 
                onClick={handleWatchTutorial}
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 sm:px-8 py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-110 hover:shadow-2xl active:scale-95 flex items-center space-x-2 group"
              >
                <Play className="h-5 w-5 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  Watch Tutorial (Premium)
                </span>
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Star className="h-6 w-6 text-amber-400" />
                  <span className="text-2xl sm:text-3xl font-bold">500+</span>
                </div>
                <p className="text-base sm:text-lg">Premium Recipes</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Users className="h-6 w-6 text-amber-400" />
                  <span className="text-2xl sm:text-3xl font-bold">50K+</span>
                </div>
                <p className="text-base sm:text-lg">Happy Cooks</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Play className="h-6 w-6 text-amber-400" />
                  <span className="text-2xl sm:text-3xl font-bold">1K+</span>
                </div>
                <p className="text-base sm:text-lg">Video Tutorials</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>
      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
    </>
  );
};

export default Hero;