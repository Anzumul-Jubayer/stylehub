'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Tag, Heart, ShoppingCart } from 'lucide-react';

const NewArrivalCard = ({ product, index }) => {
  const {
    _id,
    name,
    description,
    price,
    image,
    category,
    brand,
    badge,
    discount,
    arrivalDate,
    inStock = true
  } = product;

  const discountedPrice = discount ? price * (1 - discount / 100) : price;
  const daysAgo = Math.floor((new Date() - new Date(arrivalDate)) / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:-translate-y-2">
        {/* Product Image */}
        <div className="relative h-80 overflow-hidden">
          <Image
            src={image || '/placeholder-product.jpg'}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>{badge}</span>
            </span>
            
            {discount && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center space-x-1">
                <Tag className="w-3 h-3" />
                <span>{discount}% OFF</span>
              </span>
            )}
          </div>

          {/* Category Badge */}
          {category && (
            <div className="absolute top-4 right-4">
              <span className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                {category}
              </span>
            </div>
          )}

          {/* Arrival Time */}
          <div className="absolute bottom-4 left-4">
            <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{daysAgo === 0 ? 'Today' : `${daysAgo}d ago`}</span>
            </span>
          </div>

          {/* Quick Actions */}
          <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
              <Heart className="w-4 h-4 text-gray-700 hover:text-red-500" />
            </button>
            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
              <ShoppingCart className="w-4 h-4 text-gray-700 hover:text-blue-500" />
            </button>
          </div>

          {/* Out of Stock Overlay */}
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg bg-black/70 px-4 py-2 rounded-lg">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="mb-3">
            {brand && (
              <p className="text-sm text-purple-600 font-semibold mb-1">{brand}</p>
            )}
            <Link href={`/products/${_id}`}>
              <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-purple-600 transition-colors">
                {name}
              </h3>
            </Link>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  ${typeof discountedPrice === 'number' ? discountedPrice.toFixed(2) : discountedPrice}
                </span>
                {discount && (
                  <span className="text-lg text-gray-500 line-through">
                    ${typeof price === 'number' ? price.toFixed(2) : price}
                  </span>
                )}
              </div>
              {discount && (
                <span className="text-sm text-green-600 font-semibold">
                  Save ${(price - discountedPrice).toFixed(2)}
                </span>
              )}
            </div>

            <Link href={`/products/${_id}`}>
              <button
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  inStock
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!inStock}
              >
                {inStock ? 'View Details' : 'Unavailable'}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewArrivalCard;