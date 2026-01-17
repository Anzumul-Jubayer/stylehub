'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { UserPlus, ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
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
        {/* Register Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl text-center">
          {/* Header */}
          <div className="mb-8">
            <Link href="/" className="inline-block mb-6">
              <div className="text-3xl font-bold text-white">
                STYLE<span className="text-purple-300">HUB</span>
              </div>
            </Link>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Registration Coming Soon</h1>
            <p className="text-gray-300">
              We're working on the registration feature. For now, you can use the demo login credentials.
            </p>
          </div>

          {/* Demo Info */}
          <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-200 mb-4">Try Demo Login:</h3>
            <div className="text-sm text-blue-100 space-y-2">
              <div className="bg-blue-600/30 rounded-lg p-3">
                <div className="font-semibold">Admin Account</div>
                <div>admin@stylehub.com / admin123</div>
              </div>
              <div className="bg-blue-600/30 rounded-lg p-3">
                <div className="font-semibold">User Account</div>
                <div>user@stylehub.com / user123</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Link
              href="/login"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl inline-block"
            >
              Go to Login
            </Link>
            
            <Link
              href="/"
              className="w-full bg-white/10 border border-white/20 text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 inline-flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}