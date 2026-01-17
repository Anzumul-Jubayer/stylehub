#!/usr/bin/env node

/**
 * Test script to verify demo authentication works in production
 * Run with: node scripts/test-demo-production.js
 */

const https = require('https');

const PRODUCTION_URL = 'https://stylehub-plmi.vercel.app';
const TEST_CREDENTIALS = [
  { email: 'admin@stylehub.com', password: 'admin123', role: 'admin' },
  { email: 'user@stylehub.com', password: 'user123', role: 'user' }
];

async function testDemoAuth(baseUrl, credentials) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      email: credentials.email,
      password: credentials.password,
      action: 'signin'
    });

    const options = {
      hostname: new URL(baseUrl).hostname,
      port: 443,
      path: '/api/demo-auth',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: result
          });
        } catch (error) {
          reject(new Error(`Failed to parse response: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function testVerifyEndpoint(baseUrl) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ action: 'verify' });

    const options = {
      hostname: new URL(baseUrl).hostname,
      port: 443,
      path: '/api/demo-auth',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve({
            statusCode: res.statusCode,
            body: result
          });
        } catch (error) {
          reject(new Error(`Failed to parse response: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing Demo Authentication in Production');
  console.log('=' .repeat(50));
  console.log(`🌐 Testing URL: ${PRODUCTION_URL}`);
  console.log('');

  try {
    // Test verify endpoint first
    console.log('1️⃣ Testing verify endpoint...');
    const verifyResult = await testVerifyEndpoint(PRODUCTION_URL);
    
    if (verifyResult.statusCode === 200 && verifyResult.body.success) {
      console.log('✅ Verify endpoint working');
      console.log(`   Environment: ${verifyResult.body.environment}`);
      console.log(`   Available users: ${verifyResult.body.users?.length || 0}`);
    } else {
      console.log('❌ Verify endpoint failed');
      console.log(`   Status: ${verifyResult.statusCode}`);
      console.log(`   Response:`, verifyResult.body);
    }
    console.log('');

    // Test each credential
    for (let i = 0; i < TEST_CREDENTIALS.length; i++) {
      const cred = TEST_CREDENTIALS[i];
      console.log(`${i + 2}️⃣ Testing ${cred.role} login (${cred.email})...`);
      
      try {
        const result = await testDemoAuth(PRODUCTION_URL, cred);
        
        if (result.statusCode === 200 && result.body.success) {
          console.log('✅ Login successful');
          console.log(`   User: ${result.body.user?.name}`);
          console.log(`   Role: ${result.body.user?.role}`);
          console.log(`   Session expires: ${result.body.session?.expires}`);
          
          // Check if cookie was set
          const setCookieHeader = result.headers['set-cookie'];
          if (setCookieHeader) {
            console.log('✅ Session cookie set');
          } else {
            console.log('⚠️  No session cookie in response');
          }
        } else {
          console.log('❌ Login failed');
          console.log(`   Status: ${result.statusCode}`);
          console.log(`   Error: ${result.body.error}`);
        }
      } catch (error) {
        console.log('❌ Request failed');
        console.log(`   Error: ${error.message}`);
      }
      console.log('');
    }

    // Test invalid credentials
    console.log('4️⃣ Testing invalid credentials...');
    try {
      const result = await testDemoAuth(PRODUCTION_URL, {
        email: 'invalid@test.com',
        password: 'wrongpassword'
      });
      
      if (result.statusCode === 401 && !result.body.success) {
        console.log('✅ Invalid credentials properly rejected');
      } else {
        console.log('❌ Invalid credentials should be rejected');
        console.log(`   Status: ${result.statusCode}`);
        console.log(`   Response:`, result.body);
      }
    } catch (error) {
      console.log('❌ Request failed');
      console.log(`   Error: ${error.message}`);
    }

  } catch (error) {
    console.error('💥 Test suite failed:', error.message);
    process.exit(1);
  }

  console.log('');
  console.log('🎉 Demo authentication tests completed!');
  console.log('');
  console.log('📝 Next steps:');
  console.log('   1. If tests pass, demo auth should work in production');
  console.log('   2. If tests fail, check Vercel logs for detailed errors');
  console.log('   3. Try logging in at: ' + PRODUCTION_URL + '/login');
}

// Run the tests
runTests().catch(console.error);