// 🛒 Order Model — MongoDB mein orders ka structure define karta hai

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // Kaun user ne order kiya (Clerk ka user ID string hota hai)
    userId: { type: String, required: true },

    // Order ke andar kitne products hain (ek array)
    items: [
      {
        // Konsa product hai (Product model ka reference)
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },

        // Product ka naam (save karte hain taaki baad mein product delete ho toh bhi dikhe)
        title: { type: String },

        // Product ki price at the time of order
        price: { type: Number },

        // Kitne quantity mein order kiya
        qty: { type: Number },

        // Product ki image
        image: { type: String },
      },
    ],

    // Total amount kitna tha
    totalAmount: { type: Number, required: true },

    // Order ka current status
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered"], // Sirf yeh values allowed
      default: "pending", // Naya order "pending" se start hoga
    },
  },
  {
    timestamps: true, // BUG FIX: timestamps add kiya — order kab hua yeh track hoga
  },
);

// Next.js mein model dobara define hone se error aata — isliye yeh check
const ORDER = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default ORDER;
