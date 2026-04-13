// 🛒 API Route: /api/orders
// GET  — Logged-in user ke saare orders fetch karo
// POST — Naya order create karo

import { connectDB } from "@/lib/db";
import ORDER from "@/models/order";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"; // BUG FIX: NextResponse use karo consistency ke liye

// 🟢 GET — User ke orders return karo
export async function GET() {
  try {
    await connectDB();

    // Clerk se current logged-in user lo (server side)
    const user = await currentUser();

    // Login nahi hai toh 401 Unauthorized return karo
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login." },
        { status: 401 },
      );
    }

    // Sirf is user ke orders lo (userId filter)
    // BUG FIX: sort add kiya — naye orders pehle dikhenge
    const orders = await ORDER.find({ userId: user.id })
      .sort({ createdAt: -1 }) // -1 = newest first
      .lean();

    return NextResponse.json(orders);
  } catch (error) {
    console.log("GET ORDERS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}

// 🟢 POST — Naya order create karo
export async function POST(req) {
  try {
    await connectDB();

    // Clerk se current logged-in user lo
    const user = await currentUser();

    // Login nahi hai toh 401 return karo
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login." },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { items, totalAmount } = body;

    // BUG FIX: Validation add kiya — pehle koi validation nahi tha
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Order must have at least one item" },
        { status: 400 },
      );
    }

    if (!totalAmount || totalAmount <= 0) {
      return NextResponse.json(
        { error: "Invalid total amount" },
        { status: 400 },
      );
    }

    // Order create karo — userId Clerk se automatically aa raha hai
    // Frontend se userId nahi aata (security ke liye — user apna ID fake nahi kar sakta)
    const newOrder = await ORDER.create({
      userId: user.id, // Clerk ka verified user ID
      items, // Cart ke products
      totalAmount, // Total price
    });

    return NextResponse.json(newOrder, { status: 201 }); // 201 = Created
  } catch (error) {
    console.log("CREATE ORDER ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 },
    );
  }
}
