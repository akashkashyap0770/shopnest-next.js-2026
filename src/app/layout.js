// 🏗️ Root Layout — Poore app ka wrapper
// Next.js mein yeh file har page ke bahar automatically wrap hoti hai
// Iska matlab: Navbar, Providers, Toaster sab jagah available hain

import { Geist } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";
import SyncUser from "@/components/SyncUser";

// Google Font load karo — Geist ek modern, clean font hai
const geist = Geist({ subsets: ["latin"] });

// Browser tab mein dikhne wala title aur description
export const metadata = {
  title: "ShopNest | Premium Online Shopping",
  description: "Discover curated products at unbeatable prices.",
};

export default function RootLayout({ children }) {
  // children = jo bhi page render hoga woh yahan inject hoga
  return (
    <html lang="en">
      <body className={`${geist.className} bg-stone-50 text-stone-900`}>
        {/* 🔐 ClerkProvider: Authentication poore app mein available karta hai */}
        <ClerkProvider>
          {/* 🛒 CartProvider: Cart state poore app mein available karta hai */}
          <CartProvider>
            {/* 🔍 SearchProvider: Search state poore app mein available karta hai */}
            <SearchProvider>
              <main className="min-h-screen">
                {/* 🔄 SyncUser: User MongoDB mein save hoga (background mein) */}
                <SyncUser />

                {/* 🔝 Navbar: Har page pe upar dikhega */}
                <Navbar />

                {/* 🍞 Toast notifications (success/error popups) */}
                <Toaster position="top-center" />

                {/* 📄 Actual page content yahan render hoga */}
                {children}
              </main>
            </SearchProvider>
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
