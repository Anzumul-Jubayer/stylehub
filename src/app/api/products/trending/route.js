import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db-connect';

export async function GET() {
  try {
    // Connect to products collection
    const productsCollection = dbConnect('products');

    // Fetch 4 trending products (you can modify this logic based on your criteria)
    // For now, we'll get the first 4 products, but you could sort by popularity, sales, etc.
    const trendingProducts = await productsCollection
      .find({})
      .limit(4)
      .toArray();

    return NextResponse.json({
      success: true,
      data: trendingProducts
    });

  } catch (error) {
    console.error('Error fetching trending products:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch trending products' 
      },
      { status: 500 }
    );
  }
}