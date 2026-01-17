import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // 1. Try to get the token from cookies
  const token = request.cookies.get('token')?.value

  // 2. Define protected routes
  const protectedRoutes = ['/my-learning', '/checkout', '/profile', '/dashboard']
  const isProtectedRoute = protectedRoutes.some(path => request.nextUrl.pathname.startsWith(path))

  // 3. Define auth routes (login/signup) - redirect away if already logged in
  const authRoutes = ['/auth/login', '/auth/signup', '/auth/forgot-password', '/auth/reset-password']
  const isAuthRoute = authRoutes.some(path => request.nextUrl.pathname.startsWith(path))

  // Scenario A: User is NOT logged in but tries to access protected route
  if (!token && isProtectedRoute) {
    const loginUrl = new URL('/auth/login', request.url)
    // Save where they were trying to go
    loginUrl.searchParams.set('returnUrl', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Scenario B: User IS logged in but tries to access login/signup
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/my-learning', request.url))
  }

  return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    '/my-learning/:path*',
    '/checkout/:path*',
    '/profile/:path*',
    '/dashboard/:path*',
    '/auth/:path*'
  ]
}