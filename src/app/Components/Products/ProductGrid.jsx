'use client';

import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import LoadingSkeleton from './LoadingSkeleton';
import { motion } from 'framer-motion';

const ProductGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { products, pagination, loading, error } = useProducts(currentPage, 8);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Smooth scroll to top of products section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Error Loading Products
            </h3>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Our Products
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our curated collection of premium products, carefully selected for quality and style.
        </p>
        {pagination && (
          <p className="text-sm text-gray-500 mt-2">
            Showing {((pagination.currentPage - 1) * pagination.limit) + 1} - {Math.min(pagination.currentPage * pagination.limit, pagination.totalProducts)} of {pagination.totalProducts} products
          </p>
        )}
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
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
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-600">
              We couldn't find any products at the moment. Please check back later.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;