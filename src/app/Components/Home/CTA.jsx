"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative overflow-hidden rounded-[3rem] bg-[#E11D48]"
      >
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-[#4F46E5]/20 rounded-full blur-3xl" />

        <div className="relative z-10 px-8 py-16 md:py-24 text-center flex flex-col items-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white"
          >
            <ShoppingBag size={32} />
          </motion.div>

          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight"
          >
            Upgrade Your <span className="text-rose-200">Wardrobe</span> Today
          </motion.h2>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-rose-100 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
          >
            Join over 50,000+ stylish shoppers. Get exclusive access to new arrivals and limited edition drops.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/shop" 
              className="group bg-white text-[#E11D48] px-10 py-5 rounded-full font-bold text-xl inline-flex items-center gap-3 shadow-2xl hover:bg-[#4F46E5] hover:text-white transition-all duration-300"
            >
              Shop the Collection
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          <p className="mt-6 text-rose-200 text-sm font-medium">
            Free shipping on orders over $100 • 30-day easy returns
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;