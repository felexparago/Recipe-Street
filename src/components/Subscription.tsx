import React, { useState, useContext, useEffect, useRef } from 'react';
import { Check, Crown, Video, Users, Star, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import SubscriptionModal from './SubscriptionModal';
import { captureUserData } from '../utils/webhookService';

const CelebrationModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
    {/* Fireworks */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="fireworks">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`firework firework-${i+1}`}></div>
        ))}
      </div>
      {/* Balloons */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className={`balloon balloon-${i+1}`}></div>
      ))}
    </div>
    <div className="relative bg-gradient-to-br from-amber-50 via-white to-orange-100 rounded-3xl shadow-2xl p-10 max-w-lg w-full flex flex-col items-center border-4 border-amber-300 animate-popIn">
      <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-amber-100 hover:bg-amber-200 rounded-full shadow transition-colors z-10">
        <X className="h-6 w-6 text-amber-700" />
      </button>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-600 mb-4 drop-shadow-lg animate-bounce">🎉 Congratulations! 🎉</h1>
      <p className="text-lg sm:text-2xl text-gray-800 mb-6 text-center animate-fadeInUp">
        You’ve been <span className="text-amber-600 font-bold">approved</span> for <span className="text-orange-600 font-bold">Premium Access</span>!<br/>
        Enjoy all exclusive recipes, chef consultations, and video tutorials.<br/>
        Welcome to the <span className="font-bold text-amber-500">Recipe Street Elite</span>!
      </p>
      <div className="flex flex-wrap gap-2 justify-center animate-fadeInUp">
        <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full font-semibold shadow">Premium Recipes</span>
        <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-semibold shadow">Chef Consultations</span>
        <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full font-semibold shadow">Video Tutorials</span>
        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold shadow">VIP Support</span>
      </div>
    </div>
    {/* Styles for balloons and fireworks */}
    <style>{`
      @keyframes balloonUp {
        0% { transform: translateY(100vh) scale(1); opacity: 0.7; }
        100% { transform: translateY(-120vh) scale(1.2); opacity: 1; }
      }
      @keyframes firework {
        0% { opacity: 0; transform: scale(0.2) translateY(0); }
        60% { opacity: 1; transform: scale(1.2) translateY(-30vh); }
        100% { opacity: 0; transform: scale(0.8) translateY(-60vh); }
      }
      .balloon {
        position: absolute;
        bottom: 0;
        width: 40px;
        height: 60px;
        border-radius: 20px 20px 30px 30px;
        opacity: 0.8;
        z-index: 10;
        animation: balloonUp 7s linear infinite;
      }
      .balloon-1 { left: 10vw; background: linear-gradient(135deg, #fbbf24, #f59e42); animation-delay: 0s; }
      .balloon-2 { left: 20vw; background: linear-gradient(135deg, #f472b6, #fbbf24); animation-delay: 1s; }
      .balloon-3 { left: 30vw; background: linear-gradient(135deg, #34d399, #fbbf24); animation-delay: 2s; }
      .balloon-4 { left: 40vw; background: linear-gradient(135deg, #60a5fa, #fbbf24); animation-delay: 0.5s; }
      .balloon-5 { left: 50vw; background: linear-gradient(135deg, #fbbf24, #f472b6); animation-delay: 1.5s; }
      .balloon-6 { left: 60vw; background: linear-gradient(135deg, #fbbf24, #34d399); animation-delay: 2.5s; }
      .balloon-7 { left: 70vw; background: linear-gradient(135deg, #fbbf24, #60a5fa); animation-delay: 3s; }
      .balloon-8 { left: 80vw; background: linear-gradient(135deg, #f472b6, #60a5fa); animation-delay: 1.2s; }
      .fireworks { position: absolute; inset: 0; pointer-events: none; z-index: 20; }
      .firework {
        position: absolute;
        left: 50%;
        bottom: 10vh;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: radial-gradient(circle, #fbbf24 60%, #f59e42 100%);
        box-shadow: 0 0 30px 10px #fbbf24, 0 0 60px 20px #f59e42;
        opacity: 0.7;
        animation: firework 2.5s ease-in-out infinite;
      }
      .firework-1 { left: 20vw; animation-delay: 0s; background: radial-gradient(circle, #fbbf24 60%, #f472b6 100%); }
      .firework-2 { left: 40vw; animation-delay: 0.5s; background: radial-gradient(circle, #34d399 60%, #fbbf24 100%); }
      .firework-3 { left: 60vw; animation-delay: 1s; background: radial-gradient(circle, #60a5fa 60%, #fbbf24 100%); }
      .firework-4 { left: 80vw; animation-delay: 1.5s; background: radial-gradient(circle, #f472b6 60%, #60a5fa 100%); }
      .firework-5 { left: 30vw; animation-delay: 1.2s; background: radial-gradient(circle, #fbbf24 60%, #34d399 100%); }
      .firework-6 { left: 70vw; animation-delay: 0.8s; background: radial-gradient(circle, #fbbf24 60%, #f59e42 100%); }
      .animate-popIn { animation: popIn 0.7s cubic-bezier(.68,-0.55,.27,1.55) both; }
      @keyframes popIn { 0% { transform: scale(0.7); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
      .animate-fadeIn { animation: fadeIn 0.7s both; }
      @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
      .animate-fadeInUp { animation: fadeInUp 1s both; }
      @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
    `}</style>
  </div>
);

const Subscription = () => {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const { user } = useContext(AuthContext);
  const [paymentInProcess, setPaymentInProcess] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const prevApproved = useRef(false);
  const prevCourseApproved = useRef(false);

  useEffect(() => {
    if (user && !user.isSubscribed && !user.isApproved) {
      const flag = localStorage.getItem(`paymentInProcess_${user.email}`);
      setPaymentInProcess(flag === 'true');
    } else {
      setPaymentInProcess(false);
    }
  }, [user]);

  useEffect(() => {
    if (user?.isApproved && !prevApproved.current) {
      setShowCelebration(true);
      prevApproved.current = true;
      setTimeout(() => setShowCelebration(false), 8000);
    }
    if (!user?.isApproved) {
      prevApproved.current = false;
    }
  }, [user?.isApproved]);

  useEffect(() => {
    if (user?.isCourseApproved && !prevCourseApproved.current) {
      setShowCelebration(true);
      prevCourseApproved.current = true;
      setTimeout(() => setShowCelebration(false), 8000);
    }
    if (!user?.isCourseApproved) {
      prevCourseApproved.current = false;
    }
  }, [user?.isCourseApproved]);

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
      {showCelebration && <CelebrationModal onClose={() => setShowCelebration(false)} />}
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