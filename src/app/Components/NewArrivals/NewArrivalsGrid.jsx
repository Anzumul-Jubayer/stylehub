'use client';

import { useState } from 'react';
import { useNewArrivals } from '@/hooks/useNewArrivals';
import NewArrivalCard from './NewArrivalCard';
import Pagination from '../Products/Pagination';
import FilterSidebar from './FilterSidebar';
import { motion } from 'framer-motion';
import { Sparkles, Filter, SortAsc, Grid3X3, List } from 'lucide-react';

const NewArrivalsGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { products, pagination, loading, error } = useNewArrivals(currentPage, 12);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
              <div className="h-80 bg-gray-300"></div>
              <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-6 bg-gray-300 rounded w-20"></div>
                  <div className="h-8 bg-gray-300 rounded w-24"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-red-800 mb-2">
              Error Loading New Arrivals
            </h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            New Arrivals
          </h1>
          {pagination && (
            <p className="text-gray-600">
              Showing {((pagination.currentPage - 1) * pagination.limit) + 1} - {Math.min(pagination.currentPage * pagination.limit, pagination.totalProducts)} of {pagination.totalProducts} new items
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Filter & Sort Buttons */}
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <SortAsc className="w-4 h-4" />
            <span className="hidden sm:inline">Sort</span>
          </button>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1 lg:grid-cols-2'
            }`}
          >
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <NewArrivalCard product={product} index={index} />
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="text-center py-16">
          <div className="bg-gray-50 rounded-2xl p-12 max-w-md mx-auto">
            <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No New Arrivals Yet
            </h3>
            <p className="text-gray-600">
              Check back soon for the latest fashion drops!
            </p>
          </div>
        </div>
      )}

      {/* Filter Sidebar */}
      <FilterSidebar 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
      />
    </div>
  );
};

export default NewArrivalsGrid;