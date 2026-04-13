// 🔒 Middleware — Har request ke pehle chalta hai
// Yeh decide karta hai ki kaun sa route public hai (bina login ke access ho)
// aur kaun sa protected hai (login zaroori hai)

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 🔹 Public routes: Yeh pages bina login ke koi bhi dekh sakta hai
const isPublicRoute = createRouteMatcher([
  "/", // Home page
  "/sign-in(.*)", // Sign in page (aur uske sub-routes)
  "/sign-up(.*)", // Sign up page
  "/shop", // Shop listing page
  "/product(.*)", // Product detail page (sabhi products)
  "/about", // BUG FIX: About page ko public banaya — pehle login required tha
  "/contact", // BUG FIX: Contact page ko public banaya
  "/api/(.*)", // Sabhi API routes public hain (API ki apni auth hai)
]);

// 🔹 Clerk middleware: Har request par check karo
export default clerkMiddleware(async (auth, req) => {
  // Agar route public nahi hai toh login check karo
  // Protected routes: /cart, /orders, /seller, etc.
  if (!isPublicRoute(req)) {
    await auth.protect(); // Login nahi hai toh sign-in page par redirect kar do
  }
});

// Middleware kis-kis route par run kare
export const config = {
  matcher: [
    // Next.js ke internal files aur static assets skip karo
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // API routes par hamesha run karo
    "/(api|trpc)(.*)",
  ],
};
