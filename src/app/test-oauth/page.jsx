'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function TestOAuth() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { timestamp, message, type }]);
    console.log(`[${timestamp}] ${message}`);
  };

  useEffect(() => {
    addLog('Test OAuth page loaded');
    addLog(`Session status: ${status}`);
    if (session) {
      addLog(`User: ${session.user?.name} (${session.user?.email})`);
    }
  }, [session, status]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    addLog('Initiating Google OAuth sign-in...', 'info');
    
    try {
      // Test environment variables
      addLog('Checking environment configuration...', 'info');
      
      const result = await signIn('google', {
        callbackUrl: '/products',
        redirect: false
      });
      
      addLog(`Sign in result: ${JSON.stringify(result)}`, 'info');
      
      if (result?.error) {
        addLog(`Sign in error: ${result.error}`, 'error');
        alert(`Sign in failed: ${result.error}`);
      } else if (result?.url) {
        addLog(`Redirecting to: ${result.url}`, 'success');
        window.location.href = result.url;
      } else {
        addLog('No result URL, trying direct sign-in...', 'warning');
        await signIn('google', {
          callbackUrl: '/products'
        });
      }
    } catch (error) {
      addLog(`Sign in exception: ${error.message}`, 'error');
      console.error('Sign in exception:', error);
      alert(`Sign in exception: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    addLog('Signing out...', 'info');
    await signOut({ callbackUrl: '/login' });
  };

  const testEnvironmentVars = async () => {
    addLog('Testing environment variables...', 'info');
    
    try {
      // Try to fetch debug info from our NextAuth debug API
      const response = await fetch('/api/debug/nextauth');
      if (response.ok) {
        const debugInfo = await response.json();
        addLog(`🔍 NextAuth Debug Info:`, 'info');
        addLog(`Environment: ${debugInfo.environment.NODE_ENV} (Vercel: ${debugInfo.environment.VERCEL_ENV})`, 'info');
        addLog(`NEXTAUTH_URL: ${debugInfo.nextauth.NEXTAUTH_URL}`, debugInfo.nextauth.NEXTAUTH_URL === 'NOT_SET' ? 'error' : 'success');
        addLog(`NEXTAUTH_SECRET: ${debugInfo.nextauth.NEXTAUTH_SECRET}`, debugInfo.nextauth.NEXTAUTH_SECRET === 'NOT_SET' ? 'error' : 'success');
        addLog(`Google Client ID: ${debugInfo.google.GOOGLE_CLIENT_ID}`, debugInfo.google.GOOGLE_CLIENT_ID === 'NOT_SET' ? 'error' : 'success');
        addLog(`Google Client Secret: ${debugInfo.google.GOOGLE_CLIENT_SECRET}`, debugInfo.google.GOOGLE_CLIENT_SECRET === 'NOT_SET' ? 'error' : 'success');
        
        // Show warnings
        if (debugInfo.warnings.length > 0) {
          addLog(`⚠️ Warnings found:`, 'warning');
          debugInfo.warnings.forEach(warning => {
            addLog(`  - ${warning}`, 'warning');
          });
        } else {
          addLog(`✅ No configuration warnings`, 'success');
        }
        
        // Show credential test results
        addLog(`🔐 Credential Test Results:`, 'info');
        debugInfo.credentialTest.testResults.forEach(test => {
          addLog(`  ${test.email}: ${test.valid ? '✅ VALID' : '❌ INVALID'}`, test.valid ? 'success' : 'error');
        });
        
        // Show computed URLs
        addLog(`🌐 Computed URLs:`, 'info');
        addLog(`  Credentials callback: ${debugInfo.computed.expectedCallbackUrl}`, 'info');
        addLog(`  Google callback: ${debugInfo.computed.expectedGoogleCallback}`, 'info');
        
      } else {
        addLog(`Debug API returned ${response.status}`, 'warning');
        const errorText = await response.text();
        addLog(`Error: ${errorText}`, 'error');
      }
    } catch (error) {
      addLog(`Failed to fetch debug info: ${error.message}`, 'error');
    }
    
    // Check current URL
    addLog(`Current URL: ${window.location.origin}`, 'info');
    
    // Check expected callback URL
    const expectedCallback = `${window.location.origin}/api/auth/callback/google`;
    addLog(`Expected callback URL: ${expectedCallback}`, 'info');
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const testCredentials = async () => {
    addLog('Testing demo credentials...', 'info');
    
    const testCreds = [
      { email: 'admin@stylehub.com', password: 'admin123', role: 'admin' },
      { email: 'user@stylehub.com', password: 'user123', role: 'user' }
    ];
    
    for (const cred of testCreds) {
      try {
        addLog(`Testing ${cred.role} credentials...`, 'info');
        
        // Test direct credential validation
        const testResponse = await fetch('/api/test-credentials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cred.email, password: cred.password })
        });
        
        const testResult = await testResponse.json();
        
        if (testResult.success) {
          addLog(`✅ Direct credential test passed for ${cred.role}`, 'success');
        } else {
          addLog(`❌ Direct credential test failed for ${cred.role}: ${testResult.error}`, 'error');
        }
        
        // Test NextAuth credentials sign-in
        addLog(`Testing NextAuth sign-in for ${cred.role}...`, 'info');
        
        const result = await signIn('credentials', {
          email: cred.email,
          password: cred.password,
          redirect: false
        });
        
        if (result?.error) {
          addLog(`❌ NextAuth credentials failed for ${cred.role}: ${result.error}`, 'error');
        } else if (result?.ok) {
          addLog(`✅ NextAuth credentials succeeded for ${cred.role}`, 'success');
          // Sign out immediately to test the next credential
          await signOut({ redirect: false });
        } else {
          addLog(`⚠️ NextAuth credentials returned unexpected result for ${cred.role}`, 'warning');
        }
        
      } catch (error) {
        addLog(`❌ Error testing ${cred.role} credentials: ${error.message}`, 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">OAuth Test & Debug Page</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Session Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Session Status</h2>
            <div className="space-y-2">
              <p><strong>Status:</strong> <span className={`px-2 py-1 rounded text-sm ${
                status === 'authenticated' ? 'bg-green-100 text-green-800' :
                status === 'loading' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>{status}</span></p>
              {session && (
                <>
                  <p><strong>User:</strong> {session.user?.name}</p>
                  <p><strong>Email:</strong> {session.user?.email}</p>
                  <p><strong>Role:</strong> {session.user?.role}</p>
                  <p><strong>Image:</strong> {session.user?.image ? 'Yes' : 'No'}</p>
                </>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            <div className="space-y-4">
              {!session ? (
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Signing in...' : 'Sign in with Google'}
                </button>
              ) : (
                <button
                  onClick={handleSignOut}
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
                >
                  Sign Out
                </button>
              )}
              
              <button
                onClick={testEnvironmentVars}
                className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
              >
                Test Environment
              </button>
              
              <button
                onClick={testCredentials}
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
              >
                Test Demo Credentials
              </button>
              
              <button
                onClick={clearLogs}
                className="w-full bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700"
              >
                Clear Logs
              </button>
            </div>
          </div>
        </div>

        {/* Debug Logs */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Debug Logs</h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg max-h-96 overflow-y-auto font-mono text-sm">
            {logs.length === 0 ? (
              <p className="text-gray-500">No logs yet...</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className={`mb-1 ${
                  log.type === 'error' ? 'text-red-400' :
                  log.type === 'warning' ? 'text-yellow-400' :
                  log.type === 'success' ? 'text-green-400' :
                  'text-blue-400'
                }`}>
                  [{log.timestamp}] {log.message}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Debug Instructions</h3>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• Check the browser console for detailed error messages</li>
            <li>• Verify that your Google Cloud Console settings match your domain</li>
            <li>• Ensure all environment variables are set in Vercel dashboard</li>
            <li>• Test in incognito mode to avoid cached authentication issues</li>
            <li>• Check Vercel deployment logs for server-side errors</li>
          </ul>
        </div>

        {/* Environment Info */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Expected Configuration</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>Production Domain:</strong> https://stylehub-plmi.vercel.app</p>
            <p><strong>Callback URL:</strong> https://stylehub-plmi.vercel.app/api/auth/callback/google</p>
            <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
            <p><strong>Current Origin:</strong> {typeof window !== 'undefined' ? window.location.origin : 'Server-side'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}