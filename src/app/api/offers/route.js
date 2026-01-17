import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db-connect';

export async function GET() {
  try {
    // Connect to products collection
    const productsCollection = await dbConnect('products');

    // Fetch products for special offers (you can modify this logic)
    // For now, we'll get some products and simulate discount data
    const offerProducts = await productsCollection
      .find({})
      .limit(6)
      .toArray();

    // Simulate special offers data
    const specialOffers = [
      {
        id: 'summer-sale',
        title: 'Summer Collection',
        subtitle: 'Hot Weather, Cool Prices',
        discount: '30',
        discountType: 'percentage',
        originalPrice: 89.99,
        salePrice: 62.99,
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        image: offerProducts[0]?.image || '/placeholder-product.jpg',
        products: offerProducts.slice(0, 3),
        bgGradient: 'from-orange-400 to-pink-500',
        textColor: 'text-white'
      },
      {
        id: 'flash-deal',
        title: 'Flash Deal',
        subtitle: '24 Hours Only',
        discount: '50',
        discountType: 'percentage',
        originalPrice: 129.99,
        salePrice: 64.99,
        endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        image: offerProducts[1]?.image || '/placeholder-product.jpg',
        products: offerProducts.slice(1, 4),
        bgGradient: 'from-purple-500 to-indigo-600',
        textColor: 'text-white'
      },
      {
        id: 'new-arrivals',
        title: 'New Arrivals',
        subtitle: 'Fresh Styles Just In',
        discount: '20',
        discountType: 'percentage',
        originalPrice: 79.99,
        salePrice: 63.99,
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        image: offerProducts[2]?.image || '/placeholder-product.jpg',
        products: offerProducts.slice(2, 5),
        bgGradient: 'from-emerald-400 to-cyan-500',
        textColor: 'text-white'
      }
    ];

    return NextResponse.json({
      success: true,
      data: specialOffers
    });

  } catch (error) {
    console.error('Error fetching special offers:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch special offers' 
      },
      { status: 500 }
    );
  }
}