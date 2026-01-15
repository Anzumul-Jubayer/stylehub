"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 1,
    name: "Women's Collection",
    image: "https://plus.unsplash.com/premium_photo-1664202526475-8f43ee70166d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29tZW5zJTIwY2xvdGhpbmd8ZW58MHx8MHx8fDA%3D",
    gridClass: "md:col-span-2 md:row-span-2", 
    itemCount: "120+ Items"
  },
  {
    id: 2,
    name: "Men's Style",
    image: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?q=80&w=1000",
    gridClass: "md:col-span-1 md:row-span-1",
    itemCount: "85+ Items"
  },
  {
    id: 3,
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=1000",
    gridClass: "md:col-span-1 md:row-span-1",
    itemCount: "40+ Items"
  },
  {
    id: 4,
    name: "Kids Wear",
    image: "https://images.unsplash.com/photo-1673340979193-481dd0eb49c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2lkcyUyMHdlYXJ8ZW58MHx8MHx8fDA%3D",
    gridClass: "md:col-span-2 md:row-span-1",
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
            <p className="text-gray-500">Explore our latest curated collections</p>
          </div>
          <Link href="/shop" className="hidden md:block text-[#14B8A6] font-semibold hover:underline decoration-2 underline-offset-8">
            View All Categories →
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[700px]">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative group overflow-hidden rounded-3xl cursor-pointer ${cat.gridClass}`}
            >
              {/* Image with Zoom Effect */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="inline-block px-3 py-1 bg-[#14B8A6] text-white text-xs font-bold rounded-full mb-3 uppercase tracking-widest">
                  {cat.itemCount}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {cat.name}
                </h3>
                <button className="bg-white text-gray-900 px-6 py-2 rounded-full text-sm font-bold opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-[#4F46E5] hover:text-white">
                  Browse Shop
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;