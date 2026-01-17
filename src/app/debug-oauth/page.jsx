'use client';

import { useEffect, useState } from 'react';

export default function DebugOAuth() {
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    setDebugInfo({
      currentURL: window.location.origin,
      expectedRedirectURI: `${window.location.origin}/api/auth/callback/google`,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">OAuth Debug Information</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Current Environment</h2>
          <div className="space-y-3">
            <div className="flex flex-col">
              <span className="font-medium text-gray-600">Current URL:</span>
              <code className="bg-gray-100 p-2 rounded text-sm text-blue-600">
                {debugInfo.currentURL}
              </code>
            </div>
            
            <div className="flex flex-col">
              <span className="font-medium text-gray-600">Expected Redirect URI:</span>
              <code className="bg-gray-100 p-2 rounded text-sm text-green-600">
                {debugInfo.expectedRedirectURI}
              </code>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">Google Cloud Console Setup</h2>
          <p className="text-yellow-700 mb-4">
            Add these EXACT URLs to your Google Cloud Console OAuth 2.0 Client:
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-yellow-800">Authorized JavaScript Origins:</h3>
              <code className="bg-yellow-100 p-2 rounded text-sm block text-yellow-900">
                {debugInfo.currentURL}
              </code>
            </div>
            
            <div>
              <h3 className="font-medium text-yellow-800">Authorized Redirect URIs:</h3>
              <code className="bg-yellow-100 p-2 rounded text-sm block text-yellow-900">
                {debugInfo.expectedRedirectURI}
              </code>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Vercel Environment Variables</h2>
          <p className="text-blue-700 mb-4">
            Set this in your Vercel dashboard → Settings → Environment Variables:
          </p>
          
          <div>
            <h3 className="font-medium text-blue-800">NEXTAUTH_URL:</h3>
            <code className="bg-blue-100 p-2 rounded text-sm block text-blue-900">
              {debugInfo.currentURL}
            </code>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">Test OAuth</h2>
          <p className="text-green-700 mb-4">
            After updating Google Console and Vercel settings:
          </p>
          <a 
            href="/login" 
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-block"
          >
            Test Google OAuth Login
          </a>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Debug info generated at: {debugInfo.timestamp}</p>
          <p className="mt-2">
            <strong>Note:</strong> Delete this debug page after fixing OAuth issues for security.
          </p>
        </div>
      </div>
    </div>
  );
}