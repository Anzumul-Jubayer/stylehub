import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// This is a placeholder page - you can expand this later
export default function ProductDetailPage({ params }) {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          href="/products"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>

        {/* Placeholder Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Product Detail Page
          </h1>
          <p className="text-gray-600 mb-6">
            Product ID: {params.id}
          </p>
          <p className="text-gray-500">
            This is a placeholder page. You can expand this to show detailed product information,
            images, reviews, and purchase options.
          </p>
          
          <div className="mt-8">
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function generateMetadata({ params }) {
  return {
    title: `Product ${params.id} - StyleHub`,
    description: 'Product details page for StyleHub clothing store.',
  };
}