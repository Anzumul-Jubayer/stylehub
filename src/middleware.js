import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user is authenticated for protected routes
        const { pathname } = req.nextUrl;
        
        // Protect dashboard and other authenticated routes
        if (pathname.startsWith('/dashboard')) {
          return !!token;
        }
        
        // Protect add-item route - admin only
        if (pathname.startsWith('/add-item')) {
          return !!token && token.role === 'admin';
        }
        
        // Allow access to other routes
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/orders/:path*',
    '/wishlist/:path*',
    '/add-item/:path*'
  ]
};