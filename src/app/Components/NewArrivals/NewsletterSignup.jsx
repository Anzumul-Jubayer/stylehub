'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Bell, CheckCircle, Sparkles } from 'lucide-react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl p-12"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              You're All Set!
            </h3>
            <p className="text-gray-600 text-lg">
              Thanks for subscribing! You'll be the first to know about our latest arrivals.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl">
              <Bell className="w-8 h-8 text-white" />
            </div>
          </div>

          <h3 className="text-4xl font-bold text-white mb-4">
            Never Miss a Drop
          </h3>
          
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join over 50,000+ fashion lovers and be the first to discover our latest arrivals, 
            exclusive collections, and special offers.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white transition-all duration-200"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-2xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="text-sm text-gray-300 mt-6">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Early Access</h4>
              <p className="text-sm text-gray-300">Shop new arrivals before anyone else</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bell className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Instant Alerts</h4>
              <p className="text-sm text-gray-300">Get notified the moment items drop</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-pink-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Exclusive Offers</h4>
              <p className="text-sm text-gray-300">Subscriber-only discounts and deals</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSignup;