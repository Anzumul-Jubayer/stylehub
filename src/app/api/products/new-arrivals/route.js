import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db-connect';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;
    const skip = (page - 1) * limit;

    // Connect to products collection
    const productsCollection = dbConnect('products');

    // Get total count for pagination
    const totalProducts = await productsCollection.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    // Fetch new arrivals (for demo, we'll get products and simulate new arrivals)
    // In a real app, you'd filter by a "dateAdded" field or "isNewArrival" flag
    const newArrivals = await productsCollection
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    // Add simulated "new arrival" metadata
    const enhancedArrivals = newArrivals.map((product, index) => ({
      ...product,
      isNew: true,
      arrivalDate: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)), // Simulate different arrival dates
      badge: index < 3 ? 'Just Dropped' : index < 6 ? 'This Week' : 'New',
      discount: index % 3 === 0 ? 15 : index % 4 === 0 ? 20 : null // Some items have launch discounts
    }));

    return NextResponse.json({
      success: true,
      data: {
        products: enhancedArrivals,
        pagination: {
          currentPage: page,
          totalPages,
          totalProducts,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
          limit
        }
      }
    });

  } catch (error) {
    console.error('Error fetching new arrivals:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch new arrivals' 
      },
      { status: 500 }
    );
  }
}