'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Head from 'next/head';
import ProductGrid from '@/app/Components/Products/ProductGrid';
import { useHybridAuth } from '@/hooks/useHybridAuth';
import toast from 'react-hot-toast';

function ProductsContent() {
  const { session, user, isAuthenticated, authProvider } = useHybridAuth();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if user just logged in
    const isFromLogin = searchParams.get('from') === 'login' || 
                       document.referrer.includes('/login') ||
                       sessionStorage.getItem('justLoggedIn');

    const loginMode = sessionStorage.getItem('loginMode');

    if (isAuthenticated && isFromLogin) {
      const firstName = user?.name?.split(' ')[0] || 'there';
      let welcomeMessage = `Welcome back, ${firstName}! Browse our latest products.`;
      let icon = '🛍️';
      
      // Customize message based on authentication method
      if (authProvider === 'demo' || loginMode === 'demo') {
        welcomeMessage = `Welcome, ${firstName}! You're in demo mode. Browse our products!`;
        icon = '🎭';
      } else if (authProvider === 'nextauth' || loginMode === 'nextauth') {
        welcomeMessage = `Welcome back, ${firstName}! Browse our latest products.`;
        icon = '🛍️';
      }
      
      toast.success(welcomeMessage, {
        duration: 4000,
        icon: icon,
        style: {
          background: '#10B981',
          color: '#fff',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: '500',
        },
      });
      
      // Clear the flag so toast doesn't show again on page refresh
      sessionStorage.removeItem('justLoggedIn');
    }
  }, [session, status, searchParams]);

  return (
    <main className="min-h-screen bg-gray-50">
      <ProductGrid />
    </main>
  );
}

function LoadingFallback() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-600">Loading products...</div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <>
      <Head>
        <title>Products - StyleHub</title>
        <meta name="description" content="Browse our collection of premium products with modern design and quality craftsmanship." />
      </Head>
      <Suspense fallback={<LoadingFallback />}>
        <ProductsContent />
      </Suspense>
    </>
  );
}