'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const DEMO_SESSION_KEY = 'stylehub_demo_session';

export const useHybridAuth = () => {
  const { data: nextAuthSession, status: nextAuthStatus } = useSession();
  const [demoSession, setDemoSession] = useState(null);
  // Determine loading state based on NextAuth status and demo session
  const loading = nextAuthStatus === 'loading' && demoSession === null;

  useEffect(() => {
    const checkDemoSession = () => {
      try {
        if (typeof window === 'undefined') return;
        
        const sessionData = localStorage.getItem(DEMO_SESSION_KEY);
        if (!sessionData) {
          setDemoSession(null);
          return;
        }

        const session = JSON.parse(sessionData);
        
        // Check if session is expired
        if (new Date(session.expires) < new Date()) {
          localStorage.removeItem(DEMO_SESSION_KEY);
          setDemoSession(null);
          return;
        }

        setDemoSession(session);
      } catch (error) {
        console.error('Error checking demo session:', error);
        setDemoSession(null);
      }
    };

    checkDemoSession();

    // Listen for storage changes (for multi-tab support)
    const handleStorageChange = (e) => {
      if (e.key === DEMO_SESSION_KEY) {
        checkDemoSession();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Determine which session to use (NextAuth takes priority)
  const activeSession = nextAuthSession || demoSession;
  const isAuthenticated = !!activeSession;
  const user = activeSession?.user;
  const isAdmin = user?.role === 'admin';
  const authProvider = nextAuthSession ? 'nextauth' : demoSession ? 'demo' : null;

  const signOut = () => {
    // Clear demo session
    if (demoSession) {
      localStorage.removeItem(DEMO_SESSION_KEY);
      // Clear demo auth cookie
      if (typeof document !== 'undefined') {
        document.cookie = 'stylehub_demo_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
      setDemoSession(null);
    }
    
    // NextAuth signOut will be handled by the component calling this hook
    return { provider: authProvider };
  };

  return {
    session: activeSession,
    user,
    loading,
    isAuthenticated,
    isAdmin,
    authProvider,
    signOut,
    // Compatibility with existing useAuth hook
    data: activeSession,
    status: loading ? 'loading' : isAuthenticated ? 'authenticated' : 'unauthenticated'
  };
};