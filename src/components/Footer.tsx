import React from 'react';
import { ChefHat, Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <ChefHat className="h-8 w-8 text-amber-500" />
              <span className="text-2xl font-bold">Recipe Street</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Discover culinary excellence through our comprehensive recipe library, expert video tutorials, 
              and personalized chef consultations. Located at USIU AFRICA, your journey to masterful cooking starts here.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">Home</a></li>
              <li><a href="#recipes" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">Recipes</a></li>
              <li><a href="#subscription" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">Premium</a></li>
              <li><a href="#reviews" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">Reviews</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">Contact</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">Refund Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-500 transition-colors duration-300">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-300">Get the latest recipes and cooking tips delivered to your inbox.</p>
            </div>
            <div className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 border-none"
              />
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 flex items-center space-x-2 group">
                <Mail className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">Subscribe</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 Recipe Street. All rights reserved. Made with ❤️ for food lovers everywhere.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;