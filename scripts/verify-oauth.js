#!/usr/bin/env node

/**
 * OAuth Configuration Verification Script
 * This script helps verify that all OAuth environment variables are properly configured
 */

console.log('🔍 OAuth Configuration Verification\n');

// Check required environment variables
const requiredEnvVars = [
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET'
];

let allEnvVarsSet = true;
let configIssues = [];

console.log('📋 Environment Variables Check:');
console.log('================================');

requiredEnvVars.forEach(envVar => {
  const value = process.env[envVar];
  const isSet = !!value;
  const status = isSet ? '✅' : '❌';
  
  if (!isSet) {
    allEnvVarsSet = false;
    configIssues.push(`${envVar} is not set`);
  }
  
  // Show partial value for security
  let displayValue = 'NOT SET';
  if (isSet) {
    if (envVar.includes('SECRET')) {
      displayValue = value.length > 10 ? `${value.substring(0, 8)}...` : '⚠️ Too short';
    } else if (envVar.includes('CLIENT')) {
      displayValue = value.length > 10 ? `${value.substring(0, 12)}...` : value;
    } else {
      displayValue = value;
    }
  }
  
  console.log(`${status} ${envVar}: ${displayValue}`);
});

console.log('\n🔧 Configuration Analysis:');
console.log('==========================');

// Check NEXTAUTH_URL format
const nextAuthUrl = process.env.NEXTAUTH_URL;
if (nextAuthUrl) {
  if (nextAuthUrl.startsWith('https://')) {
    console.log('✅ NEXTAUTH_URL uses HTTPS (production ready)');
  } else if (nextAuthUrl.startsWith('http://localhost')) {
    console.log('⚠️  NEXTAUTH_URL uses localhost (development mode)');
  } else {
    console.log('❌ NEXTAUTH_URL should start with https:// for production');
    configIssues.push('NEXTAUTH_URL should use HTTPS for production');
  }
  
  if (nextAuthUrl.endsWith('/')) {
    console.log('⚠️  NEXTAUTH_URL should not end with a slash');
    configIssues.push('Remove trailing slash from NEXTAUTH_URL');
  }
} else {
  console.log('❌ NEXTAUTH_URL is not set');
}

// Check NEXTAUTH_SECRET strength
const nextAuthSecret = process.env.NEXTAUTH_SECRET;
if (nextAuthSecret) {
  if (nextAuthSecret.length >= 32) {
    console.log('✅ NEXTAUTH_SECRET is sufficiently long');
  } else {
    console.log('⚠️  NEXTAUTH_SECRET should be at least 32 characters');
    configIssues.push('NEXTAUTH_SECRET should be at least 32 characters long');
  }
  
  if (nextAuthSecret === 'your-secret-key-here-change-in-production' || 
      nextAuthSecret === 'your-strong-secret-here') {
    console.log('❌ NEXTAUTH_SECRET is using default value');
    configIssues.push('Change NEXTAUTH_SECRET from default value');
  }
} else {
  console.log('❌ NEXTAUTH_SECRET is not set');
}

// Check Google Client ID format
const googleClientId = process.env.GOOGLE_CLIENT_ID;
if (googleClientId) {
  if (googleClientId.includes('.apps.googleusercontent.com')) {
    console.log('✅ GOOGLE_CLIENT_ID format looks correct');
  } else {
    console.log('⚠️  GOOGLE_CLIENT_ID format might be incorrect');
    configIssues.push('Verify GOOGLE_CLIENT_ID format');
  }
} else {
  console.log('❌ GOOGLE_CLIENT_ID is not set');
}

// Check Google Client Secret format
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
if (googleClientSecret) {
  if (googleClientSecret.startsWith('GOCSPX-')) {
    console.log('✅ GOOGLE_CLIENT_SECRET format looks correct');
  } else {
    console.log('⚠️  GOOGLE_CLIENT_SECRET format might be incorrect');
    configIssues.push('Verify GOOGLE_CLIENT_SECRET format');
  }
} else {
  console.log('❌ GOOGLE_CLIENT_SECRET is not set');
}

console.log('\n📊 Overall Status:');
console.log('==================');

if (allEnvVarsSet && configIssues.length === 0) {
  console.log('✅ All environment variables are properly configured!');
  console.log('\n🚀 Your OAuth setup should work correctly.');
} else {
  console.log(`❌ Found ${configIssues.length} configuration issue(s)`);
  
  console.log('\n🔧 Action Items:');
  configIssues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue}`);
  });
}

console.log('\n📝 Expected Configuration for Production:');
console.log('=========================================');
console.log('Vercel Environment Variables:');
console.log('NEXTAUTH_URL=https://stylehub-plmi.vercel.app');
console.log('NEXTAUTH_SECRET=your-strong-secret-here');
console.log('GOOGLE_CLIENT_ID=your-client-id');
console.log('GOOGLE_CLIENT_SECRET=your-client-secret');

console.log('\nGoogle Cloud Console:');
console.log('Authorized JavaScript Origins:');
console.log('- https://stylehub-plmi.vercel.app');
console.log('\nAuthorized Redirect URIs:');
console.log('- https://stylehub-plmi.vercel.app/api/auth/callback/google');

console.log('\n🔍 Debug Tips:');
console.log('==============');
console.log('1. Check browser console for detailed error messages');
console.log('2. Verify Google Cloud Console settings match your domain');
console.log('3. Test OAuth flow using /test-oauth page');
console.log('4. Check Vercel deployment logs for server-side errors');
console.log('5. Ensure all environment variables are set in Vercel dashboard');