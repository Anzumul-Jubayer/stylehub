#!/usr/bin/env node

/**
 * Vercel Environment Variables Checker
 * This script helps verify that environment variables are properly set in Vercel
 */

console.log('🔍 Vercel Environment Variables Checker\n');

const requiredEnvVars = [
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET', 
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET'
];

console.log('📋 Required Environment Variables for Production:');
console.log('================================================');

requiredEnvVars.forEach(envVar => {
  console.log(`${envVar}=your-value-here`);
});

console.log('\n🎯 Vercel Dashboard Instructions:');
console.log('=================================');
console.log('1. Go to https://vercel.com/dashboard');
console.log('2. Select your project (stylehub)');
console.log('3. Go to Settings > Environment Variables');
console.log('4. Add/Update these variables:');
console.log('');

console.log('   NEXTAUTH_URL');
console.log('   Value: https://stylehub-plmi.vercel.app');
console.log('   Environment: Production, Preview');
console.log('');

console.log('   NEXTAUTH_SECRET');
console.log('   Value: a-very-strong-secret-key-for-production-use-32-chars-minimum');
console.log('   Environment: Production, Preview');
console.log('');

console.log('   GOOGLE_CLIENT_ID');
console.log('   Value: [YOUR_GOOGLE_CLIENT_ID_FROM_GOOGLE_CLOUD_CONSOLE]');
console.log('   Environment: Production, Preview');
console.log('');

console.log('   GOOGLE_CLIENT_SECRET');
console.log('   Value: [YOUR_GOOGLE_CLIENT_SECRET_FROM_GOOGLE_CLOUD_CONSOLE]');
console.log('   Environment: Production, Preview');
console.log('');

console.log('5. Click "Save" for each variable');
console.log('6. Redeploy your application (or wait for auto-deployment)');

console.log('\n🔧 Testing Steps After Setting Variables:');
console.log('=========================================');
console.log('1. Visit: https://stylehub-plmi.vercel.app/test-oauth');
console.log('2. Click "Test Environment" to verify variables are loaded');
console.log('3. Click "Test Demo Credentials" to test authentication');
console.log('4. Try logging in with demo credentials on main login page');

console.log('\n⚠️  Important Notes:');
console.log('===================');
console.log('- Environment variables are case-sensitive');
console.log('- Make sure to select "Production" environment when adding variables');
console.log('- After adding variables, you may need to trigger a new deployment');
console.log('- Variables take effect immediately but may require a page refresh');

console.log('\n🐛 If Still Not Working:');
console.log('========================');
console.log('1. Check Vercel deployment logs for errors');
console.log('2. Verify all environment variables are exactly as shown above');
console.log('3. Try redeploying the application');
console.log('4. Check browser console for client-side errors');
console.log('5. Use the /api/debug/nextauth endpoint to verify server-side config');

console.log('\n✅ Demo Credentials to Test:');
console.log('============================');
console.log('Admin: admin@stylehub.com / admin123');
console.log('User:  user@stylehub.com / user123');