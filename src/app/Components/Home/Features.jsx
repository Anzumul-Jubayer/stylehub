"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, ArrowLeftRight, CreditCard } from 'lucide-react';

const features = [
  {
    id: 1,
    icon: <ShieldCheck size={32} />,
    title: "Premium Quality",
    description: "Crafted from the finest sustainable materials to ensure long-lasting comfort.",
    color: "text-[#4F46E5]", // Indigo
    bg: "bg-indigo-50"
  },
  {
    id: 2,
    icon: <Truck size={32} />,
    title: "Fast Delivery",
    description: "Enjoy free express shipping on all orders over $100, delivered to your door.",
    color: "text-[#14B8A6]", // Teal
    bg: "bg-teal-50"
  },
  {
    id: 3,
    icon: <ArrowLeftRight size={32} />,
    title: "Easy Returns",
    description: "Not the right fit? No problem. We offer a hassle-free 30-day return policy.",
    color: "text-[#E11D48]", // Rose
    bg: "bg-rose-50"
  },
  {
    id: 4,
    icon: <CreditCard size={32} />,
    title: "Secure Payment",
    description: "Your transactions are protected by industry-leading 256-bit SSL encryption.",
    color: "text-[#F59E0B]", // Warning/Gold
    bg: "bg-amber-50"
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Experience the <span className="text-[#4F46E5]">Style Hub</span> Edge
          </motion.h2>
          <p className="text-gray-500">
            We combine high-end fashion with seamless service to give you the best shopping experience possible.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl border border-gray-100 hover:border-[#4F46E5]/20 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 bg-white group"
            >
              <div className={`${feature.bg} ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;