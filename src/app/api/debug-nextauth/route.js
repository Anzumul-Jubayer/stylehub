import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check all NextAuth environment variables
    const envCheck = {
      timestamp: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV,
      
      // Environment variables status
      env: {
        NEXTAUTH_URL: {
          exists: !!process.env.NEXTAUTH_URL,
          value: process.env.NEXTAUTH_URL || 'NOT_SET',
          isCorrect: process.env.NEXTAUTH_URL?.trim() === 'https://stylehub-plmi.vercel.app'
        },
        NEXTAUTH_SECRET: {
          exists: !!process.env.NEXTAUTH_SECRET,
          length: process.env.NEXTAUTH_SECRET?.length || 0,
          isDefault: process.env.NEXTAUTH_SECRET === 'your-secret-key-here-change-in-production'
        },
        GOOGLE_CLIENT_ID: {
          exists: !!process.env.GOOGLE_CLIENT_ID,
          value: process.env.GOOGLE_CLIENT_ID ? 
            process.env.GOOGLE_CLIENT_ID.substring(0, 20) + '...' : 'NOT_SET'
        },
        GOOGLE_CLIENT_SECRET: {
          exists: !!process.env.GOOGLE_CLIENT_SECRET,
          value: process.env.GOOGLE_CLIENT_SECRET ? 
            process.env.GOOGLE_CLIENT_SECRET.substring(0, 10) + '...' : 'NOT_SET'
        }
      },
      
      // Configuration validation
      validation: {
        allEnvVarsSet: !!(
          process.env.NEXTAUTH_URL && 
          process.env.NEXTAUTH_SECRET && 
          process.env.GOOGLE_CLIENT_ID && 
          process.env.GOOGLE_CLIENT_SECRET
        ),
        nextAuthUrlCorrect: process.env.NEXTAUTH_URL?.trim() === 'https://stylehub-plmi.vercel.app',
        secretNotDefault: process.env.NEXTAUTH_SECRET !== 'your-secret-key-here-change-in-production',
        secretLongEnough: (process.env.NEXTAUTH_SECRET?.length || 0) >= 32
      },
      
      // Expected values
      expected: {
        NEXTAUTH_URL: 'https://stylehub-plmi.vercel.app',
        redirectURI: 'https://stylehub-plmi.vercel.app/api/auth/callback/google',
        googleConsoleOrigin: 'https://stylehub-plmi.vercel.app'
      }
    };

    return NextResponse.json(envCheck, { 
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to check environment',
      message: error.message 
    }, { status: 500 });
  }
}