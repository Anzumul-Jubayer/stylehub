'use client';

import { useSpecialOffers } from '@/hooks/useSpecialOffers';
import OfferCard from './OfferCard';
import { motion } from 'framer-motion';
import { Zap, Percent, Clock } from 'lucide-react';

const SpecialOffers = () => {
  const { offers, loading, error } = useSpecialOffers();

  if (error) {
    return null; // Gracefully hide the section if there's an error
  }

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full font-bold text-sm">
              <Zap className="w-4 h-4" />
              <span>SPECIAL OFFERS</span>
              <Zap className="w-4 h-4" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Limited Time
            </span>
            <br />
            <span className="text-white">Deals</span>
          </h2>
          
          <p className="text-gray-300 max-w-3xl mx-auto text-xl leading-relaxed">
            Don't miss out on these incredible savings! Our biggest discounts of the season 
            are here for a limited time only.
          </p>

          {/* Urgency Indicators */}
          <div className="flex items-center justify-center space-x-8 mt-8">
            <div className="flex items-center space-x-2 text-yellow-400">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Limited Time</span>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <Percent className="w-5 h-5" />
              <span className="font-semibold">Up to 50% Off</span>
            </div>
            <div className="flex items-center space-x-2 text-pink-400">
              <Zap className="w-5 h-5" />
              <span className="font-semibold">Flash Deals</span>
            </div>
          </div>
        </motion.div>

        {/* Offers Grid */}
        {loading ? (
          // Loading Skeleton
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-3xl h-96 animate-pulse">
                <div className="p-8 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="h-8 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-10 bg-gray-700 rounded w-2/3"></div>
                  </div>
                  <div className="h-12 bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer, index) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-2xl inline-flex items-center space-x-2 font-bold text-lg shadow-2xl">
            <Zap className="w-5 h-5" />
            <span>Hurry! These deals won't last long!</span>
            <Zap className="w-5 h-5" />
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 text-yellow-400 animate-bounce">
        <Percent className="w-8 h-8" />
      </div>
      <div className="absolute top-40 right-20 text-pink-400 animate-bounce delay-500">
        <Zap className="w-6 h-6" />
      </div>
      <div className="absolute bottom-20 left-20 text-purple-400 animate-bounce delay-1000">
        <Clock className="w-7 h-7" />
      </div>
    </section>
  );
};

export default SpecialOffers;