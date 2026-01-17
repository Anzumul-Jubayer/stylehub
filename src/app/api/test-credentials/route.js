import { NextResponse } from 'next/server';

// Mock user database - same as in NextAuth
const mockUsers = [
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
    const { email, password } = await request.json();
    
    console.log('Testing credentials:', { email, password: password ? '***' : 'missing' });
    
    if (!email || !password) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing email or password' 
      }, { status: 400 });
    }

    // Find user in mock database
    const user = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      console.log('User found:', { id: user.id, email: user.email, role: user.role });
      return NextResponse.json({ 
        success: true, 
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      });
    } else {
      console.log('User not found for email:', email);
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid credentials' 
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Test credentials error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}