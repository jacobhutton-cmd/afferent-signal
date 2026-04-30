import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

const protectedRoutes = ['/history', '/settings', '/submit', '/premium'];
const authRoutes = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { response, user } = await updateSession(request);

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (authRoutes.some((route) => pathname.startsWith(route)) && user) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/history/:path*', '/settings/:path*', '/submit/:path*', '/premium/:path*', '/login', '/signup']
};
