import ProductGrid from '@/app/Components/Products/ProductGrid';

export const metadata = {
  title: 'Products - StyleHub',
  description: 'Browse our collection of premium products with modern design and quality craftsmanship.',
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <ProductGrid />
    </main>
  );
}