import React, { useState, useContext, useEffect } from 'react';
import { Check, Crown, Video, Users, Star } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import SubscriptionModal from './SubscriptionModal';
import { captureUserData } from '../utils/webhookService';

const Subscription = () => {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const { user } = useContext(AuthContext);
  const [paymentInProcess, setPaymentInProcess] = useState(false);

  useEffect(() => {
    if (user && !user.isSubscribed && !user.isApproved) {
      const flag = localStorage.getItem(`paymentInProcess_${user.email}`);
      setPaymentInProcess(flag === 'true');
    } else {
      setPaymentInProcess(false);
    }
  }, [user]);

  const features = [
    "Access to 500+ premium recipes",
    "HD video tutorials for every recipe",
    "1-on-1 virtual chef consultations",
    "In-person chef visits available",
    "Priority customer support",
    "Ad-free browsing experience",
    "Recipe customization tools",
    "Exclusive seasonal menus"
  ];

  return (
    <>
      <section id="subscription" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Unlock Culinary Excellence
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Join our premium community and elevate your cooking with exclusive recipes and personalized chef guidance.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Subscription Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-orange-500 text-white px-6 py-2 rounded-bl-2xl">
                <Crown className="h-5 w-5 inline mr-1" />
                Premium
              </div>
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Chef's Table</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl sm:text-5xl font-bold text-amber-600">$29</span>
                  <span className="text-lg sm:text-xl text-gray-600 ml-2">/month</span>
                </div>
                <p className="text-sm sm:text-base text-gray-600">Everything you need to become a master chef</p>
              </div>
              <ul className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              {user?.isSubscribed ? (
                <div className="text-center">
                  <div className="bg-green-100 text-green-800 py-4 rounded-xl font-bold text-lg mb-4">
                    ✓ You're subscribed to Chef's Table!
                  </div>
                  <p className="text-gray-600">Enjoy unlimited access to premium recipes and chef consultations.</p>
                </div>
              ) : paymentInProcess ? (
                <div className="text-center">
                  <div className="bg-yellow-100 text-yellow-800 py-4 rounded-xl font-bold text-lg mb-4">
                    ⏳ In Process
                  </div>
                  <p className="text-gray-600">Your payment is being reviewed. You will be approved after payment is confirmed.</p>
                </div>
              ) : !user?.isApproved ? (
                <div className="text-center">
                  <button
                    onClick={() => setShowSubscriptionModal(true)}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 group relative overflow-hidden"
                  >
                    <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">Unlock Premium</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  <p className="text-gray-500 text-xs mt-2">Get access to all premium features after payment and admin approval.</p>
                </div>
              ) : (
                <button
                  onClick={() => setShowSubscriptionModal(true)}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 group relative overflow-hidden"
                >
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">Start Your Culinary Journey</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              )}
              <p className="text-center text-xs sm:text-sm text-gray-500 mt-4">
                Cancel anytime • 30-day money-back guarantee
              </p>
            </div>
            {/* Benefits Showcase */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Video className="h-12 w-12 text-amber-600 mb-4" />
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">HD Video Tutorials</h4>
                <p className="text-sm sm:text-base text-gray-600">Follow along with professional chefs in crystal-clear video quality, with multiple camera angles and close-up shots.</p>
              </div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Users className="h-12 w-12 text-amber-600 mb-4" />
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Personal Chef Consultations</h4>
                <p className="text-sm sm:text-base text-gray-600">Get 1-on-1 guidance from certified chefs via video calls, or arrange in-person visits for hands-on training.</p>
              </div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Star className="h-12 w-12 text-amber-600 mb-4" />
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Exclusive Recipes</h4>
                <p className="text-sm sm:text-base text-gray-600">Access restaurant-quality recipes from world-renowned chefs, updated weekly with seasonal specialties.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <SubscriptionModal onClose={() => setShowSubscriptionModal(false)} />
      )}
    </>
  );
};

export default Subscription;