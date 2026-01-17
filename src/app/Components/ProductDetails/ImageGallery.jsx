'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Heart, Share2, Check } from 'lucide-react';

const ImageGallery = ({ images, productName, onWishlistToggle, isWishlisted, inStock }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // For demo purposes, we'll use the same image multiple times
  // In a real app, you'd have multiple product images
  const galleryImages = images || [
    { src: '/placeholder-product.jpg', alt: `${productName} view 1` },
    { src: '/placeholder-product.jpg', alt: `${productName} view 2` },
    { src: '/placeholder-product.jpg', alt: `${productName} view 3` },
    { src: '/placeholder-product.jpg', alt: `${productName} view 4` }
  ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 group">
          <Image
            src={galleryImages[selectedImage].src}
            alt={galleryImages[selectedImage].alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <ZoomIn className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={onWishlistToggle}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
            >
              <Heart 
                className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
              />
            </button>
            <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Stock Badge */}
          {inStock && (
            <div className="absolute bottom-4 left-4">
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                <Check className="w-3 h-3" />
                <span>In Stock</span>
              </span>
            </div>
          )}

          {/* Navigation Arrows */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {galleryImages.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {selectedImage + 1} / {galleryImages.length}
            </div>
          )}
        </div>

        {/* Thumbnail Images */}
        {galleryImages.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  selectedImage === index
                    ? 'border-purple-500 ring-2 ring-purple-200'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-square">
                <Image
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation in Modal */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image Counter in Modal */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
                {selectedImage + 1} / {galleryImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery;