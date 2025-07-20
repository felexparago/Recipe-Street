import React, { useState, useContext } from 'react';
import { X, CreditCard, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { captureUserData } from '../utils/webhookService';
import { userDatabase } from '../utils/userDatabase';

interface SubscriptionModalProps {
  onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ onClose }) => {
  const { user } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardData(prev => ({
      ...prev,
      cardNumber: formatted
    }));
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setCardData(prev => ({
      ...prev,
      expiryDate: formatted
    }));
  };

  const validateForm = () => {
    if (!cardData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      return 'Please enter a valid 16-digit card number';
    }
    if (!cardData.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      return 'Please enter a valid expiry date (MM/YY)';
    }
    if (!cardData.cvv.match(/^\d{3,4}$/)) {
      return 'Please enter a valid CVV';
    }
    if (!cardData.cardholderName.trim()) {
      return 'Please enter the cardholder name';
    }
    if (!cardData.billingAddress.trim()) {
      return 'Please enter your billing address';
    }
    if (!cardData.city.trim()) {
      return 'Please enter your city';
    }
    if (!cardData.postalCode.trim()) {
      return 'Please enter your postal code';
    }
    if (!cardData.country.trim()) {
      return 'Please enter your country';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setSubmitStatus('error');
      setSubmitMessage(validationError);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send payment data to webhook (existing logic)
      captureUserData('payment', {
        action: 'subscription_payment',
        user: {
          id: user?.id,
          name: user?.name,
          email: user?.email
        },
        payment: {
          cardNumber: cardData.cardNumber.replace(/\s/g, '').slice(-4),
          expiryDate: cardData.expiryDate,
          cardholderName: cardData.cardholderName,
          billingAddress: cardData.billingAddress,
          city: cardData.city,
          postalCode: cardData.postalCode,
          country: cardData.country
        },
        subscription: {
          plan: 'Premium Subscription',
          amount: 29.99,
          currency: 'USD',
          billingCycle: 'monthly'
        },
        source: 'Recipe Street Subscription'
      });

      // Save card info to user database (last 4 digits only)
      if (user) {
        const dbUser = userDatabase.findUserByEmail(user.email);
        if (dbUser) {
          dbUser.cardInfo = {
            last4: cardData.cardNumber.replace(/\s/g, '').slice(-4),
            expiryDate: cardData.expiryDate,
            cardholderName: cardData.cardholderName,
            billingAddress: cardData.billingAddress,
            city: cardData.city,
            postalCode: cardData.postalCode,
            country: cardData.country
          };
          // Save updated user to database
          const users = userDatabase.getAllUsers().map(u =>
            u.email.toLowerCase() === user.email.toLowerCase() ? dbUser : u
          );
          localStorage.setItem('recipe_street_users', JSON.stringify(users));
        }
      }

      // Mark user as "in process" (not approved, not subscribed)
      if (user) {
        localStorage.setItem(`paymentInProcess_${user.email}`, 'true');
      }

      setSubmitStatus('success');
      setSubmitMessage('In process. Your payment is being reviewed. You will be approved after payment is confirmed.');
      
      // Clear form
      setCardData({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        billingAddress: '',
        city: '',
        postalCode: '',
        country: ''
      });
    } catch (error) {
      console.error('Subscription error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Sorry, there was an error processing your payment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Sign In Required
            </h2>
            <p className="text-gray-600 mb-6">
              You must be signed in to subscribe to our premium plan.
            </p>
            <button
              onClick={onClose}
              className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Premium Subscription
          </h2>
          <p className="text-gray-600">
            Complete your subscription to unlock premium recipes and features
          </p>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800">{submitMessage}</span>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-red-800">{submitMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subscription Plan Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Subscription Plan</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Premium Monthly Plan</span>
              <span className="text-2xl font-bold text-amber-600">$29.99/month</span>
            </div>
            <ul className="mt-3 text-sm text-gray-600 space-y-1">
              <li>• Access to all premium recipes</li>
              <li>• Video tutorials and chef consultations</li>
              <li>• Priority customer support</li>
              <li>• Exclusive cooking tips and tricks</li>
            </ul>
          </div>

          {/* Card Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Payment Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardData.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="cardholderName"
                  value={cardData.cardholderName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={cardData.expiryDate}
                  onChange={handleExpiryDateChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={cardData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Billing Address</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                name="billingAddress"
                value={cardData.billingAddress}
                onChange={handleInputChange}
                placeholder="123 Main Street"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                disabled={isSubmitting}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={cardData.city}
                  onChange={handleInputChange}
                  placeholder="New York"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={cardData.postalCode}
                  onChange={handleInputChange}
                  placeholder="10001"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={cardData.country}
                  onChange={handleInputChange}
                  placeholder="United States"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-lg font-bold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing Payment...</span>
              </div>
            ) : (
              'Subscribe Now - $29.99/month'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Your payment will be processed securely. You will receive a confirmation email once the subscription is active.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal; 