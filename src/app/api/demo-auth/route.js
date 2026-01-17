import { NextResponse } from 'next/server';

const DEMO_USERS = [
  {
    id: '1',
    email: 'admin@stylehub.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'user@stylehub.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user'
  }
];

export async function POST(request) {
  try {
    const { email, password, action } = await request.json();
    
    if (action === 'signin') {
      console.log('🔐 Demo auth signin attempt:', { email });
      
      if (!email || !password) {
        return NextResponse.json({ 
          success: false, 
          error: 'Email and password are required' 
        }, { status: 400 });
      }

      // Find user in demo database
      const user = DEMO_USERS.find(
        u => u.email === email && u.password === password
      );

      if (user) {
        console.log('✅ Demo auth successful:', { id: user.id, email: user.email, role: user.role });
        
        const session = {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: null
          },
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
          provider: 'demo'
        };

        return NextResponse.json({ 
          success: true, 
          session,
          user: session.user
        });
      } else {
        console.log('❌ Demo auth failed: Invalid credentials for', email);
        return NextResponse.json({ 
          success: false, 
          error: 'Invalid email or password' 
        }, { status: 401 });
      }
    }

    if (action === 'verify') {
      // This endpoint can be used to verify if demo auth is working
      return NextResponse.json({ 
        success: true, 
        message: 'Demo authentication is available',
        users: DEMO_USERS.map(u => ({ email: u.email, role: u.role }))
      });
    }

    return NextResponse.json({ 
      success: false, 
      error: 'Invalid action' 
    }, { status: 400 });

  } catch (error) {
    console.error('💥 Demo auth API error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}