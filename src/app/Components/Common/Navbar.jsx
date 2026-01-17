"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag, Home, Package, Sparkles, User, UserPlus } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'New Arrivals', href: '/new-arrivals', icon: Sparkles },
  ];

  const isActiveRoute = (href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tighter">
                <span className="text-[#4F46E5] group-hover:text-[#7C3AED] transition-colors duration-300">STYLE</span>
                <span className="text-gray-900">HUB</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 items-center">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = isActiveRoute(link.href);
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#4F46E5] text-white shadow-lg shadow-indigo-200'
                      : 'text-gray-600 hover:text-[#4F46E5] hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            <Link 
              href="/login" 
              className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#14B8A6] hover:bg-gray-50 rounded-xl transition-all duration-200"
            >
              <User className="w-4 h-4" />
              <span>Log in</span>
            </Link>
            <Link
              href="/register"
              className="flex items-center space-x-2 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-[#4338CA] hover:to-[#6D28D9] transition-all duration-300 shadow-lg shadow-indigo-200 hover:shadow-indigo-300"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl focus:outline-none transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen 
          ? 'max-h-screen opacity-100 visible' 
          : 'max-h-0 opacity-0 invisible'
      } bg-white/95 backdrop-blur-md border-t border-gray-100 overflow-hidden`}>
        <div className="px-4 pt-4 pb-6 space-y-2">
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            const isActive = isActiveRoute(link.href);
            
            return (
              <div
                key={link.name}
                className={`transform transition-all duration-300 ${
                  isOpen 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Link
                  href={link.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#4F46E5] text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#4F46E5]'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              </div>
            );
          })}
          
          <div className={`pt-4 flex flex-col space-y-3 transform transition-all duration-300 ${
            isOpen 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: '300ms' }}
          >
            <Link 
              href="/login" 
              className="flex items-center justify-center space-x-2 py-3 font-semibold text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <User className="w-4 h-4" />
              <span>Log in</span>
            </Link>
            <Link 
              href="/register" 
              className="flex items-center justify-center space-x-2 py-3 font-semibold text-white bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-xl hover:from-[#4338CA] hover:to-[#6D28D9] transition-all duration-200 shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              <UserPlus className="w-4 h-4" />
              <span>Register</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;