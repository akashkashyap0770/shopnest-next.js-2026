"use client";

// 🔝 Navbar — Top navigation bar
// Har page par dikhta hai (layout.js mein add kiya hai)
// Features: Logo, Nav Links, Cart icon with count, Login/Signup buttons

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useUser, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  // Cart se total items count lo (badge mein dikhane ke liye)
  const { getTotalItems } = useCart();

  // Clerk se user ki login status lo
  const { isSignedIn } = useUser();

  // Current page ka path (active link highlight karne ke liye)
  const pathname = usePathname();

  // BUG FIX: mounted state zaroori hai
  // Problem: Server aur client par cart count alag hota tha (hydration mismatch)
  // Solution: Pehle render mein 0 dikhao, phir client mount hone par actual count
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Component browser mein load ho gaya
  }, []);

  // Active link ka style alag hoga (blue aur bold)
  const navLinkClass = (path) =>
    `transition ${
      pathname === path
        ? "text-blue-600 font-semibold"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-around px-6 py-4 shadow-md bg-white">
      {/* 🏪 LOGO */}
      <Link href="/">
        <h1 className="text-2xl font-bold text-blue-600">ShopNest</h1>
      </Link>

      {/* 🔗 NAV LINKS — Desktop par dikhenge (mobile par hidden) */}
      <div className="hidden md:flex gap-6 font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={link.path}
            className={navLinkClass(link.path)}
          >
            {link.title}
          </Link>
        ))}
      </div>

      {/* 🛒 RIGHT SECTION: Cart + Auth buttons */}
      <div className="flex items-center gap-4">
        {/* Cart Icon with item count badge */}
        <Link href="/cart" className="relative">
          <ShoppingCart size={24} className="text-gray-700" />

          {/* Badge: Cart mein kitne items hain */}
          {/* mounted check: Server side render mein 0 dikhao, client mein actual count */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            {mounted ? getTotalItems() : 0}
          </span>
        </Link>

        {/* Login/Signup buttons ya User avatar */}
        {!isSignedIn ? (
          // User logged in nahi hai — Login aur Signup buttons dikhao
          <div className="flex gap-2">
            <Link
              href="/sign-in"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg"
            >
              Signup
            </Link>
          </div>
        ) : (
          // User logged in hai — Clerk ka UserButton dikhao (avatar with dropdown)
          <UserButton afterSignOutUrl="/" />
        )}
      </div>
    </nav>
  );
}
