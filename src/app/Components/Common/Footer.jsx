import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAFAFA] border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
       {/* TOP SECTION: BRAND & NEWSLETTER */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
  <div className="lg:col-span-1">
    <Link href="/" className="flex items-center gap-3 mb-6 group">
      {/* Premium Logo Container */}
      <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-gray-200 shadow-sm transition-transform duration-500 group-hover:scale-110">
        <Image 
          src="/logo.jpg" 
          alt="Style Hub Logo" 
          fill
          className="object-cover"
        />
      </div>
      
      {/* Refined Brand Text */}
      <div className="flex flex-col justify-center">
        <span className="text-2xl font-black leading-none tracking-tighter text-gray-900">
          STYLE<span className="text-primary italic">HUB</span>
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mt-1">
          Premium Apparel
        </span>
      </div>
    </Link>

    <p className="text-gray-500 max-w-sm leading-relaxed mb-6 text-sm">
      Elevating your everyday wardrobe with premium pieces designed for modern life. Join our journey in sustainable fashion.
    </p>

    {/* Social Links */}
    <div className="flex gap-4">
      {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
        <a 
          key={index} 
          href="#" 
          className="p-2.5 bg-white rounded-full border border-gray-100 text-gray-400 hover:text-primary hover:border-primary/30 hover:shadow-lg hover:shadow-indigo-50 transition-all"
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  </div>

  {/* Newsletter Card remains the same but with slightly updated padding */}
  <div className="lg:col-span-2 bg-white rounded-[2rem] p-10 shadow-sm border border-indigo-50 flex flex-col md:flex-row items-center justify-between gap-8">
    <div className="max-w-xs text-center md:text-left">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Join the Style Club</h3>
      <p className="text-gray-500 text-sm">Be the first to know about new drops and exclusive member-only sales.</p>
    </div>
    <div className="relative w-full md:w-auto min-w-[320px]">
      <input 
        type="email" 
        placeholder="Enter your email" 
        className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
      />
      <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 active:scale-95">
        <ArrowRight size={20} />
      </button>
    </div>
  </div>
</div>

        {/* MIDDLE SECTION: LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 border-b border-gray-100 pb-16">
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-900 mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/shop" className="hover:text-primary transition-colors">Men's Collection</Link></li>
              <li><Link href="/shop" className="hover:text-primary transition-colors">Women's Collection</Link></li>
              <li><Link href="/shop" className="hover:text-primary transition-colors">Accessories</Link></li>
              <li><Link href="/shop" className="hover:text-accent font-medium transition-colors">Sale & Offers</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Journal</Link></li>
              <li><Link href="/stores" className="hover:text-primary transition-colors">Store Locator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-900 mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/faq" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/tracking" className="hover:text-primary transition-colors">Order Tracking</Link></li>
              <li><Link href="/size-guide" className="hover:text-primary transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-900 mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-center gap-3"><MapPin size={16} className="text-primary"/> 123 Fashion Ave, NY</li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-primary"/> +1 (234) 567-890</li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-primary"/> hello@stylehub.com</li>
            </ul>
          </div>
        </div>

        {/* BOTTOM SECTION: COPYRIGHT */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-400 uppercase tracking-widest">
          <p>© {currentYear} STYLE HUB. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
          </div>
          <div className="flex items-center gap-4 grayscale opacity-60">
             {/* Payment Icons Placeholder */}
             <div className="w-8 h-5 bg-gray-200 rounded-sm"></div>
             <div className="w-8 h-5 bg-gray-200 rounded-sm"></div>
             <div className="w-8 h-5 bg-gray-200 rounded-sm"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;