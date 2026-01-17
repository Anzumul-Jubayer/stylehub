'use client';

import { use } from 'react';
import { useProductDetails } from '@/hooks/useProductDetails';
import ProductDetails from '@/app/Components/ProductDetails/ProductDetails';
import ProductDetailsLoading from '@/app/Components/ProductDetails/ProductDetailsLoading';
import Link from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const { product, loading, error } = useProductDetails(resolvedParams.id);

  if (loading) {
    return <ProductDetailsLoading />;
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <ProductDetails product={product} />
    </main>
  );
}