import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useAuth = (redirectTo = '/login') => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (!session) router.push(redirectTo); // Not authenticated
  }, [session, status, router, redirectTo]);

  return {
    session,
    status,
    isAuthenticated: !!session,
    isLoading: status === 'loading',
    user: session?.user
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