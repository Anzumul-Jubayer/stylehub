import { NextResponse } from 'next/server';

export async function GET() {
  // Only show this in development or with a debug parameter
  const isDev = process.env.NODE_ENV === 'development';
  
  if (!isDev) {
    return NextResponse.json({ 
      message: 'Environment check',
      production: true,
      secretSet: !!process.env.NEXTAUTH_SECRET,
      secretLength: process.env.NEXTAUTH_SECRET?.length || 0,
      secretFirst10: process.env.NEXTAUTH_SECRET?.substring(0, 10) || 'NOT_SET',
      isDefault: process.env.NEXTAUTH_SECRET === 'your-secret-key-here-change-in-production',
      timestamp: new Date().toISOString()
    });
  }

  return NextResponse.json({
    NEXTAUTH_SECRET_SET: !!process.env.NEXTAUTH_SECRET,
    NEXTAUTH_SECRET_LENGTH: process.env.NEXTAUTH_SECRET?.length || 0,
    NEXTAUTH_SECRET_PREVIEW: process.env.NEXTAUTH_SECRET?.substring(0, 15) + '...' || 'NOT_SET',
    IS_DEFAULT: process.env.NEXTAUTH_SECRET === 'your-secret-key-here-change-in-production',
    timestamp: new Date().toISOString()
  });
}