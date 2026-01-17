'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Globe, User, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { showToast } from '@/utils/toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if user was redirected here after signing out
    const isFromSignOut = searchParams.get('from') === 'signout' || 
                         document.referrer.includes('/dashboard') ||
                         sessionStorage.getItem('justSignedOut');

    if (isFromSignOut) {
      toast.success('You have been successfully signed out!', {
        duration: 3000,
        icon: '👋',
        style: {
          background: '#10B981',
          color: '#fff',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: '500',
        },
      });
      
      // Clear the flag so toast doesn&apos;t show again on page refresh
      sessionStorage.removeItem('justSignedOut');
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Show loading toast
    const loadingToast = showToast.loginLoading();

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        showToast.dismiss(loadingToast);
        showToast.loginError();
        setError('Invalid email or password');
      } else {
        showToast.dismiss(loadingToast);
        showToast.loginSuccess('there');
        // Set flag for products page to show welcome toast
        sessionStorage.setItem('justLoggedIn', 'true');
        // Successful login - redirect will be handled by NextAuth callback
        setTimeout(() => {
          router.push('/products');
        }, 1000);
      }
    } catch (error) {
      showToast.dismiss(loadingToast);
      showToast.loginError('An error occurred during login');
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    // Show loading toast
    const loadingToast = showToast.googleLoading();
    
    try {
      // Set flag for products page to show welcome toast
      sessionStorage.setItem('justLoggedIn', 'true');
      // For Google OAuth, we let NextAuth handle the redirect
      await signIn('google', {
        callbackUrl: '/products'
      });
      
      // Note: Success handling will be done on the products page
      // since Google OAuth redirects to a new page
      showToast.dismiss(loadingToast);
    } catch (error) {
      showToast.dismiss(loadingToast);
      showToast.googleError();
    }
  };

  const fillAdminCredentials = () => {
    setEmail('admin@stylehub.com');
    setPassword('admin123');
    showToast.credentialsFilled('Admin');
  };

  const fillUserCredentials = () => {
    setEmail('user@stylehub.com');
    setPassword('user123');
    showToast.credentialsFilled('User');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <div className="text-3xl font-bold text-white">
                STYLE<span className="text-purple-300">HUB</span>
              </div>
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300">Sign in to your account</p>
          </div>

          {/* Demo Credentials */}
          <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4 mb-6">
            <h3 className="text-sm font-semibold text-blue-200 mb-3">Demo Accounts:</h3>
            <div className="space-y-2">
              <button
                type="button"
                onClick={fillAdminCredentials}
                className="w-full flex items-center justify-between bg-blue-600/30 hover:bg-blue-600/50 rounded-lg p-3 transition-colors group"
              >
                <div className="text-left">
                  <div className="text-sm font-semibold text-blue-100">Admin Account</div>
                  <div className="text-xs text-blue-200 opacity-75">Full access with admin privileges</div>
                </div>
                <div className="flex items-center space-x-2 text-blue-200 group-hover:text-blue-100">
                  <UserCheck className="w-4 h-4" />
                  <span className="text-xs font-medium">Auto Fill</span>
                </div>
              </button>
              
              <button
                type="button"
                onClick={fillUserCredentials}
                className="w-full flex items-center justify-between bg-blue-600/30 hover:bg-blue-600/50 rounded-lg p-3 transition-colors group"
              >
                <div className="text-left">
                  <div className="text-sm font-semibold text-blue-100">User Account</div>
                  <div className="text-xs text-blue-200 opacity-75">Standard user with basic access</div>
                </div>
                <div className="flex items-center space-x-2 text-blue-200 group-hover:text-blue-100">
                  <User className="w-4 h-4" />
                  <span className="text-xs font-medium">Auto Fill</span>
                </div>
              </button>
            </div>
            
            <div className="mt-3 pt-3 border-t border-blue-400/20">
              <p className="text-xs text-blue-200 opacity-75 text-center">
                Click any button above to automatically fill login credentials
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-400/30 rounded-xl p-4 mb-6 flex items-center space-x-2"
            >
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-red-200 text-sm">{error}</span>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-sm text-gray-300">or</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white/10 border border-white/20 text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Globe className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-300 text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-purple-300 hover:text-purple-200 font-semibold transition-colors">
                Sign up
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-4">
            <Link href="/" className="text-gray-400 hover:text-gray-300 text-sm transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}