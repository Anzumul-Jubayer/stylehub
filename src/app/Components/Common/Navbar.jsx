"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Menu, X, ShoppingBag, Home, Package, Sparkles, User, UserPlus, LogOut, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { useHybridAuth } from '@/hooks/useHybridAuth';

// Loading Spinner Component
const LoadingSpinner = ({ size = 'w-6 h-6', className = '' }) => (
  <div className={`${size} ${className}`}>
    <div className="relative">
      <div className="w-full h-full border-2 border-gray-200 rounded-full"></div>
      <div className="absolute top-0 left-0 w-full h-full border-2 border-[#4F46E5] border-t-transparent rounded-full animate-spin"></div>
    </div>
  </div>
);

// Auth Buttons Component for Desktop
const AuthButtons = ({ isSigningOut }) => {
  if (isSigningOut) {
    return (
      <div className="flex items-center space-x-3">
        <LoadingSpinner size="w-6 h-6" />
        <span className="text-sm font-medium text-gray-600">Signing out...</span>
      </div>
    );
  }

  return (
    <>
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
    </>
  );
};

// Auth Buttons Component for Mobile
const MobileAuthButtons = ({ isSigningOut, setIsOpen }) => {
  if (isSigningOut) {
    return (
      <div className="flex items-center justify-center space-x-3 py-4">
        <LoadingSpinner size="w-6 h-6" />
        <span className="text-sm font-medium text-gray-600">Signing out...</span>
      </div>
    );
  }

  return (
    <>
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
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, authProvider, signOut: hybridSignOut } = useHybridAuth();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleSignOut = async () => {
    setIsUserDropdownOpen(false);
    setIsSigningOut(true);
    
    const loadingToast = toast.loading('Signing you out...');
    
    try {
      // Set flag for login page to show sign out success toast
      sessionStorage.setItem('justSignedOut', 'true');
      
      // Handle sign out based on authentication provider
      if (authProvider === 'nextauth') {
        // Sign out from NextAuth without automatic redirect
        await signOut({ redirect: false });
      } else if (authProvider === 'demo') {
        // Sign out from demo authentication
        hybridSignOut();
      }
      
      toast.dismiss(loadingToast);
      
      // Keep the loading state for 2.5 seconds to show spinner
      setTimeout(() => {
        setIsSigningOut(false);
        
        // Try Next.js router first, fallback to window.location
        try {
          router.push('/login');
        } catch (routerError) {
          window.location.href = '/login';
        }
      }, 2500);
      
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Error signing out');
      sessionStorage.removeItem('justSignedOut');
      setIsSigningOut(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
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
          <div className="hidden lg:flex space-x-1 items-center">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = isActiveRoute(link.href);
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#4F46E5] text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#4F46E5]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Tablet Navigation - Icon Only */}
          <div className="hidden md:flex lg:hidden space-x-1 items-center">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = isActiveRoute(link.href);
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center justify-center p-3 rounded-xl text-sm font-semibold transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-[#4F46E5] text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#4F46E5]'
                  }`}
                  title={link.name}
                >
                  <Icon className="w-5 h-5" />
                  {/* Tooltip */}
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons (Desktop & Tablet) */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {getInitials(user?.name)}
                  </div>
                  <span className="hidden xl:block">{user?.name?.split(' ')[0] || 'User'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {getInitials(user?.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {user?.name || 'User'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user?.email}
                          </p>
                          {user?.role && (
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                              {user.role}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <User className="w-4 h-4 mr-3" />
                        Dashboard
                      </Link>
                      
                      {user?.role === 'admin' && (
                        <Link
                          href="/add-item"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <UserPlus className="w-4 h-4 mr-3" />
                          Add Item
                        </Link>
                      )}
                      
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <AuthButtons isSigningOut={isSigningOut} />
            )}
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
            {isAuthenticated ? (
              <>
                {/* User Info Mobile */}
                <div className="px-4 py-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {getInitials(user?.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                      {user?.role && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                          {user.role}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <Link 
                  href="/dashboard" 
                  className="flex items-center justify-center space-x-2 py-3 font-semibold text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                
                {user?.role === 'admin' && (
                  <Link 
                    href="/add-item" 
                    className="flex items-center justify-center space-x-2 py-3 font-semibold text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Add Item</span>
                  </Link>
                )}
                
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    handleSignOut();
                  }}
                  className="flex items-center justify-center space-x-2 py-3 font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <MobileAuthButtons isSigningOut={isSigningOut} setIsOpen={setIsOpen} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;