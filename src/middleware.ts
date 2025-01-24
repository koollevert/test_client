import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { fetchSession } from '../lib/fetchSession';
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '../routes';

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  try {
    // Pass the request headers to fetchSession
    const session = await fetchSession(req);
    const isLoggedIn = !!session;

    console.log('Session:', session);
    console.log('Is Logged In:', isLoggedIn);

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
      return NextResponse.next();
    }

    if (isAuthRoute && isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    if (!isLoggedIn && !isPublicRoute) {
      const callbackUrl = nextUrl.pathname + nextUrl.search;
      const encodedCallbackUrl = encodeURIComponent(callbackUrl);
      return NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error in middleware:', error);
    // On error, allow the request to continue but treat as not logged in
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};