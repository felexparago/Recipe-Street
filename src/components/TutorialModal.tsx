import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, ChefHat } from 'lucide-react';

interface TutorialModalProps {
  onClose: () => void;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const tutorialSteps = [
    {
      title: "Prepare Your Ingredients",
      description: "Gather all ingredients and measure them precisely. Fresh ingredients make all the difference!",
      animation: "🥕 → 🔪 → 📏",
      tip: "Pro tip: Mise en place - have everything ready before you start cooking."
    },
    {
      title: "Heat Your Pan",
      description: "Preheat your pan to medium-high heat. A properly heated pan ensures even cooking.",
      animation: "🔥 → 🍳 → 🌡️",
      tip: "Test the heat by sprinkling a few drops of water - they should sizzle and evaporate quickly."
    },
    {
      title: "Season and Sear",
      description: "Season your protein generously and sear for a beautiful golden crust.",
      animation: "🧂 → 🥩 → ✨",
      tip: "Don't move the protein too early - let it develop a proper crust first."
    },
    {
      title: "Add Aromatics",
      description: "Add garlic, herbs, and other aromatics to build complex flavors.",
      animation: "🧄 → 🌿 → 👃",
      tip: "Add garlic towards the end to prevent burning and bitter flavors."
    },
    {
      title: "Finish and Plate",
      description: "Add finishing touches and plate with care for a restaurant-quality presentation.",
      animation: "🍽️ → 🎨 → 👨‍🍳",
      tip: "Warm your plates beforehand to keep the food at optimal temperature."
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            if (currentStep < tutorialSteps.length - 1) {
              setCurrentStep(currentStep + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 100;
            }
          }
          return prev + 2;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, tutorialSteps.length]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(false);
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setProgress(0);
    setIsPlaying(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-3 mb-4">
            <ChefHat className="h-8 w-8" />
            <h2 className="text-2xl font-bold">Premium Cooking Tutorial</h2>
          </div>
          
          <p className="text-amber-100">
            Master the art of cooking with step-by-step animated guidance
          </p>
        </div>

        <div className="p-6">
          {/* Main Tutorial Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Animation Area */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-xl p-8 text-center min-h-[300px] flex flex-col justify-center items-center relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 animate-pulse"></div>
                
                <div className="relative z-10">
                  <div className="text-6xl mb-6 animate-bounce">
                    {tutorialSteps[currentStep].animation}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {tutorialSteps[currentStep].title}
                  </h3>
                  
                  <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                    {tutorialSteps[currentStep].description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-800">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4 mt-6">
                <button
                  onClick={handleRestart}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-full transition-all duration-200 transform hover:scale-110"
                >
                  <RotateCcw className="h-5 w-5" />
                </button>
                
                <button
                  onClick={handlePlayPause}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white p-4 rounded-full transition-all duration-200 transform hover:scale-110 shadow-lg"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </button>
                
                <div className="text-gray-600 font-medium">
                  Step {currentStep + 1} of {tutorialSteps.length}
                </div>
              </div>
            </div>

            {/* Steps Sidebar */}
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 text-lg">Tutorial Steps</h4>
              
              {tutorialSteps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                    index === currentStep
                      ? 'bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === currentStep
                        ? 'bg-amber-600 text-white'
                        : index < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="font-semibold text-gray-900">{step.title}</span>
                  </div>
                  
                  {index === currentStep && (
                    <div className="ml-11">
                      <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                      <div className="bg-amber-50 border-l-4 border-amber-400 p-2 rounded">
                        <p className="text-xs text-amber-800 font-medium">{step.tip}</p>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Premium Features Notice */}
          <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-3">
              <ChefHat className="h-6 w-6 text-amber-600" />
              <h5 className="font-bold text-gray-900">Premium Tutorial Features</h5>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span>Interactive step-by-step guidance</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span>Professional chef tips</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span>Animated cooking techniques</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;