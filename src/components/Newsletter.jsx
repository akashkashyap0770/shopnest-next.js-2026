"use client";

// 💌 Newsletter — Email subscribe section
// User apna email enter karta hai aur Subscribe button click karta hai
// Toast notification se success/error dikhata hai

import { useState } from "react";
import toast from "react-hot-toast";

export default function Newsletter() {
  // Email input ki value store karega
  const [email, setEmail] = useState("");

  // Subscribe button click hone par
  const handleSubscribe = () => {
    // Validation: Email empty ho ya "@" na ho toh error dikhao
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email ❌");
      return; // Aage mat jao
    }

    // BUG FIX: Pehle koi actual API call nahi thi
    // Yahan aap apni newsletter API integrate kar sakte hain
    // Abhi ke liye success toast dikhate hain
    toast.success("Subscribed successfully 🎉");
    setEmail(""); // Input clear karo after subscribe
  };

  return (
    <div className="bg-gradient-to-r from-rose-400 via-orange-300 to-amber-200 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center text-gray-900">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Stay Connected 💌
        </h2>

        {/* Subtitle */}
        <p className="text-gray-700 mb-10">
          Get cozy deals, new arrivals & special offers straight to your inbox.
        </p>

        {/* EMAIL INPUT + BUTTON */}
        <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-4 items-center justify-center">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // User type kare toh update karo
            // BUG FIX: Enter key press karne par bhi subscribe ho
            onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
            className="w-full sm:w-80 px-4 py-3 rounded-lg text-gray-800 outline-none border border-gray-300 focus:ring-2 focus:ring-orange-400"
          />

          <button
            onClick={handleSubscribe}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-black transition transform hover:scale-105"
          >
            Subscribe
          </button>
        </div>

        {/* Trust text */}
        <p className="text-sm text-gray-700 mt-6">
          ☕ No spam. Just good vibes & useful updates.
        </p>
      </div>
    </div>
  );
}
