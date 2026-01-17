// Demo Authentication System
// This provides a fallback authentication system for demo purposes

import { useState, useEffect } from 'react';

const DEMO_USERS = [
  {
    id: '1',
    email: 'admin@stylehub.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    image: null
  },
  {
    id: '2',
    email: 'user@stylehub.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user',
    image: null
  }
];

const DEMO_SESSION_KEY = 'stylehub_demo_session';

export const demoAuth = {
  // Authenticate user with demo credentials
  async signIn(email, password) {
    try {
      const user = DEMO_USERS.find(
        u => u.email === email && u.password === password
      );

      if (user) {
        const session = {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image
          },
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
          provider: 'demo'
        };

        // Store session in localStorage for persistence
        localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(session));
        
        return { success: true, user: session.user };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Demo auth error:', error);
      return { success: false, error: 'Authentication failed' };
    }
  },

  // Get current demo session
  getSession() {
    try {
      if (typeof window === 'undefined') return null;
      
      const sessionData = localStorage.getItem(DEMO_SESSION_KEY);
      if (!sessionData) return null;

      const session = JSON.parse(sessionData);
      
      // Check if session is expired
      if (new Date(session.expires) < new Date()) {
        localStorage.removeItem(DEMO_SESSION_KEY);
        return null;
      }

      return session;
    } catch (error) {
      console.error('Error getting demo session:', error);
      return null;
    }
  },

  // Sign out demo user
  signOut() {
    try {
      localStorage.removeItem(DEMO_SESSION_KEY);
      return true;
    } catch (error) {
      console.error('Error signing out demo user:', error);
      return false;
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    return this.getSession() !== null;
  },

  // Check if user has specific role
  hasRole(role) {
    const session = this.getSession();
    return session?.user?.role === role;
  },

  // Check if user is admin
  isAdmin() {
    return this.hasRole('admin');
  }
};

// Hook for demo authentication
export const useDemoAuth = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = () => {
      const currentSession = demoAuth.getSession();
      setSession(currentSession);
      setLoading(false);
    };

    checkSession();

    // Listen for storage changes (for multi-tab support)
    const handleStorageChange = (e) => {
      if (e.key === DEMO_SESSION_KEY) {
        checkSession();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const signIn = async (email, password) => {
    const result = await demoAuth.signIn(email, password);
    if (result.success) {
      setSession(demoAuth.getSession());
    }
    return result;
  };

  const signOut = () => {
    demoAuth.signOut();
    setSession(null);
  };

  return {
    session,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!session,
    isAdmin: session?.user?.role === 'admin'
  };
};