import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for API routes, static files, and public routes
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/' ||
    pathname === '/products' ||
    pathname === '/new-arrivals' ||
    pathname.startsWith('/products/')
  ) {
    return NextResponse.next();
  }

  // Check for NextAuth token
  const nextAuthToken = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  // Check for demo session in cookies (we'll set this client-side)
  const demoSession = request.cookies.get('stylehub_demo_auth');
  
  let isAuthenticated = false;
  let userRole = null;

  if (nextAuthToken) {
    isAuthenticated = true;
    userRole = nextAuthToken.role;
    if (process.env.NODE_ENV === 'development') {
      console.log('NextAuth authenticated:', { role: userRole, pathname });
    }
  } else if (demoSession) {
    try {
      // Handle URL-encoded cookie values
      const decodedValue = decodeURIComponent(demoSession.value);
      const sessionData = JSON.parse(decodedValue);
      const sessionExpiry = new Date(sessionData.expires);
      
      if (sessionExpiry > new Date()) {
        isAuthenticated = true;
        userRole = sessionData.user?.role;
        if (process.env.NODE_ENV === 'development') {
          console.log('Demo authenticated:', { role: userRole, pathname });
        }
      } else {
        // Session expired, clear the cookie
        const response = NextResponse.next();
        response.cookies.delete('stylehub_demo_auth');
        return response;
      }
    } catch (error) {
      console.error('Error parsing demo session:', error);
      // Clear invalid cookie
      const response = NextResponse.next();
      response.cookies.delete('stylehub_demo_auth');
      return response;
    }
  }

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect add-item route - admin only
  if (pathname.startsWith('/add-item')) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    if (userRole !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/orders/:path*',
    '/wishlist/:path*',
    '/add-item/:path*'
  ]
};