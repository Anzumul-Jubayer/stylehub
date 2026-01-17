'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  LogOut, 
  Package, 
  TrendingUp,
  Star,
  Clock,
  Menu,
  X
} from 'lucide-react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Dashboard - Session status:', status);
      console.log('Dashboard - Session data:', session);
    }
    
    if (status === 'loading') return; // Still loading
    
    if (!session) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Dashboard - No session, redirecting to login');
      }
      // Add a small delay to ensure session loading is complete
      const timer = setTimeout(() => {
        router.push('/login');
      }, 100);
      return () => clearTimeout(timer);
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Dashboard - User authenticated:', session.user);
    }
  }, [session, status, router]);

  // Show loading state while session is being determined
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show loading state while redirecting
  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    const loadingToast = toast.loading('Signing you out...');
    
    try {
      // Set flag for login page to show sign out success toast
      sessionStorage.setItem('justSignedOut', 'true');
      
      // Sign out without automatic redirect
      await signOut({ redirect: false });
      
      toast.dismiss(loadingToast);
      
      // Try Next.js router first, fallback to window.location
      try {
        router.push('/login');
      } catch (routerError) {
        window.location.href = '/login';
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Error signing out');
      sessionStorage.removeItem('justSignedOut');
    }
  };

  const dashboardStats = [
    { label: 'Total Orders', value: '12', icon: Package, color: 'bg-blue-500' },
    { label: 'Wishlist Items', value: '8', icon: Heart, color: 'bg-red-500' },
    { label: 'Reviews', value: '5', icon: Star, color: 'bg-yellow-500' },
    { label: 'Account Age', value: '2mo', icon: Clock, color: 'bg-green-500' }
  ];

  const quickActions = [
    { label: 'Browse Products', href: '/products', icon: ShoppingBag, color: 'from-blue-500 to-blue-600' },
    { label: 'New Arrivals', href: '/new-arrivals', icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
    { label: 'My Wishlist', href: '/wishlist', icon: Heart, color: 'from-red-500 to-red-600' },
    ...(session?.user?.role === 'admin' ? [
      { label: 'Add New Item', href: '/add-item', icon: Package, color: 'from-green-500 to-green-600' }
    ] : []),
    { label: 'Account Settings', href: '/settings', icon: Settings, color: 'from-gray-500 to-gray-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tighter">
                <span className="text-purple-600 group-hover:text-purple-700 transition-colors duration-300">STYLE</span>
                <span className="text-gray-900">HUB</span>
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{session.user.name}</p>
                  <p className="text-xs text-gray-500">{session.user.email}</p>
                </div>
              </div>
              
              <button
                onClick={handleSignOut}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Sign Out</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden border-t border-gray-200 bg-white">
              <div className="px-4 py-4 space-y-3">
                <div className="flex items-center space-x-3 pb-3 border-b border-gray-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{session.user.name}</p>
                    <p className="text-xs text-gray-500">{session.user.email}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {session.user.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600">
            Here&apos;s what&apos;s happening with your StyleHub account today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {dashboardStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 ${stat.color} rounded-xl`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} href={action.href}>
                  <div className={`bg-gradient-to-r ${action.color} p-6 rounded-2xl text-white hover:scale-105 transition-transform cursor-pointer shadow-lg hover:shadow-xl`}>
                    <Icon className="w-8 h-8 mb-4" />
                    <h3 className="font-semibold text-lg">{action.label}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Viewed Canvas Slip-On Shoes</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Added Classic Polo Shirt to wishlist</p>
                <p className="text-sm text-gray-600">1 day ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Order #1234 delivered</p>
                <p className="text-sm text-gray-600">3 days ago</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}