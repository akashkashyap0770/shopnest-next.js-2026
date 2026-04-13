"use client";

// 📦 Orders Page — User ke saare orders dikhata hai
// API se orders fetch karta hai (sirf logged-in user ke)
// Har order mein: Order ID, status, items list, total amount

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // BUG FIX: router add kiya

export default function OrdersPage() {
  // isLoaded: Clerk fully load hua ya nahi
  // isSignedIn: User logged in hai ya nahi
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  // Orders ki list store karega
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // BUG FIX: isLoaded check karo — Clerk load hone se pehle isSignedIn false hoti hai
    // Isliye user logged in hote hue bhi pehle "Please login" flash karta tha
    if (!isLoaded) return;

    // Login nahi hai toh orders fetch mat karo
    if (!isSignedIn) {
      setLoading(false);
      return;
    }

    // API se orders fetch karo
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        // BUG FIX: Array check — API ne error object return kiya toh crash na ho
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Orders fetch error:", error);
        setLoading(false);
      });
  }, [isSignedIn, isLoaded]); // Jab bhi login status badle

  // Clerk load ho raha hai
  if (!isLoaded || loading) {
    return <p className="p-10 text-lg text-gray-600">Loading orders...</p>;
  }

  // User logged in nahi hai
  if (!isSignedIn) {
    return (
      <div className="p-10 text-center">
        <p className="text-lg text-gray-600 mb-4">
          Please login to view your orders.
        </p>
        {/* BUG FIX: Login page par jane ka button add kiya */}
        <button
          onClick={() => router.push("/sign-in")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">📦 My Orders</h1>

        {/* Koi order nahi hai */}
        {orders.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            No orders yet. Start shopping! 🛍️
          </div>
        ) : (
          // Orders ki list
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow p-6 space-y-4"
              >
                {/* ORDER HEADER: ID + Status badge */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-400">Order ID</p>
                    {/* Mono font se ID readable lagti hai */}
                    <p className="text-sm font-mono text-gray-600">
                      {order._id}
                    </p>
                  </div>

                  {/* Status badge — color status ke hisaab se badlega */}
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700" // Delivered = green
                        : order.status === "shipped"
                          ? "bg-blue-100 text-blue-700" // Shipped = blue
                          : order.status === "paid"
                            ? "bg-yellow-100 text-yellow-700" // Paid = yellow
                            : "bg-orange-100 text-orange-600" // Pending = orange
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* ORDER ITEMS: Har item ki image, title, qty, price */}
                <div className="space-y-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      {/* Item image — sirf tab dikhao jab ho */}
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 object-cover rounded-lg"
                          onError={(e) => {
                            // BUG FIX: Broken image fallback
                            e.target.style.display = "none";
                          }}
                        />
                      )}

                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.qty} × ₹{item.price}
                        </p>
                      </div>

                      {/* Item total */}
                      <p className="font-semibold">₹{item.qty * item.price}</p>
                    </div>
                  ))}
                </div>

                {/* ORDER TOTAL */}
                <div className="border-t pt-4 text-right">
                  <p className="text-lg font-bold text-gray-900">
                    Total: ₹{order.totalAmount}
                  </p>

                  {/* BUG FIX: Order date dikhao agar available ho */}
                  {order.createdAt && (
                    <p className="text-xs text-gray-400 mt-1">
                      Ordered on:{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
