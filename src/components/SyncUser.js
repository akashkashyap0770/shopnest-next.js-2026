"use client";

// 🔄 SyncUser — Clerk se logged-in user ko apne MongoDB mein save karta hai
// Jab bhi user sign in kare, uska data apne database mein bhi hona chahiye
// Yeh component Navbar ke saath layout mein render hota hai (UI nahi dikhata)

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function SyncUser() {
  // Clerk se user ki info lo
  const { user, isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    // Agar Clerk abhi load nahi hua, ya user signed in nahi, toh kuch mat karo
    if (!isLoaded || !isSignedIn || !user) return;

    const syncUser = async () => {
      try {
        // BUG FIX: Pehle sirf ek session mein ek baar sync karo
        // Pehle localStorage check tha — problem: agar user sign out karke
        // doosre account se sign in kare, toh naya user sync nahi hota tha
        // Ab hum clerkId bhi store karte hain compare karne ke liye
        const syncedId = localStorage.getItem("userSynced");

        // Agar yahi user pehle se sync hua hai toh dobara mat karo
        if (syncedId === user.id) return;

        // Apni API ko call karo user save karne ke liye
        const res = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerkId: user.id, // Clerk ka unique ID
            name: user.fullName, // User ka poora naam
            email: user.primaryEmailAddress?.emailAddress, // Primary email
          }),
        });

        const data = await res.json();

        if (res.ok) {
          console.log("✅ User synced:", data);
          // User ka Clerk ID store karo — next time same user ke liye skip karein
          localStorage.setItem("userSynced", user.id);
        } else {
          console.log("❌ Sync failed:", data);
        }
      } catch (error) {
        console.log("❌ SyncUser fetch error:", error);
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, user]); // Jab bhi in mein se kuch badle, re-run karo

  // Yeh component kuch render nahi karta — sirf background mein kaam karta hai
  return null;
}
