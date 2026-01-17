import NewArrivalsHero from '@/app/Components/NewArrivals/NewArrivalsHero';
import NewArrivalsGrid from '@/app/Components/NewArrivals/NewArrivalsGrid';
import NewsletterSignup from '@/app/Components/NewArrivals/NewsletterSignup';

export const metadata = {
  title: 'New Arrivals - StyleHub',
  description: 'Discover the latest fashion trends and new arrivals at StyleHub. Fresh styles, trending pieces, and exclusive drops.',
};

export default function NewArrivalsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <NewArrivalsHero />
      <NewArrivalsGrid />
      <NewsletterSignup />
    </main>
  );
}