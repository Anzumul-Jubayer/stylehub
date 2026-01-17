'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const TrendingProductCard = ({ product, index }) => {
  const { _id, name, price, image, category } = product;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <Link href={`/products/${_id}`} className="block">
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:-translate-y-2">
          {/* Product Image */}
          <div className="relative h-64 sm:h-72 overflow-hidden">
            <Image
              src={image || '/placeholder-product.jpg'}
              alt={name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            
            {/* Trending Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center space-x-1">
                <TrendingUp className="w-3 h-3" />
                <span>Trending</span>
              </span>
            </div>

            {/* Category Badge */}
            {category && (
              <div className="absolute top-4 right-4">
                <span className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                  {category}
                </span>
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-900 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                View Details
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
              {name}
            </h3>
            
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                ${typeof price === 'number' ? price.toFixed(2) : price}
              </span>
              
              <div className="flex items-center space-x-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default TrendingProductCard;