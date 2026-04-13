// 🏪 Seller Dashboard — Seller ke liye ek dashboard page
// Abhi yeh mostly UI hai — features "coming soon" hain
// currentUser() Clerk ka server-side function hai (bina API ke user milta hai)

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation"; // BUG FIX: auth check add kiya

export default async function SellerPage() {
  // Server side par Clerk se current user lo
  // Yeh function sirf Server Components mein kaam karta hai
  const user = await currentUser();

  // BUG FIX: User logged in nahi hai toh sign-in par redirect karo
  // Pehle yeh check nahi tha — bina login ke bhi page access ho sakta tha
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-stone-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* PAGE HEADER */}
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Seller Dashboard
          </h1>
          <p className="mt-3 text-gray-600">
            Manage your products and track your store performance
          </p>
        </div>

        {/* WELCOME CARD — Seller ka naam dikhata hai */}
        <div className="mt-8 bg-gradient-to-r from-amber-100 to-rose-100 rounded-2xl p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-900">
            {/* user?.firstName se Clerk ka first name milta hai */}
            Welcome 👋 {user?.firstName || "Seller"}
          </h2>
          <p className="text-gray-700 mt-1">
            Glad to have you back! Let's grow your business today.
          </p>
        </div>

        {/* DASHBOARD FEATURE CARDS — Placeholder cards */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {/* Products card */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition text-center">
            <h3 className="text-lg font-semibold">📦 Products</h3>
            <p className="text-gray-500 mt-2">Add & manage listings</p>
          </div>

          {/* Sales card */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition text-center">
            <h3 className="text-lg font-semibold">💰 Sales</h3>
            <p className="text-gray-500 mt-2">Track your earnings</p>
          </div>

          {/* Analytics card */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition text-center">
            <h3 className="text-lg font-semibold">📊 Analytics</h3>
            <p className="text-gray-500 mt-2">View performance stats</p>
          </div>
        </div>

        {/* WORKING STATUS BANNER — Features abhi baan rahe hain */}
        <div className="mt-8 bg-white rounded-2xl shadow p-6 text-center">
          {/* Pulsing dot — "working on it" indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
            Working on it
          </div>

          <p className="text-gray-600 mt-3">
            We are actively building new features like product upload, orders
            management, and analytics dashboard.
          </p>
        </div>

        {/* FOOTER NOTE */}
        <div className="mt-10 text-center text-gray-500 text-sm">
          🚀 More features coming soon
        </div>
      </div>
    </div>
  );
}
