// 📦 API Route: /api/products
// GET  — Saare products fetch karo
// POST — Naya product add karo

import { connectDB } from "@/lib/db";
import PRODUCT from "@/models/product";
import { NextResponse } from "next/server";

// 🟢 GET — Saare products return karo
export async function GET() {
  try {
    await connectDB();

    // Database se saare products lo
    // BUG FIX: lean() add kiya — plain JS objects return karta hai
    // Mongoose documents ki jagah, faster aur lightweight hai
    const products = await PRODUCT.find().lean();

    return NextResponse.json(products);
  } catch (error) {
    console.log("GET PRODUCTS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

// 🟢 POST — Naya product create karo
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // Validation: title aur price zaroori hain
    if (!body.title || !body.price) {
      return NextResponse.json(
        { error: "Title and price are required" },
        { status: 400 },
      );
    }

    // BUG FIX: price ko number mein convert karo
    // Frontend se string aayi ho sakti hai
    body.price = Number(body.price);

    // Naya product create karo
    const product = await PRODUCT.create(body);

    return NextResponse.json(product, { status: 201 }); // 201 = Created
  } catch (error) {
    console.log("POST PRODUCT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 },
    );
  }
}
