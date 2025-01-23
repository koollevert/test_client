import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { fetchCurrentUser } from '../lib/authService';
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '../routes';

export async function middleware(req: NextRequest) {
  console.log('Middleware is running');

  const { nextUrl } = req;

  // Log the request headers for debugging purposes
  console.log('Request Headers:', req.headers);

  try {
    const currentUser = await fetchCurrentUser();
    const isLoggedIn = !!currentUser;

    // Log the session response for debugging purposes
    console.log('Current User:', currentUser);
    console.log('Is Logged In:', isLoggedIn);

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // If it's an API auth route, don't need authentication check
    if (isApiAuthRoute) {
      console.log('API Auth Route');
      return NextResponse.next();
    }

    // If it's an auth route and the user is already logged in, redirect to the default page
    if (isAuthRoute) {
      console.log('Auth Route');
      if (isLoggedIn) {
        console.log('User is logged in, redirecting...');
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
      return NextResponse.next();
    }

    // If the user is not logged in and is trying to access a non-public route, redirect to login
    if (!isLoggedIn && !isPublicRoute) {
      console.log('User is not logged in and trying to access a non-public route, redirecting to login...');
      let callbackUrl = nextUrl.pathname;
      if (nextUrl.search) {
        callbackUrl += nextUrl.search;
      }

      const encodedCallbackUrl = encodeURIComponent(callbackUrl);
      return NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
      );
    }

    return NextResponse.next();
  } catch (error) {
    // Log any errors that occur during the fetchCurrentUser call
    console.error('Error in middleware:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};