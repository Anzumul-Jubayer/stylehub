import toast from 'react-hot-toast';

// Custom toast utility with predefined styles and messages
export const showToast = {
  // Authentication toasts
  loginSuccess: (name) => {
    return toast.success(`Welcome back, ${name}!`, {
      duration: 3000,
      icon: '👋',
      style: {
        background: '#10B981',
        color: '#fff',
        borderRadius: '12px',
        padding: '16px',
        fontSize: '14px',
        fontWeight: '500',
      },
    });
  },

  loginError: (message = 'Invalid email or password') => {
    return toast.error(message, {
      duration: 4000,
      icon: '❌',
      style: {
        background: '#EF4444',
        color: '#fff',
        borderRadius: '12px',
        padding: '16px',
        fontSize: '14px',
        fontWeight: '500',
      },
    });
  },

  loginLoading: () => {
    return toast.loading('Signing you in...', {
      style: {
        background: '#6366F1',
        color: '#fff',
        borderRadius: '12px',
        padding: '16px',
        fontSize: '14px',
        fontWeight: '500',
      },
    });
  },

  logoutSuccess: () => {
    return toast.success('Successfully signed out!', {
      duration: 3000,
      icon: '👋',
      style: {
        background: '#10B981',
        color: '#fff',
        borderRadius: '12px',
        padding: '16px',
        fontSize: '14px',
        fontWeight: '500',
      },
    });
  },

  logoutLoading: () => {
    return toast.loading('Signing you out...', {
      style: {
        background: '#6366F1',
        color: '#fff',
        borderRadius: '12px',
        padding: '16px',
        fontSize: '14px',
        fontWeight: '500',
      },
    });
  },

  // Credential auto-fill toasts
  credentialsFilled: (type) => {
    return toast.success(`${type} credentials filled!`, {
      duration: 2000,
      icon: '✨',
      style: {
        background: '#8B5CF6',
        color: '#fff',
        borderRadius: '12px',
        padding: '16px',
        fontSize: '14px',
        fontWeight: '500',
      },
    });
  },

  // Google OAuth toasts
  googleLoading: () => {
    return toast.loading('Connecting to Google...', {
      style: {
        background: '#4285F4',
        color: '#fff',
        borderRadius: '12px',
        padding: '16px',
        fontSize: '14px',
        fontWeight: '500',
      },
    });
  },

  googleSuccess: (name) => {
    return toast.success(`Welcome, ${name}!`, {
      duration: 3000,
      icon: '🎉',
      style: {
        background: '#4285F4',
        color: '#fff',
        borderRadius: '12px',
        padding: '16px',
        fontSize: '14px',
        fontWeight: '500',
      },
    });
  },

  googleError: () => {
    return toast.error('Google sign-in failed', {
      duration: 4000,
      icon: '❌',
      style: {
        background: '#EF4444',
        color: '#fff',
        borderRadius: '12px',
        padding: '16px',
        fontSize: '14px',
        fontWeight: '500',
      },
    });
  },

  // General utility toasts
  success: (message, options = {}) => {
    return toast.success(message, {
      duration: 3000,
      ...options,
    });
  },

  error: (message, options = {}) => {
    return toast.error(message, {
      duration: 4000,
      ...options,
    });
  },

  loading: (message, options = {}) => {
    return toast.loading(message, options);
  },

  dismiss: (toastId) => {
    return toast.dismiss(toastId);
  },

  dismissAll: () => {
    return toast.dismiss();
  }
};