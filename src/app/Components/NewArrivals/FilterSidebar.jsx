'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter, ChevronDown, ChevronUp } from 'lucide-react';

const FilterSidebar = ({ isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    brand: true,
    arrival: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const categories = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Accessories', 'Shoes'];
  const brands = ['StyleHub', 'Premium', 'Casual', 'Luxury', 'Street'];
  const arrivalPeriods = ['Today', 'This Week', 'This Month', 'Last 30 Days'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Filter Sections */}
            <div className="p-6 space-y-6">
              {/* Category Filter */}
              <div>
                <button
                  onClick={() => toggleSection('category')}
                  className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3"
                >
                  <span>Category</span>
                  {expandedSections.category ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedSections.category && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-2"
                    >
                      {categories.map((category) => (
                        <label key={category} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <span className="text-gray-700">{category}</span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Price Filter */}
              <div>
                <button
                  onClick={() => toggleSection('price')}
                  className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3"
                >
                  <span>Price Range</span>
                  {expandedSections.price ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedSections.price && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          placeholder="Min"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="number"
                          placeholder="Max"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Brand Filter */}
              <div>
                <button
                  onClick={() => toggleSection('brand')}
                  className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3"
                >
                  <span>Brand</span>
                  {expandedSections.brand ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedSections.brand && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-2"
                    >
                      {brands.map((brand) => (
                        <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <span className="text-gray-700">{brand}</span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Arrival Period Filter */}
              <div>
                <button
                  onClick={() => toggleSection('arrival')}
                  className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3"
                >
                  <span>Arrival Period</span>
                  {expandedSections.arrival ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedSections.arrival && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-2"
                    >
                      {arrivalPeriods.map((period) => (
                        <label key={period} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="arrivalPeriod"
                            className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                          />
                          <span className="text-gray-700">{period}</span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 space-y-3">
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                Apply Filters
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                Clear All
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterSidebar;