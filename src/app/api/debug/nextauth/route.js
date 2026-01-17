import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Comprehensive NextAuth environment debugging
    const debugInfo = {
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL_ENV: process.env.VERCEL_ENV || 'NOT_SET',
        VERCEL_URL: process.env.VERCEL_URL || 'NOT_SET',
      },
      nextauth: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT_SET',
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 
          `SET (${process.env.NEXTAUTH_SECRET.length} chars)` : 'NOT_SET',
        NEXTAUTH_SECRET_PREVIEW: process.env.NEXTAUTH_SECRET ? 
          process.env.NEXTAUTH_SECRET.substring(0, 8) + '...' : 'NOT_SET',
      },
      google: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 
          `SET (${process.env.GOOGLE_CLIENT_ID.substring(0, 12)}...)` : 'NOT_SET',
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 
          'SET (GOCSPX-...)' : 'NOT_SET',
      },
      computed: {
        expectedCallbackUrl: `${process.env.NEXTAUTH_URL || 'MISSING_NEXTAUTH_URL'}/api/auth/callback/credentials`,
        expectedGoogleCallback: `${process.env.NEXTAUTH_URL || 'MISSING_NEXTAUTH_URL'}/api/auth/callback/google`,
        isProduction: process.env.NODE_ENV === 'production',
        isVercel: !!process.env.VERCEL_URL,
      },
      headers: {
        host: process.env.VERCEL_URL || 'localhost',
        'x-forwarded-proto': 'https',
      },
      warnings: []
    };

    // Add warnings for common issues
    if (!process.env.NEXTAUTH_URL) {
      debugInfo.warnings.push('NEXTAUTH_URL is not set - this is required for production');
    }

    if (!process.env.NEXTAUTH_SECRET) {
      debugInfo.warnings.push('NEXTAUTH_SECRET is not set - this is required for production');
    } else if (process.env.NEXTAUTH_SECRET.length < 32) {
      debugInfo.warnings.push('NEXTAUTH_SECRET is too short - should be at least 32 characters');
    }

    if (process.env.NODE_ENV === 'production' && process.env.NEXTAUTH_URL?.includes('localhost')) {
      debugInfo.warnings.push('NEXTAUTH_URL contains localhost in production environment');
    }

    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      debugInfo.warnings.push('Google OAuth credentials are missing');
    }

    // Test credential validation
    const mockUsers = [
      { id: '1', email: 'admin@stylehub.com', password: 'admin123', name: 'Admin User', role: 'admin' },
      { id: '2', email: 'user@stylehub.com', password: 'user123', name: 'Regular User', role: 'user' }
    ];

    debugInfo.credentialTest = {
      mockUsersCount: mockUsers.length,
      testResults: [
        {
          email: 'admin@stylehub.com',
          password: 'admin123',
          valid: !!mockUsers.find(u => u.email === 'admin@stylehub.com' && u.password === 'admin123')
        },
        {
          email: 'user@stylehub.com', 
          password: 'user123',
          valid: !!mockUsers.find(u => u.email === 'user@stylehub.com' && u.password === 'user123')
        }
      ]
    };

    return NextResponse.json(debugInfo, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('NextAuth debug error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}