import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db-connect';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 8;
    const skip = (page - 1) * limit;

    // Connect to products collection
    const productsCollection = dbConnect('products');

    // Get total count for pagination
    const totalProducts = await productsCollection.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    // Fetch products with pagination
    const products = await productsCollection
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      success: true,
      data: {
        products,
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
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch products' 
      },
      { status: 500 }
    );
  }
}