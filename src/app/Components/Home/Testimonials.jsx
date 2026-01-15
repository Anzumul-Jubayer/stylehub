"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Verified Buyer",
    content: "The quality of the Urban Summer collection exceeded my expectations. The fabric is breathable and the fit is absolutely perfect!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Fashion Enthusiast",
    content: "Style Hub has become my go-to for minimalist essentials. Fast shipping and the packaging felt really premium. Highly recommend!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Verified Buyer",
    content: "I had to exchange a size and the process was so smooth. The customer support team is amazing. Love my new blazer!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 mb-4 bg-indigo-50 text-[#4F46E5] rounded-full text-xs font-bold tracking-widest uppercase"
          >
            Social Proof
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Loved by <span className="text-[#4F46E5]">Thousands</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 relative hover:shadow-xl transition-shadow duration-300"
            >
              {/* Quote Icon Background */}
              <Quote className="absolute top-6 right-8 text-gray-50" size={60} strokeWidth={1} />

              {/* Stars */}
              <div className="flex mb-4 gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#4F46E5] text-[#4F46E5]" />
                ))}
              </div>

              {/* Review Content */}
              <p className="text-gray-600 italic leading-relaxed mb-8 relative z-10">
                "{review.content}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <span className="text-xs font-semibold text-[#14B8A6] uppercase tracking-wider">
                    {review.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;