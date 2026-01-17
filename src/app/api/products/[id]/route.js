import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db-connect';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    console.log('Fetching product with ID:', id);

    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      console.log('Invalid ObjectId format:', id);
      return NextResponse.json(
        { success: false, error: 'Invalid product ID format' },
        { status: 400 }
      );
    }

    // Connect to products collection
    const productsCollection = dbConnect('products');

    // Fetch the specific product
    const product = await productsCollection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      console.log('Product not found for ID:', id);
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    console.log('Product found:', product.name);

    // Enhance product with additional details for the detail page
    const enhancedProduct = {
      ...product,
      // Add simulated additional data that might not be in your current database
      brand: product.brand || 'StyleHub',
      category: product.category || 'Fashion',
      rating: product.rating || (4 + Math.random()).toFixed(1), // Random rating between 4.0-5.0
      reviewCount: product.reviewCount || Math.floor(Math.random() * 500) + 50,
      inStock: product.inStock !== false, // Default to true if not specified
      stockCount: product.stockCount || Math.floor(Math.random() * 50) + 10,
      sizes: product.sizes || ['S', 'M', 'L', 'XL'], // Default sizes if not specified
      colors: product.colors || ['Black', 'White', 'Gray'],
      material: product.material || 'Premium Cotton Blend',
      careInstructions: product.careInstructions || 'Machine wash cold, tumble dry low',
      features: product.features || [
        'Premium quality materials',
        'Comfortable fit',
        'Durable construction',
        'Easy care'
      ],
      shipping: {
        freeShipping: product.price > 50,
        estimatedDays: '3-5 business days',
        returnPolicy: '30-day free returns'
      }
    };

    return NextResponse.json({
      success: true,
      data: enhancedProduct
    });

  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch product details' 
      },
      { status: 500 }
    );
  }
}