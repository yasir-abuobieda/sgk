import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Protect all /admin routes except /admin/login
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const isAdmin = request.cookies.get('admin_token')?.value === 'secure_sgk_token_2026';
    
    if (!isAdmin) {
      // Return a fake 404 to completely hide the existence of /admin from hackers
      request.nextUrl.pathname = '/force-404';
      return NextResponse.rewrite(request.nextUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
