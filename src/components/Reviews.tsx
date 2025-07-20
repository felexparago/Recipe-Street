import React, { useState } from 'react';
import { Star, Quote, CheckCircle, AlertCircle } from 'lucide-react';
import { captureUserData } from '../utils/webhookService';

const Reviews = () => {
  const [formData, setFormData] = useState({
    name: '',
    recipe: '',
    rating: 0,
    experience: ''
  });
  const [selectedRating, setSelectedRating] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      text: "Recipe Street has completely transformed my cooking! The video tutorials are incredibly detailed, and the chef consultations helped me perfect my knife skills. Worth every penny!",
      image: "/download (7).png",
      recipe: "Beef Wellington"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      text: "As a busy professional, I love how Recipe Street breaks down complex recipes into manageable steps. The premium recipes are restaurant-quality and the ingredients are always perfectly portioned.",
      image: "/download (8).png",
      recipe: "Sushi Master Class"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      rating: 5,
      text: "The in-person chef visit was amazing! Chef Maria taught me techniques I never would have learned from videos alone. My dinner parties have never been more impressive.",
      image: "/download (9).png",
      recipe: "French Macarons"
    },
    {
      id: 4,
      name: "David Thompson",
      rating: 4,
      text: "Great platform with excellent recipe variety. The free recipes are solid, and the premium content is definitely worth the upgrade. Customer service is also very responsive.",
      image: "/download (10).png",
      recipe: "Mediterranean Quinoa Bowl"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`h-5 w-5 ${index < rating ? 'text-amber-500 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.name && formData.recipe && formData.rating > 0 && formData.experience) {
      // Capture user data for webhook
      captureUserData('experience', {
        ...formData,
        rating: selectedRating
      });
      
      // Reset form
      setFormData({
        name: '',
        recipe: '',
        rating: 0,
        experience: ''
      });
      setSelectedRating(0);
      setSubmitStatus('success');
      setSubmitMessage('Thank you for sharing your experience!');
    } else {
      setSubmitStatus('error');
      setSubmitMessage('Please fill in all fields and select a rating.');
    }
  };

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Chefs Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of home cooks who have transformed their kitchens with Recipe Street.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id}
              className="bg-gray-50 rounded-2xl p-8 relative hover:shadow-lg transition-shadow duration-300"
            >
              <Quote className="h-8 w-8 text-amber-500 mb-4" />
              
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                "{review.text}"
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={review.image} 
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-600">Made: {review.recipe}</p>
                  </div>
                </div>
                
                <div className="flex space-x-1">
                  {renderStars(review.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Review Form */}
        <div className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Share Your Experience</h3>
          {submitStatus === 'success' && (
            <div className="text-center">
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2 justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-green-800">{submitMessage}</span>
              </div>
              <button 
                onClick={() => {
                  setSubmitStatus('idle');
                  setSubmitMessage('');
                }}
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
              >
                Share Another Experience
              </button>
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 justify-center">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-800">{submitMessage}</span>
            </div>
          )}
          {submitStatus !== 'success' && (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <select 
                  value={formData.recipe}
                  onChange={(e) => handleInputChange('recipe', e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Recipe you tried</option>
                  <option value="margherita">Classic Margherita Pizza</option>
                  <option value="wellington">Beef Wellington</option>
                  <option value="lava-cake">Chocolate Lava Cake</option>
                  <option value="sushi">Sushi Master Class</option>
                  <option value="quinoa">Mediterranean Quinoa Bowl</option>
                  <option value="macarons">French Macarons</option>
                </select>
              </div>
              
              <div className="flex justify-center space-x-2 mb-4">
                <span className="text-gray-700 mr-2">Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    className="focus:outline-none transform hover:scale-125 transition-all duration-200 active:scale-110"
                  >
                    <Star className={`h-6 w-6 transition-all duration-200 ${
                      star <= selectedRating ? 'text-amber-500 fill-current' : 'text-gray-300 hover:text-amber-500 hover:fill-current'
                    }`} />
                  </button>
                ))}
              </div>
              
              <textarea 
                placeholder="Tell us about your cooking experience..."
                rows={4}
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              ></textarea>
              
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-lg font-bold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">Submit Review</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;