import { NextResponse } from 'next/server';

export async function GET() {
  // Only allow in development or with a special debug key
  const isDev = process.env.NODE_ENV === 'development';
  
  if (!isDev) {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  const envCheck = {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ? '✅ Set' : '❌ Missing',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ Missing',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Missing',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? '✅ Set' : '❌ Missing',
    NODE_ENV: process.env.NODE_ENV,
    // Show partial values for debugging (first 10 chars)
    NEXTAUTH_URL_VALUE: process.env.NEXTAUTH_URL ? 
      process.env.NEXTAUTH_URL.substring(0, 30) + '...' : 'Not set',
    GOOGLE_CLIENT_ID_VALUE: process.env.GOOGLE_CLIENT_ID ? 
      process.env.GOOGLE_CLIENT_ID.substring(0, 20) + '...' : 'Not set'
  };

  return NextResponse.json(envCheck);
}