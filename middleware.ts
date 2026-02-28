// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect all routes except the explicitly public ones
  if (!isPublicRoute(req)) {
    await auth.protect(); // Redirects unauthenticated users to /sign-in
  }
});

export const config = {
  matcher: [
    // Skip static files, _next, etc.
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};