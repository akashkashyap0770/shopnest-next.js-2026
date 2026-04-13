// 👤 API Route: /api/users
// POST — Naya user MongoDB mein save karo (ya existing check karo)
// Yeh route SyncUser component call karta hai jab user login karta hai

import { connectDB } from "@/lib/db";
import USER from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Pehle MongoDB se connect karo
    await connectDB();

    // Request body se data lo
    const body = await req.json();
    const { clerkId, name, email } = body;

    // Validation: clerkId aur email zaroori hain
    if (!clerkId || !email) {
      return NextResponse.json(
        { error: "Missing required fields: clerkId and email" },
        { status: 400 }
      );
    }

    // Check karo ki user pehle se database mein hai ya nahi
    let user = await USER.findOne({ clerkId });

    if (!user) {
      // Naya user hai toh create karo
      user = await USER.create({ clerkId, name, email });
      console.log("✅ New user created:", user.email);
    } else {
      // Pehle se hai — kuch karne ki zaroorat nahi
      console.log("⚡ User already exists:", user.email);
    }

    // User data return karo (frontend ko confirmation milegi)
    return NextResponse.json(user);

  } catch (error) {
    console.log("❌ USER SAVE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to save user" },
      { status: 500 }
    );
  }
}