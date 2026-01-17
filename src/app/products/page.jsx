'use client';

import { useEffect, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Head from 'next/head';
import ProductGrid from '@/app/Components/Products/ProductGrid';
import toast from 'react-hot-toast';

function ProductsContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if user just logged in (from callback URL or direct navigation after login)
    const isFromLogin = searchParams.get('from') === 'login' || 
                       document.referrer.includes('/login') ||
                       sessionStorage.getItem('justLoggedIn');

    if (session && status === 'authenticated' && isFromLogin) {
      const firstName = session.user.name?.split(' ')[0] || 'there';
      toast.success(`Welcome back, ${firstName}! Browse our latest products.`, {
        duration: 4000,
        icon: '🛍️',
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