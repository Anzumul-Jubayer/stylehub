// Environment verification script
// Run with: node scripts/verify-env.js

const requiredEnvVars = [
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'MONGODB_URI',
  'DB_NAME',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET'
];

console.log('🔍 Verifying environment variables...\n');

let allPresent = true;

requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  const status = value ? '✅' : '❌';
  const displayValue = value ? 
    (varName.includes('SECRET') || varName.includes('URI') ? '[HIDDEN]' : value) : 
    'NOT SET';
  
  console.log(`${status} ${varName}: ${displayValue}`);
  
  if (!value) {
    allPresent = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allPresent) {
  console.log('✅ All required environment variables are set!');
} else {
  console.log('❌ Some environment variables are missing.');
  console.log('Please check the DEPLOYMENT_GUIDE.md for setup instructions.');
}

// Additional checks
console.log('\n🔍 Additional checks:');

if (process.env.NEXTAUTH_URL) {
  try {
    const url = new URL(process.env.NEXTAUTH_URL);
    console.log(`✅ NEXTAUTH_URL is a valid URL: ${url.origin}`);
    
    if (url.protocol !== 'https:' && process.env.NODE_ENV === 'production') {
      console.log('⚠️  Warning: NEXTAUTH_URL should use HTTPS in production');
    }
  } catch (error) {
    console.log('❌ NEXTAUTH_URL is not a valid URL');
  }
}

if (process.env.NEXTAUTH_SECRET) {
  const secret = process.env.NEXTAUTH_SECRET;
  if (secret === 'your-secret-key-here-change-in-production') {
    console.log('❌ NEXTAUTH_SECRET is still using the default development value');
  } else if (secret.length < 32) {
    console.log('⚠️  Warning: NEXTAUTH_SECRET should be at least 32 characters long');
  } else {
    console.log('✅ NEXTAUTH_SECRET appears to be properly configured');
  }
}

console.log('\n📝 For detailed setup instructions, see DEPLOYMENT_GUIDE.md');