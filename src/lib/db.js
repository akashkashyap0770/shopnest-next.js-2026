// ✅ MongoDB se connection banane ka utility function
// BUG FIX: Pehle har request par naya connection ban raha tha
// Ab hum "cached" connection use karte hain — ek baar connect hua toh
// dobara connect nahi karta, wohi purana connection reuse hota hai

import mongoose from "mongoose";

// 🔹 Yeh variable Node.js ke global object mein store hota hai
// Toh Next.js ke hot-reload par bhi connection reset nahi hota
let cached = global.mongoose;

if (!cached) {
  // Pehli baar: ek empty object banao jisme connection store hoga
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  // Agar pehle se connected hai toh wohi return karo (naya connect mat karo)
  if (cached.conn) {
    return cached.conn;
  }

  // Agar connect karne ki process chal rahi hai toh uska wait karo
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        bufferCommands: false, // Connection se pehle queries queue mat karo
      })
      .then((mongooseInstance) => {
        console.log("MongoDB Connected Successfully 🚀");
        return mongooseInstance;
      });
  }

  // Connection complete hone ka wait karo aur store karo
  cached.conn = await cached.promise;
  return cached.conn;
};
