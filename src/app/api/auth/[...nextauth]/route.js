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
  debug: true,
  
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
          console.log('🔐 Credentials authorize called:', { 
            email: credentials?.email,
            hasPassword: !!credentials?.password 
          });
          
          if (!credentials?.email || !credentials?.password) {
            console.log('❌ Missing credentials');
            return null;
          }

          // Find user in mock database
          const user = mockUsers.find(
            u => u.email === credentials.email && u.password === credentials.password
          );

          if (user) {
            console.log('✅ User found:', { 
              id: user.id, 
              email: user.email, 
              role: user.role 
            });
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role
            };
          }

          console.log('❌ User not found for email:', credentials.email);
          return null;
        } catch (error) {
          console.error('💥 Credentials authorization error:', error);
          return null;
        }
      }
    }),

    // Google Provider
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
        console.log('🎫 JWT callback:', { 
          hasUser: !!user, 
          provider: account?.provider,
          userEmail: user?.email,
          tokenSub: token?.sub 
        });
        
        if (user) {
          token.role = user.role || 'user';
          if (account?.provider === 'google') {
            token.role = 'user';
          }
        }
        return token;
      } catch (error) {
        console.error('💥 JWT callback error:', error);
        return token;
      }
    },

    async session({ session, token }) {
      try {
        console.log('📋 Session callback:', { 
          hasSession: !!session, 
          hasToken: !!token,
          tokenSub: token?.sub,
          sessionEmail: session?.user?.email
        });
        
        if (token) {
          session.user.id = token.sub;
          session.user.role = token.role;
        }
        return session;
      } catch (error) {
        console.error('💥 Session callback error:', error);
        return session;
      }
    },

    async signIn({ user, account }) {
      try {
        console.log('🚪 SignIn callback:', { 
          provider: account?.provider, 
          userEmail: user?.email,
          accountType: account?.type 
        });

        if (account?.provider === 'credentials') {
          console.log('✅ Credentials login approved');
          return true;
        }
        
        if (account?.provider === 'google') {
          console.log('✅ Google OAuth login approved');
          return true;
        }
        
        console.log('❌ Unknown provider:', account?.provider);
        return false;
      } catch (error) {
        console.error('💥 SignIn callback error:', error);
        return false;
      }
    },

    async redirect({ url, baseUrl }) {
      try {
        console.log('🔄 Redirect callback:', { 
          url, 
          baseUrl,
          NEXTAUTH_URL: process.env.NEXTAUTH_URL,
          NODE_ENV: process.env.NODE_ENV
        });
        
        // Use NEXTAUTH_URL if available, otherwise use baseUrl
        const redirectBase = process.env.NEXTAUTH_URL || baseUrl;
        
        // If it's a relative URL, redirect to products
        if (url.startsWith('/')) {
          const redirectUrl = `${redirectBase}/products`;
          console.log('✅ Redirecting to:', redirectUrl);
          return redirectUrl;
        }
        
        // If it's the same origin, allow it
        if (url.startsWith(redirectBase)) {
          console.log('✅ Same origin redirect:', url);
          return url;
        }
        
        // Default redirect to products page
        const defaultUrl = `${redirectBase}/products`;
        console.log('✅ Default redirect to:', defaultUrl);
        return defaultUrl;
      } catch (error) {
        console.error('💥 Redirect callback error:', error);
        return `${baseUrl}/products`;
      }
    }
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Simplified cookie configuration
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
  },

  secret: process.env.NEXTAUTH_SECRET,

  events: {
    async error(message) {
      console.error('💥 NextAuth error event:', message);
    },
    async signIn(message) {
      console.log('✅ NextAuth signIn event:', message);
    },
    async signOut(message) {
      console.log('👋 NextAuth signOut event:', message);
    }
  },

  logger: {
    error(code, metadata) {
      console.error('💥 NextAuth error:', code, metadata);
    },
    warn(code) {
      console.warn('⚠️ NextAuth warning:', code);
    },
    debug(code, metadata) {
      console.log('🐛 NextAuth debug:', code, metadata);
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };