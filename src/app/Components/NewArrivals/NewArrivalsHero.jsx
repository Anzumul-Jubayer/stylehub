'use client';

import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Clock, Star } from 'lucide-react';

const NewArrivalsHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8"
          >
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-semibold">Fresh Drops Weekly</span>
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              New
            </span>
            <br />
            <span className="text-white">Arrivals</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Be the first to discover our latest collection. Fresh styles, trending pieces, 
            and exclusive drops that define tomorrow's fashion.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-green-400 mr-2" />
                <span className="text-3xl font-bold text-white">50+</span>
              </div>
              <p className="text-gray-300">New Items This Week</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-6 h-6 text-blue-400 mr-2" />
                <span className="text-3xl font-bold text-white">24h</span>
              </div>
              <p className="text-gray-300">Fresh Daily Drops</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-yellow-400 mr-2" />
                <span className="text-3xl font-bold text-white">4.9</span>
              </div>
              <p className="text-gray-300">Customer Rating</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 text-purple-300 animate-bounce">
        <Sparkles className="w-6 h-6" />
      </div>
      <div className="absolute top-40 right-20 text-pink-300 animate-bounce delay-500">
        <Star className="w-5 h-5" />
      </div>
      <div className="absolute bottom-20 left-20 text-blue-300 animate-bounce delay-1000">
        <TrendingUp className="w-7 h-7" />
      </div>
    </section>
  );
};

export default NewArrivalsHero;