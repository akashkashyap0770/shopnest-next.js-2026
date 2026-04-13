// 📦 API Route: /api/products/[id]
// GET — Ek specific product fetch karo uske ID se
// URL example: /api/products/64abc123def456789

import { connectDB } from "@/lib/db";
import PRODUCT from "@/models/product";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req, context) {
  try {
    await connectDB();

    // BUG FIX: Next.js 15 mein params ko await karna zaroori hai
    // Pehle directly context.params.id use karte the — deprecation warning aata tha
    const { id } = await context.params;

    // ID valid MongoDB ObjectId hai ya nahi check karo
    // Invalid ID se query karne par Mongoose crash karta hai
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid product ID format" },
        { status: 400 },
      );
    }

    // Database mein product dhundo
    const product = await PRODUCT.findById(id).lean(); // lean() = fast plain object

    // Product nahi mila
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log("GET SINGLE PRODUCT ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
