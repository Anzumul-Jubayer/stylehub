#!/usr/bin/env node

/**
 * NextAuth Configuration Test Script
 * This script helps test NextAuth configuration and identify potential issues
 */

console.log('🔍 NextAuth Configuration Test\n');

// Test environment variables
const requiredVars = {
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
};

console.log('📋 Environment Variables:');
console.log('=========================');

Object.entries(requiredVars).forEach(([key, value]) => {
  const status = value ? '✅' : '❌';
  let displayValue = 'NOT SET';
  
  if (value) {
    if (key.includes('SECRET')) {
      displayValue = `SET (${value.length} chars)`;
    } else if (key === 'NEXTAUTH_URL') {
      displayValue = value;
    } else {
      displayValue = `SET (${value.substring(0, 12)}...)`;
    }
  }
  
  console.log(`${status} ${key}: ${displayValue}`);
});

console.log('\n🔧 Configuration Tests:');
console.log('=======================');

// Test NEXTAUTH_URL format
const nextAuthUrl = process.env.NEXTAUTH_URL;
if (nextAuthUrl) {
  try {
    const url = new URL(nextAuthUrl);
    console.log(`✅ NEXTAUTH_URL is valid URL: ${url.origin}`);
    
    if (url.protocol === 'https:') {
      console.log('✅ Uses HTTPS (production ready)');
    } else if (url.hostname === 'localhost') {
      console.log('⚠️  Uses HTTP localhost (development mode)');
    } else {
      console.log('❌ Should use HTTPS for production');
    }
    
    if (url.pathname !== '/') {
      console.log('⚠️  NEXTAUTH_URL should not include path');
    }
    
    // Test callback URL construction
    const callbackUrl = `${url.origin}/api/auth/callback/google`;
    console.log(`✅ Google callback URL would be: ${callbackUrl}`);
    
  } catch (error) {
    console.log(`❌ NEXTAUTH_URL is not a valid URL: ${error.message}`);
  }
} else {
  console.log('❌ NEXTAUTH_URL is not set');
}

// Test NEXTAUTH_SECRET
const secret = process.env.NEXTAUTH_SECRET;
if (secret) {
  if (secret.length >= 32) {
    console.log('✅ NEXTAUTH_SECRET is sufficiently long');
  } else {
    console.log(`⚠️  NEXTAUTH_SECRET is too short (${secret.length} chars, need 32+)`);
  }
  
  if (secret === 'your-secret-key-here-change-in-production') {
    console.log('❌ NEXTAUTH_SECRET is using default value');
  }
} else {
  console.log('❌ NEXTAUTH_SECRET is not set');
}

// Test Google credentials format
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (clientId) {
  if (clientId.includes('.apps.googleusercontent.com')) {
    console.log('✅ GOOGLE_CLIENT_ID format looks correct');
  } else {
    console.log('⚠️  GOOGLE_CLIENT_ID format might be incorrect');
  }
} else {
  console.log('❌ GOOGLE_CLIENT_ID is not set');
}

if (clientSecret) {
  if (clientSecret.startsWith('GOCSPX-')) {
    console.log('✅ GOOGLE_CLIENT_SECRET format looks correct');
  } else {
    console.log('⚠️  GOOGLE_CLIENT_SECRET format might be incorrect');
  }
} else {
  console.log('❌ GOOGLE_CLIENT_SECRET is not set');
}

console.log('\n🚀 NextAuth URL Construction Test:');
console.log('==================================');

// Simulate NextAuth URL construction logic
const getBaseUrl = () => {
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }
  
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  return process.env.NODE_ENV === 'production' 
    ? 'https://stylehub-plmi.vercel.app' 
    : 'http://localhost:3000';
};

const baseUrl = getBaseUrl();
console.log(`Computed base URL: ${baseUrl}`);

// Test callback URLs
const googleCallback = `${baseUrl}/api/auth/callback/google`;
const credentialsCallback = `${baseUrl}/api/auth/callback/credentials`;

console.log(`Google OAuth callback: ${googleCallback}`);
console.log(`Credentials callback: ${credentialsCallback}`);

console.log('\n📝 Recommendations:');
console.log('===================');

const issues = [];

if (!process.env.NEXTAUTH_URL) {
  issues.push('Set NEXTAUTH_URL environment variable');
}

if (!process.env.NEXTAUTH_SECRET || process.env.NEXTAUTH_SECRET.length < 32) {
  issues.push('Set a strong NEXTAUTH_SECRET (32+ characters)');
}

if (!process.env.GOOGLE_CLIENT_ID) {
  issues.push('Set GOOGLE_CLIENT_ID from Google Cloud Console');
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  issues.push('Set GOOGLE_CLIENT_SECRET from Google Cloud Console');
}

if (issues.length === 0) {
  console.log('✅ Configuration looks good!');
  console.log('\n🔍 If you\'re still having issues:');
  console.log('1. Check Google Cloud Console settings');
  console.log('2. Verify Vercel environment variables');
  console.log('3. Test with /test-oauth page');
  console.log('4. Check browser console for errors');
} else {
  console.log('❌ Issues found:');
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue}`);
  });
}

console.log('\n🌐 Google Cloud Console Settings:');
console.log('==================================');
console.log('Authorized JavaScript Origins:');
console.log(`- ${baseUrl}`);
console.log('\nAuthorized Redirect URIs:');
console.log(`- ${googleCallback}`);