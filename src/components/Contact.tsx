import React, { useState, useContext } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, ChefHat, CheckCircle, AlertCircle } from 'lucide-react';
import { captureUserData } from '../utils/webhookService';
import { AuthContext } from '../context/AuthContext';
import { SignInModalContext } from '../App';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    inquiryType: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const { user } = useContext(AuthContext);
  const { requireSignIn } = useContext(SignInModalContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) return 'First name is required';
    if (!formData.lastName.trim()) return 'Last name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.email.includes('@')) return 'Please enter a valid email address';
    if (!formData.inquiryType) return 'Please select an inquiry type';
    if (!formData.message.trim()) return 'Message is required';
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
      // Capture contact form data for webhook
      captureUserData('contact', {
        ...formData,
        source: 'Recipe Street Contact Form'
      });

      // Simulate successful form submission
      setSubmitStatus('success');
      setSubmitMessage('Thank you! Your message has been sent successfully.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        inquiryType: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending form:', error);
      setSubmitStatus('error');
      setSubmitMessage('Sorry, there was an error sending your message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler for premium actions
  const handlePremiumAction = (action: string) => {
    if (!user) {
      requireSignIn();
    } else {
      alert(`${action} - (This is a placeholder. Replace with real functionality.)`);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions about a recipe? Need personalized cooking advice? Our culinary experts are here to help.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <MessageCircle className="h-6 w-6 text-amber-500 mr-2" />
              Send us a message
            </h3>
            
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-900/50 border border-green-500 rounded-lg flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-400">{submitMessage}</span>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <span className="text-red-400">{submitMessage}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                  className="bg-gray-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:bg-gray-600 border-none"
                  disabled={isSubmitting}
                />
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  className="bg-gray-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:bg-gray-600 border-none"
                  disabled={isSubmitting}
                />
              </div>
              
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email address"
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:bg-gray-600 border-none"
                disabled={isSubmitting}
              />
              
              <select 
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:bg-gray-600 border-none"
                disabled={isSubmitting}
              >
                <option value="">What can we help you with?</option>
                <option value="recipe-question">Recipe Question</option>
                <option value="chef-consultation">Chef Consultation Booking</option>
                <option value="subscription">Subscription Support</option>
                <option value="technical">Technical Issue</option>
                <option value="partnership">Partnership Inquiry</option>
                <option value="other">Other</option>
              </select>
              
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us more about your request..."
                rows={5}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:bg-gray-600 border-none resize-none"
                disabled={isSubmitting}
              ></textarea>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-lg font-bold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </span>
              </button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <ChefHat className="h-6 w-6 text-amber-500 mr-2" />
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-amber-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">Email Us</h4>
                    <p className="text-gray-300">hello@recipestreet.com</p>
                    <p className="text-gray-300">support@recipestreet.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-amber-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">Call Us</h4>
                    <p className="text-gray-300">+254769742597</p>
                    <p className="text-gray-300">Recipe Street Support</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-amber-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">Visit Us</h4>
                    <p className="text-gray-300">USIU AFRICA</p>
                    <p className="text-gray-300">Nairobi, Kenya</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-amber-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">Business Hours</h4>
                    <p className="text-gray-300">Monday - Friday: 9:00 AM - 8:00 PM</p>
                    <p className="text-gray-300">Saturday - Sunday: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Contact Options */}
            <div className="bg-gray-800 rounded-2xl p-6">
              <h4 className="text-xl font-bold mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 group"
                  onClick={() => handlePremiumAction('Book Chef Consultation')}
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Book Chef Consultation</span>
                </button>
                <button
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 group"
                  onClick={() => handlePremiumAction('Live Chat Support')}
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Live Chat Support</span>
                </button>
                <button
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 group"
                  onClick={() => handlePremiumAction('Schedule Video Call')}
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Schedule Video Call</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4 flex items-center justify-center">
              <MapPin className="h-8 w-8 text-amber-500 mr-3" />
              Find Us at USIU-Africa
            </h3>
            <p className="text-xl text-gray-300">
              Located in the heart of Nairobi, Kenya
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-2xl p-6">
            <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8194444444444!2d36.88255331531736!3d-1.2195398999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f170e6e2b6e2d%3A0x6e2b6e2d6e2b6e2d!2sUnited%20States%20International%20University%20Africa!5e0!3m2!1sen!2ske!4v1718030000000!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="USIU-Africa Nairobi Location"
                className="rounded-xl"
              ></iframe>
            </div>
            
            <div className="mt-6 text-center">
              <div className="bg-gray-700 rounded-lg p-4 inline-block">
                <h4 className="font-bold text-lg mb-2">USIU-Africa Nairobi</h4>
                <p className="text-gray-300">Off Thika Road, Nairobi, Kenya</p>
                <p className="text-gray-300">P.O. Box 14634-00800</p>
                <p className="text-amber-500 font-semibold mt-2">+254 20 3606000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;