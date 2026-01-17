import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
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

export async function POST(request) {
  try {
    // Check authentication and admin role
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'description', 'price', 'category', 'brand', 'image', 'stock'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    // Connect to products collection
    const productsCollection = dbConnect('products');

    // Create new product object
    const newProduct = {
      name: body.name,
      description: body.description,
      price: parseFloat(body.price),
      category: body.category,
      brand: body.brand,
      image: body.image,
      stock: parseInt(body.stock),
      rating: parseFloat(body.rating) || 4.5,
      sizes: body.sizes || [],
      colors: body.colors || [],
      isNewArrival: body.isNewArrival || false,
      isTrending: body.isTrending || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert the new product
    const result = await productsCollection.insertOne(newProduct);

    if (result.insertedId) {
      // Return the created product with the new ID
      const createdProduct = {
        ...newProduct,
        _id: result.insertedId
      };

      return NextResponse.json({
        success: true,
        message: 'Product added successfully',
        data: createdProduct
      }, { status: 201 });
    } else {
      throw new Error('Failed to insert product');
    }

  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to add product',
        error: error.message 
      },
      { status: 500 }
    );
  }
}