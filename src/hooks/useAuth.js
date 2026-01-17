import { useHybridAuth } from './useHybridAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useAuth = (redirectTo = '/login') => {
  const hybridAuth = useHybridAuth();
  const router = useRouter();

  useEffect(() => {
    if (hybridAuth.loading) return; // Still loading
    if (!hybridAuth.isAuthenticated) router.push(redirectTo); // Not authenticated
  }, [hybridAuth.isAuthenticated, hybridAuth.loading, router, redirectTo]);

  return {
    session: hybridAuth.session,
    status: hybridAuth.status,
    isAuthenticated: hybridAuth.isAuthenticated,
    isLoading: hybridAuth.loading,
    user: hybridAuth.user,
    isAdmin: hybridAuth.isAdmin,
    authProvider: hybridAuth.authProvider,
    signOut: hybridAuth.signOut
  };
};

export const useRequireAuth = (redirectTo = '/login') => {
  const auth = useAuth(redirectTo);
  
  if (auth.isLoading) {
    return { ...auth, loading: true };
  }
  
  if (!auth.isAuthenticated) {
    return { ...auth, loading: false, unauthorized: true };
  }
  
  return { ...auth, loading: false, unauthorized: false };
};