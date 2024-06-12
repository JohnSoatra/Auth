import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { useAuth } from './context/AuthContext';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token');
    const refreshToken = request.cookies.get('refreshToken');
    
}