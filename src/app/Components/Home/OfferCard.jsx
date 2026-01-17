'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CountdownTimer from '../Common/CountdownTimer';
import { Clock, Tag, ArrowRight } from 'lucide-react';

const OfferCard = ({ offer, index }) => {
  const {
    id,
    title,
    subtitle,
    discount,
    discountType,
    originalPrice,
    salePrice,
    endDate,
    image,
    bgGradient,
    textColor
  } = offer;

  const savings = originalPrice - salePrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group cursor-pointer"
    >
      <div className={`relative bg-gradient-to-br ${bgGradient} rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
        </div>

        <div className="relative p-6 sm:p-8 h-full flex flex-col">
          {/* Discount Badge */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1 sm:py-2 border border-white/30">
              <div className="flex items-center space-x-1">
                <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-bold text-sm sm:text-lg">
                  {discount}% OFF
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={`${textColor} flex-1`}>
            <div className="mb-4 sm:mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">{title}</h3>
              <p className="text-base sm:text-lg opacity-90">{subtitle}</p>
            </div>

            {/* Pricing */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-baseline space-x-2 sm:space-x-3">
                <span className="text-3xl sm:text-4xl font-bold">${salePrice}</span>
                <span className="text-lg sm:text-xl line-through opacity-70">${originalPrice}</span>
              </div>
              <p className="text-xs sm:text-sm opacity-80 mt-1">
                Save ${savings.toFixed(2)}
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center mb-2 sm:mb-3">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <span className="text-xs sm:text-sm font-semibold opacity-90">Limited Time Offer</span>
              </div>
              <CountdownTimer endDate={endDate} />
            </div>

            {/* CTA Button */}
            <Link
              href="/products"
              className="inline-flex items-center justify-center w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 font-bold text-base sm:text-lg transition-all duration-300 group-hover:scale-105"
            >
              Shop Now
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Product Preview Images */}
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex -space-x-2">
          {offer.products?.slice(0, 3).map((product, idx) => (
            <div
              key={idx}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/50 overflow-hidden bg-white/20 backdrop-blur-sm"
            >
              <Image
                src={product.image || '/placeholder-product.jpg'}
                alt={product.name || 'Product'}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {offer.products?.length > 3 && (
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/50 bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-xs font-bold">+{offer.products.length - 3}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default OfferCard;