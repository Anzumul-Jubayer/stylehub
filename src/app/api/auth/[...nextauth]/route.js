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

const authOptions = {
  debug: process.env.NODE_ENV === 'development',
  providers: [
    // Credentials Provider for mock login
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user in mock database
        const user = mockUsers.find(
          u => u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          };
        }

        return null;
      }
    }),

    // Google Provider with enhanced configuration
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
      if (user) {
        token.role = user.role || 'user';
        // For Google OAuth users, set default role
        if (account?.provider === 'google') {
          token.role = 'user';
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },

    async signIn({ user, account, profile }) {
      // Allow all credential logins (handled by authorize function)
      if (account?.provider === 'credentials') {
        return true;
      }
      
      // Allow Google OAuth logins
      if (account?.provider === 'google') {
        return true;
      }
      
      return false;
    },

    async redirect({ url, baseUrl }) {
      // Handle both development and production URLs
      const productionUrl = process.env.NEXTAUTH_URL || baseUrl;
      
      // If it's a relative URL, make it absolute
      if (url.startsWith('/')) {
        return `${productionUrl}/products`;
      }
      
      // If it's the same origin, allow it
      try {
        const urlObj = new URL(url);
        const baseUrlObj = new URL(productionUrl);
        if (urlObj.origin === baseUrlObj.origin) {
          return url;
        }
      } catch (error) {
        console.error('URL parsing error:', error);
      }
      
      // Default redirect to products page
      return `${productionUrl}/products`;
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

  // Enhanced security for production
  useSecureCookies: process.env.NODE_ENV === 'production',
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };