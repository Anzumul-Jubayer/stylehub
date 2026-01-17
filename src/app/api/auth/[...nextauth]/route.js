import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

// Mock user database - in production, this would be in your database
const mockUsers = [
  {
    id: '1',
    email: 'admin@stylehub.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'user@stylehub.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user'
  }
];

// Ensure we have the correct base URL for production
const getBaseUrl = () => {
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }
  
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  return process.env.NODE_ENV === 'production' 
    ? 'https://stylehub-plmi.vercel.app' 
    : 'http://localhost:3000';
};

const baseUrl = getBaseUrl();
console.log('NextAuth Base URL:', baseUrl);

const authOptions = {
  debug: true, // Enable debug for production troubleshooting
  
  providers: [
    // Credentials Provider for mock login
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          console.log('Credentials authorize called:', { email: credentials?.email });
          
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials');
            return null;
          }

          // Find user in mock database
          const user = mockUsers.find(
            u => u.email === credentials.email && u.password === credentials.password
          );

          if (user) {
            console.log('User found:', { id: user.id, email: user.email, role: user.role });
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role
            };
          }

          console.log('User not found');
          return null;
        } catch (error) {
          console.error('Credentials authorization error:', error);
          return null;
        }
      }
    }),

    // Google Provider with explicit configuration
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],

  pages: {
    signIn: '/login',
    error: '/login'
  },

  callbacks: {
    async jwt({ token, user, account }) {
      try {
        console.log('JWT callback:', { 
          hasUser: !!user, 
          provider: account?.provider,
          tokenSub: token?.sub 
        });
        
        if (user) {
          token.role = user.role || 'user';
          // For Google OAuth users, set default role
          if (account?.provider === 'google') {
            token.role = 'user';
          }
        }
        return token;
      } catch (error) {
        console.error('JWT callback error:', error);
        return token;
      }
    },

    async session({ session, token }) {
      try {
        console.log('Session callback:', { 
          hasSession: !!session, 
          hasToken: !!token,
          tokenSub: token?.sub 
        });
        
        if (token) {
          session.user.id = token.sub;
          session.user.role = token.role;
        }
        return session;
      } catch (error) {
        console.error('Session callback error:', error);
        return session;
      }
    },

    async signIn({ user, account }) {
      try {
        console.log('SignIn callback:', { 
          provider: account?.provider, 
          userEmail: user?.email,
          accountType: account?.type 
        });

        // Allow all credential logins (handled by authorize function)
        if (account?.provider === 'credentials') {
          console.log('Credentials login successful');
          return true;
        }
        
        // Allow Google OAuth logins
        if (account?.provider === 'google') {
          console.log('Google OAuth login successful:', user?.email);
          return true;
        }
        
        console.log('Unknown provider:', account?.provider);
        return false;
      } catch (error) {
        console.error('SignIn callback error:', error);
        return false;
      }
    },

    async redirect({ url, baseUrl: callbackBaseUrl }) {
      try {
        console.log('Redirect callback:', { 
          url, 
          callbackBaseUrl, 
          configuredBaseUrl: baseUrl,
          NEXTAUTH_URL: process.env.NEXTAUTH_URL 
        });
        
        // Use our configured base URL
        const redirectBase = baseUrl;
        
        // If it's a relative URL, make it absolute and redirect to products
        if (url.startsWith('/')) {
          const redirectUrl = `${redirectBase}/products`;
          console.log('Redirecting to:', redirectUrl);
          return redirectUrl;
        }
        
        // If it's the same origin, allow it
        if (url.startsWith(redirectBase)) {
          console.log('Same origin redirect:', url);
          return url;
        }
        
        // Default redirect to products page
        const defaultUrl = `${redirectBase}/products`;
        console.log('Default redirect to:', defaultUrl);
        return defaultUrl;
      } catch (error) {
        console.error('Redirect callback error:', error);
        return `${baseUrl}/products`;
      }
    }
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' 
        ? '__Secure-next-auth.session-token'
        : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    callbackUrl: {
      name: process.env.NODE_ENV === 'production'
        ? '__Secure-next-auth.callback-url'
        : 'next-auth.callback-url',
      options: {
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      name: process.env.NODE_ENV === 'production'
        ? '__Host-next-auth.csrf-token'
        : 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },

  // Explicitly set the secret and base URL
  secret: process.env.NEXTAUTH_SECRET,
  
  // Force the base URL for production
  ...(process.env.NODE_ENV === 'production' && {
    url: baseUrl
  }),

  // Consolidated event handling with detailed logging
  events: {
    async error(message) {
      console.error('NextAuth error event:', message);
    },
    async signIn(message) {
      console.log('NextAuth signIn event:', message);
    },
    async signOut(message) {
      console.log('NextAuth signOut event:', message);
    },
    async createUser(message) {
      console.log('NextAuth createUser event:', message);
    },
    async session(message) {
      console.log('NextAuth session event:', message);
    }
  },

  // Enhanced logging for production debugging
  logger: {
    error(code, metadata) {
      console.error('NextAuth error:', code, metadata);
    },
    warn(code) {
      console.warn('NextAuth warning:', code);
    },
    debug(code, metadata) {
      console.log('NextAuth debug:', code, metadata);
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };