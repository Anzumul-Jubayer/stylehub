'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function OAuthErrorHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    
    if (error) {
      console.error('OAuth Error:', error);
      
      let errorMessage = 'Authentication failed. Please try again.';
      
      switch (error) {
        case 'Configuration':
          errorMessage = 'OAuth configuration error. Please contact support.';
          break;
        case 'AccessDenied':
          errorMessage = 'Access denied. Please grant necessary permissions.';
          break;
        case 'Verification':
          errorMessage = 'Email verification required. Please verify your email.';
          break;
        case 'OAuthCallback':
          errorMessage = 'OAuth callback error. Please check your configuration.';
          break;
        case 'OAuthSignin':
          errorMessage = 'OAuth sign-in error. Please try again.';
          break;
        case 'OAuthCreateAccount':
          errorMessage = 'Failed to create account. Please try again.';
          break;
        case 'EmailCreateAccount':
          errorMessage = 'Failed to create account with email. Please try again.';
          break;
        case 'Callback':
          errorMessage = 'Callback error. Please check your configuration.';
          break;
        case 'OAuthAccountNotLinked':
          errorMessage = 'Account not linked. Please use the same email address.';
          break;
        case 'EmailSignin':
          errorMessage = 'Email sign-in error. Please check your email.';
          break;
        case 'CredentialsSignin':
          errorMessage = 'Invalid credentials. Please check your email and password.';
          break;
        case 'SessionRequired':
          errorMessage = 'Session required. Please sign in.';
          break;
        default:
          errorMessage = `Authentication error: ${error}`;
      }
      
      toast.error(errorMessage, {
        duration: 6000,
        style: {
          background: '#EF4444',
          color: '#fff',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: '500',
        },
      });
    }
  }, [searchParams]);

  return null; // This component doesn't render anything
}