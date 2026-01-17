'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, ArrowRight } from 'lucide-react';

const ProductCard = ({ product }) => {
  const {
    _id,
    name,
    description,
    price,
    image,
    category,
    brand,
    rating,
    inStock = true
  } = product;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Product Image */}
      <Link href={`/products/${_id}`} className="block">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={image || '/placeholder-product.jpg'}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {!inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          )}
          {category && (
            <div className="absolute top-3 left-3">
              <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                {category}
              </span>
            </div>
          )}
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-900 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Quick View</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <Link href={`/products/${_id}`}>
            <h3 className="font-semibold text-lg text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors cursor-pointer">
              {name}
            </h3>
          </Link>
          {brand && (
            <p className="text-sm text-gray-500 font-medium">{brand}</p>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">
              ${typeof price === 'number' ? price.toFixed(2) : price}
            </span>
            {rating && (
              <div className="flex items-center mt-1">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-current' : 'text-gray-300'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-1">({rating})</span>
              </div>
            )}
          </div>

          <Link href={`/products/${_id}`}>
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                inStock
                  ? 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!inStock}
            >
              <Eye className="w-4 h-4" />
              <span>{inStock ? 'View Details' : 'Unavailable'}</span>
              {inStock && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;