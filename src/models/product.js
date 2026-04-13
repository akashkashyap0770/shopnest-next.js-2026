// 📦 Product Model — MongoDB mein products ka structure define karta hai

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // Product ka naam/title (e.g., "Nike Air Max")
    title: { type: String, required: true }, // BUG FIX: required add kiya

    // Product ki price (e.g., 999)
    price: { type: Number, required: true }, // BUG FIX: required add kiya

    // Product ki category (e.g., "Shoes", "Electronics")
    category: { type: String },

    // Product ki detail description
    description: { type: String },

    // Product ki image ka URL
    image: { type: String },

    // Kya yeh product "Featured" section mein dikhana hai?
    isFeatured: { type: Boolean, default: false }, // BUG FIX: default false add kiya

    // Kisne product add kiya (User ka MongoDB ID)
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true, // createdAt aur updatedAt auto-add hoga
  },
);

// Next.js mein model dobara define hone se error aata — isliye yeh check
const PRODUCT =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default PRODUCT;
