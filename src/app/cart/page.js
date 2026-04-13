"use client";

// 🛒 Cart Page — User ke cart mein jo products hain woh dikhata hai
// Features: Items list, qty change, remove item, clear cart, checkout

import { useCart } from "@/context/CartContext";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // BUG FIX: router add kiya redirect ke liye
import toast from "react-hot-toast"; // BUG FIX: alert() ki jagah toast use karo

export default function CartPage() {
  // Cart se saare functions aur data lo
  const {
    cartItems,
    decreaseQty,
    increaseQty,
    removeFromCart,
    getTotalPrice,
    clearCart,
  } = useCart();

  // Clerk se login status lo (user logged in hai ya nahi)
  const { isSignedIn } = useUser();
  const router = useRouter();

  // BUG FIX: Hydration issue fix — Server aur client mein cart alag dikhta tha
  // Solution: Pehle kuch render mat karo, phir client par actual cart dikhao
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Browser mein load hua — ab cart dikhao
  }, []);

  // Server side render mein yeh dikhega
  if (!mounted) {
    return <p className="p-10 text-lg">Loading cart...</p>;
  }

  // 🛒 CHECKOUT function
  const handleCheckout = async () => {
    // Login check
    if (!isSignedIn) {
      toast.error("Please login first!");
      router.push("/sign-in");
      return;
    }

    // BUG FIX: Cart empty hai toh checkout mat karo
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    try {
      // Order create karne ke liye API call karo
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems, // Cart ke saare items
          totalAmount: getTotalPrice(), // Total price
          // Note: userId backend mein Clerk se automatically milta hai
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        // BUG FIX: data.error check ke saath res.ok bhi check karo
        toast.error(data.error || "Something went wrong ❌");
        return;
      }

      toast.success("Order placed successfully ✅");
      clearCart(); // Cart clear karo
      router.push("/orders"); // BUG FIX: Orders page par redirect karo
    } catch (err) {
      console.log("Checkout error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-stone-50">
      <h1 className="text-3xl font-bold mb-6">🛒 My Cart</h1>

      {/* Cart empty hai */}
      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-gray-600 mb-4">Your cart is empty</p>
          {/* BUG FIX: Empty cart mein shop par jane ka button add kiya */}
          <button
            onClick={() => router.push("/shop")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping 🛍️
          </button>
        </div>
      ) : (
        <>
          {/* 🛒 CART ITEMS LIST */}
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row justify-between items-center border bg-white p-4 rounded-lg gap-4"
              >
                {/* LEFT: Image + Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    className="w-20 h-20 object-cover rounded"
                    alt={item.title}
                    onError={(e) => {
                      // BUG FIX: Broken image fallback
                      e.target.src =
                        "https://via.placeholder.com/80?text=No+Img";
                    }}
                  />
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {item.title}
                    </h2>
                    <p className="text-gray-500 text-sm">₹{item.price} each</p>
                  </div>
                </div>

                {/* MIDDLE: Quantity Controls */}
                <div className="flex items-center gap-3">
                  {/* Quantity ghata do */}
                  <button
                    onClick={() => decreaseQty(item._id)}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded font-bold text-lg transition"
                  >
                    -
                  </button>

                  <span className="text-lg font-semibold w-6 text-center">
                    {item.qty}
                  </span>

                  {/* Quantity badha do */}
                  <button
                    onClick={() => increaseQty(item._id)}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded font-bold text-lg transition"
                  >
                    +
                  </button>
                </div>

                {/* RIGHT: Item Total + Remove button */}
                <div className="text-right">
                  {/* Item total = price × qty */}
                  <p className="font-semibold text-gray-900">
                    ₹{item.price * item.qty}
                  </p>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 text-sm mt-2 hover:text-red-700 transition"
                  >
                    Remove ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 💰 CART SUMMARY: Total + Action Buttons */}
          <div className="mt-10 flex flex-col items-end gap-4">
            {/* Total price */}
            <h2 className="text-2xl font-bold text-gray-900">
              Total: ₹{getTotalPrice()}
            </h2>

            {/* Buttons */}
            <div className="flex gap-4">
              {/* Cart saaf karo */}
              <button
                onClick={clearCart}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
              >
                Clear Cart 🧹
              </button>

              {/* Order place karo */}
              <button
                onClick={handleCheckout}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
              >
                Checkout ✅
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
