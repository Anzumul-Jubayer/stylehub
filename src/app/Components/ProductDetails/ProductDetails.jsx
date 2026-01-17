'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Truck, 
  Shield, 
  RotateCcw,
  Check,
  Plus,
  Minus,
  Star,
  Info
} from 'lucide-react';
import StarRating from '../Common/StarRating';
import RelatedProducts from './RelatedProducts';
import ImageGallery from './ImageGallery';

const ProductDetails = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, Math.min(prev + change, product.stockCount || 10)));
  };

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes?.length > 0) {
      alert('Please select a size');
      return;
    }
    // Add to cart logic here
    console.log('Added to cart:', { product, selectedSize, selectedColor, quantity });
  };

  const handleBuyNow = () => {
    if (!selectedSize && product.sizes?.length > 0) {
      alert('Please select a size');
      return;
    }
    // Buy now logic here
    console.log('Buy now:', { product, selectedSize, selectedColor, quantity });
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'details', label: 'Details' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-purple-600 transition-colors">Products</Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ImageGallery 
            images={[
              { src: product.image || '/placeholder-product.jpg', alt: product.name },
              { src: product.image || '/placeholder-product.jpg', alt: `${product.name} view 2` },
              { src: product.image || '/placeholder-product.jpg', alt: `${product.name} view 3` },
              { src: product.image || '/placeholder-product.jpg', alt: `${product.name} view 4` }
            ]}
            productName={product.name}
            onWishlistToggle={() => setIsWishlisted(!isWishlisted)}
            isWishlisted={isWishlisted}
            inStock={product.inStock}
          />
        </motion.div>

        {/* Product Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Header */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-purple-600 font-semibold text-sm">{product.brand}</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-600 text-sm">{product.category}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <StarRating rating={parseFloat(product.rating)} reviewCount={product.reviewCount} size="lg" />
          </div>

          {/* Price */}
          <div className="flex items-baseline space-x-3">
            <span className="text-4xl font-bold text-gray-900">
              ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Color</h3>
              <div className="flex items-center space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-xl border-2 transition-all duration-200 ${
                      selectedColor === color
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Size</h3>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-xl border-2 font-semibold transition-all duration-200 ${
                      selectedSize === size
                        ? 'border-purple-500 bg-purple-500 text-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-200 rounded-xl">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-3 hover:bg-gray-50 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-3 font-semibold">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-3 hover:bg-gray-50 transition-colors"
                  disabled={quantity >= (product.stockCount || 10)}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm text-gray-600">
                {product.stockCount} items available
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-white border-2 border-purple-500 text-purple-600 py-4 rounded-2xl font-bold text-lg hover:bg-purple-50 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
            <div className="text-center">
              <Truck className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-900">Free Shipping</p>
              <p className="text-xs text-gray-600">On orders over $50</p>
            </div>
            <div className="text-center">
              <RotateCcw className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-900">Easy Returns</p>
              <p className="text-xs text-gray-600">30-day policy</p>
            </div>
            <div className="text-center">
              <Shield className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-900">Secure Payment</p>
              <p className="text-xs text-gray-600">SSL protected</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Details Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16"
      >
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed">
                {product.description}
              </p>
              {product.features && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h4>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Brand</dt>
                    <dd className="font-semibold">{product.brand}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Category</dt>
                    <dd className="font-semibold">{product.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Material</dt>
                    <dd className="font-semibold">{product.material}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Available Sizes</dt>
                    <dd className="font-semibold">{product.sizes?.join(', ')}</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Care Instructions</h4>
                <p className="text-gray-700">{product.careInstructions}</p>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-semibold">Standard Shipping</p>
                      <p className="text-sm text-gray-600">{product.shipping?.estimatedDays}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RotateCcw className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-semibold">Returns</p>
                      <p className="text-sm text-gray-600">{product.shipping?.returnPolicy}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="text-center py-12">
              <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Reviews Coming Soon</h4>
              <p className="text-gray-600">Customer reviews will be displayed here.</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Related Products */}
      <RelatedProducts currentProductId={product._id} category={product.category} />
    </div>
  );
};

export default ProductDetails;