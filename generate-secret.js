// Generate a strong NEXTAUTH_SECRET for production
const crypto = require('crypto');

const secret = crypto.randomBytes(32).toString('base64');
console.log('Generated NEXTAUTH_SECRET:');
console.log(secret);
console.log('\nCopy this value and set it as NEXTAUTH_SECRET in your Vercel environment variables.');