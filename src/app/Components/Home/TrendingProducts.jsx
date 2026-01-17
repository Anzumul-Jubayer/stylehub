'use client';

import { useTrendingProducts } from '@/hooks/useTrendingProducts';
import TrendingProductCard from './TrendingProductCard';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';

const TrendingProducts = () => {
  const { products, loading, error } = useTrendingProducts();

  if (error) {
    return null; // Gracefully hide the section if there's an error
  }

  return (
    <section className="relative py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-pink-500 mr-2" />
            <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">
              What's Hot
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trending Products
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover the most popular items that everyone's talking about. 
            These handpicked favorites are flying off our shelves.
          </p>
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          // Loading Skeleton
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-64 sm:h-72 bg-gray-300"></div>
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <TrendingProductCard
                key={product._id}
                product={product}
                index={index}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View All Products
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        <div className="relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full opacity-30 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full opacity-30 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;