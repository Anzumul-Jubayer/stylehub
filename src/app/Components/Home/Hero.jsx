"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    id: 1,
    title: "Urban Summer Collection",
    subtitle: "NEW ARRIVALS",
    description: "Discover the latest trends in street fashion with our exclusive summer drop.",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070",
    buttonText: "Shop Now",
    accent: "text-[#14B8A6]" // Teal
  },
  {
    id: 2,
    title: "Minimalist Essentials",
    subtitle: "STYLE HUB EXCLUSIVE",
    description: "Premium quality basics designed for the modern lifestyle.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070",
    buttonText: "Explore Collection",
    accent: "text-[#E11D48]" // Rose
  }
];

const Hero = () => {
  return (
    <section className="relative w-full h-[85vh] bg-[#FAFAFA]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center">
              {/* Background Image with Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] scale-105"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/30" />
              </div>

              {/* Content Container */}
              <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
                <div className="max-w-2xl text-white">
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`text-sm md:text-base font-bold tracking-[0.2em] mb-4 ${slide.accent}`}
                  >
                    {slide.subtitle}
                  </motion.p>
                  
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-100 mb-8 max-w-lg"
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <button className="bg-[#4F46E5] hover:bg-[#E11D48] text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
                      {slide.buttonText}
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles for Swiper Pagination */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: white !important;
          width: 12px;
          height: 12px;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #4F46E5 !important;
          opacity: 1;
          width: 30px;
          border-radius: 6px;
        }
      `}</style>
    </section>
  );
};

export default Hero;
