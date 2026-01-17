"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 1,
    name: "Women's Collection",
    image: "https://plus.unsplash.com/premium_photo-1664202526475-8f43ee70166d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29tZW5zJTIwY2xvdGhpbmd8ZW58MHx8MHx8fDA%3D",
    gridClass: "md:col-span-2 md:row-span-2", // Large Featured Card
    itemCount: "120+ Items"
  },
  {
    id: 2,
    name: "Men's Style",
    image: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?q=80&w=1000",
    gridClass: "md:col-span-2 md:row-span-1", // Horizontal Card
    itemCount: "85+ Items"
  },
  {
    id: 3, // ID re-ordered
    name: "Kids Wear",
    image: "https://images.unsplash.com/photo-1673340979193-481dd0eb49c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2lkcyUyMHdlYXJ8ZW58MHx8MHx8fDA%3D",
    gridClass: "md:col-span-2 md:row-span-1", // Horizontal Card
    itemCount: "60+ Items"
  }
];

const Categories = () => {
  return (
    <section className="py-20 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Shop by <span className="text-[#4F46E5]">Category</span>
            </h2>
            <p className="text-gray-500 text-lg">Curated essentials for every wardobe.</p>
          </div>
          <Link href="/products" className="hidden md:block text-[#14B8A6] font-semibold hover:underline decoration-2 underline-offset-8 transition-all">
            View All Categories →
          </Link>
        </div>

        {/* Updated Grid Logic for 3 Items */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[600px]">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative group overflow-hidden rounded-3xl cursor-pointer shadow-sm hover:shadow-2xl transition-shadow duration-500 ${cat.gridClass}`}
            >
              {/* Image with Zoom Effect */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full z-10">
                <span className="inline-block px-3 py-1 bg-[#14B8A6] text-white text-[10px] font-bold rounded-full mb-3 uppercase tracking-[0.2em]">
                  {cat.itemCount}
                </span>
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
                  {cat.name}
                </h3>
                <Link href="/products">
                  <button className="bg-white text-gray-900 px-8 py-2.5 rounded-full text-sm font-bold opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-[#4F46E5] hover:text-white">
                    Browse Shop
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;