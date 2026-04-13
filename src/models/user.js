// 📄 User Model — MongoDB mein users ka structure define karta hai
// Mongoose schema batata hai ki ek user document mein kya-kya fields hongi

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Clerk ka unique user ID (authentication ke liye)
    clerkId: { type: String, required: true, unique: true },

    // User ka naam (optional — Clerk se milta hai)
    name: { type: String },

    // User ka email (optional)
    email: { type: String },

    // User ka role: normal user, seller, ya admin
    role: {
      type: String,
      enum: ["user", "seller", "admin"], // Sirf yeh teen values allowed hain
      default: "user", // By default har naya user "user" hoga
    },
  },
  {
    timestamps: true, // Automatically createdAt aur updatedAt add hoga
  },
);

// BUG FIX: Next.js mein model dobara define hone se error aata tha
// mongoose.models.User check karta hai — agar pehle se hai toh reuse karo
const USER = mongoose.models.User || mongoose.model("User", userSchema);

export default USER;
