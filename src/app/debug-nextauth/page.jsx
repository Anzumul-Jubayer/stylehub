'use client';

import { useEffect, useState } from 'react';

export default function DebugNextAuth() {
  const [debugData, setDebugData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/debug-nextauth')
      .then(res => res.json())
      .then(data => {
        setDebugData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch debug data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading debug information...</div>
      </div>
    );
  }

  if (!debugData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">Failed to load debug information</div>
      </div>
    );
  }

  const { env, validation, expected } = debugData;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">NextAuth Debug Information</h1>
        
        {/* Overall Status */}
        <div className={`rounded-lg p-6 mb-6 ${validation.allEnvVarsSet ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${validation.allEnvVarsSet ? 'text-green-800' : 'text-red-800'}`}>
            Overall Status: {validation.allEnvVarsSet ? '✅ Environment Variables Set' : '❌ Missing Environment Variables'}
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>All Env Vars Set: {validation.allEnvVarsSet ? '✅' : '❌'}</div>
            <div>NEXTAUTH_URL Correct: {validation.nextAuthUrlCorrect ? '✅' : '❌'}</div>
            <div>Secret Not Default: {validation.secretNotDefault ? '✅' : '❌'}</div>
            <div>Secret Long Enough: {validation.secretLongEnough ? '✅' : '❌'}</div>
          </div>
        </div>

        {/* Environment Variables */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Environment Variables</h2>
          <div className="space-y-4">
            {Object.entries(env).map(([key, info]) => (
              <div key={key} className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-800">{key}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${info.exists ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {info.exists ? 'SET' : 'MISSING'}
                  </span>
                </div>
                {info.value && (
                  <code className="text-sm text-gray-600 block mt-1">{info.value}</code>
                )}
                {key === 'NEXTAUTH_SECRET' && info.isDefault && (
                  <p className="text-red-600 text-sm mt-1">⚠️ Using default secret - change for production!</p>
                )}
                {key === 'NEXTAUTH_URL' && !info.isCorrect && (
                  <p className="text-red-600 text-sm mt-1">⚠️ Should be: https://stylehub-plmi.vercel.app</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Expected Configuration */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">Expected Configuration</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-yellow-800">Vercel Environment Variables:</h3>
              <div className="mt-2 space-y-1">
                <code className="block bg-yellow-100 p-2 rounded text-sm">NEXTAUTH_URL={expected.NEXTAUTH_URL}</code>
                <code className="block bg-yellow-100 p-2 rounded text-sm">NEXTAUTH_SECRET=your-strong-secret-here</code>
                <code className="block bg-yellow-100 p-2 rounded text-sm">GOOGLE_CLIENT_ID=your-client-id</code>
                <code className="block bg-yellow-100 p-2 rounded text-sm">GOOGLE_CLIENT_SECRET=your-client-secret</code>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-yellow-800">Google Cloud Console:</h3>
              <div className="mt-2 space-y-1">
                <div>
                  <strong>Authorized JavaScript Origins:</strong>
                  <code className="block bg-yellow-100 p-2 rounded text-sm">{expected.googleConsoleOrigin}</code>
                </div>
                <div>
                  <strong>Authorized Redirect URIs:</strong>
                  <code className="block bg-yellow-100 p-2 rounded text-sm">{expected.redirectURI}</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Action Items</h2>
          <div className="space-y-2">
            {!validation.allEnvVarsSet && (
              <div className="flex items-center space-x-2">
                <span className="text-red-500">❌</span>
                <span>Set missing environment variables in Vercel dashboard</span>
              </div>
            )}
            {!validation.nextAuthUrlCorrect && (
              <div className="flex items-center space-x-2">
                <span className="text-red-500">❌</span>
                <span>Update NEXTAUTH_URL to: https://stylehub-plmi.vercel.app</span>
              </div>
            )}
            {!validation.secretNotDefault && (
              <div className="flex items-center space-x-2">
                <span className="text-red-500">❌</span>
                <span>Generate a strong NEXTAUTH_SECRET (32+ characters)</span>
              </div>
            )}
            {validation.allEnvVarsSet && validation.nextAuthUrlCorrect && validation.secretNotDefault && (
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span>All environment variables are properly configured!</span>
              </div>
            )}
          </div>
        </div>

        {/* Test OAuth */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">Test OAuth</h2>
          <p className="text-green-700 mb-4">
            After fixing any issues above, test the OAuth flow:
          </p>
          <a 
            href="/login" 
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-block"
          >
            Test Google OAuth Login
          </a>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Debug info generated at: {debugData.timestamp}</p>
          <p className="mt-2">
            <strong>Note:</strong> Delete this debug page after fixing OAuth issues for security.
          </p>
        </div>
      </div>
    </div>
  );
}