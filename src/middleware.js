import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
    if (process.env.NODE_ENV === 'development') {
      console.log('Middleware running for:', req.nextUrl.pathname);
      console.log('Token exists:', !!req.nextauth.token);
      if (req.nextauth.token) {
        console.log('User role:', req.nextauth.token.role);
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user is authenticated for protected routes
        const { pathname } = req.nextUrl;
        
        if (process.env.NODE_ENV === 'development') {
          console.log('Authorization check for:', pathname);
          console.log('Token exists:', !!token);
          if (token) {
            console.log('Token role:', token.role);
          }
        }
        
        // Protect dashboard and other authenticated routes
        if (pathname.startsWith('/dashboard')) {
          const isAuthorized = !!token;
          if (process.env.NODE_ENV === 'development') {
            console.log('Dashboard access authorized:', isAuthorized);
          }
          return isAuthorized;
        }
        
        // Protect add-item route - admin only
        if (pathname.startsWith('/add-item')) {
          const isAuthorized = !!token && token.role === 'admin';
          if (process.env.NODE_ENV === 'development') {
            console.log('Add-item access authorized:', isAuthorized);
          }
          return isAuthorized;
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