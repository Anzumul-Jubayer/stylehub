import { NextResponse } from 'next/server';

export async function GET() {
  // Only allow this in development or with a specific debug key
  const isDev = process.env.NODE_ENV === 'development';
  const debugKey = process.env.DEBUG_KEY;
  
  if (!isDev && !debugKey) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }

  try {
    const envInfo = {
      NODE_ENV: process.env.NODE_ENV,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT SET',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET (length: ' + process.env.NEXTAUTH_SECRET.length + ')' : 'NOT SET',
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'SET (' + process.env.GOOGLE_CLIENT_ID.substring(0, 12) + '...)' : 'NOT SET',
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'SET (GOCSPX-...)' : 'NOT SET',
      VERCEL_URL: process.env.VERCEL_URL || 'NOT SET',
      VERCEL_ENV: process.env.VERCEL_ENV || 'NOT SET',
      timestamp: new Date().toISOString(),
      headers: {
        host: process.env.VERCEL_URL || 'localhost',
        origin: process.env.NEXTAUTH_URL || 'http://localhost:3000'
      }
    };

    return NextResponse.json(envInfo);
  } catch (error) {
    console.error('Debug env error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}