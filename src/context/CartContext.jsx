"use client";

// 🛒 CartContext — Global cart state manage karta hai poore app mein
// Context API se hum cart ka data kisi bhi component mein access kar sakte hain
// bina har jagah props pass kiye

import { createContext, useContext, useState, useEffect } from "react";

// Context banao (ek "container" jo data share karega)
const CartContext = createContext();

// 🔹 Helper function: localStorage se cart load karo
// BUG FIX: typeof window check zaroori hai — Next.js server par window nahi hota
// Isliye server side render ke waqt error aata tha
const getInitialCart = () => {
  if (typeof window !== "undefined") {
    try {
      // BUG FIX: try-catch add kiya — agar localStorage mein corrupted data ho
      // toh JSON.parse crash karta tha, ab gracefully empty array return hoga
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.log("Cart load error:", error);
      return []; // Corrupted data ho toh empty cart se shuru karo
    }
  }
  return []; // Server side par empty array return karo
};

// 🟢 CartProvider: Yeh component poore app ko wrap karta hai
// Iske andar jo bhi components hain, woh sab cart use kar sakte hain
export function CartProvider({ children }) {
  // cartItems = cart mein jo products hain unki list
  const [cartItems, setCartItems] = useState(getInitialCart);

  // Jab bhi cartItems badlein, localStorage update karo
  // Taaki page refresh karne par cart ka data bana rahe
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.log("Cart save error:", error);
    }
  }, [cartItems]);

  // ➕ Cart mein product add karo
  const addToCart = (product) => {
    setCartItems((prev) => {
      // Check karo ki product pehle se cart mein hai ya nahi (_id se compare)
      const existing = prev.find((item) => item._id === product._id);

      if (existing) {
        // Pehle se hai toh sirf quantity badha do
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      // Naya product hai toh qty: 1 ke saath add karo
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // ➕ Quantity ek badha do
  const increaseQty = (_id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === _id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };

  // ➖ Quantity ek ghata do (agar 0 ho jaye toh cart se remove kar do)
  const decreaseQty = (_id) => {
    setCartItems(
      (prev) =>
        prev
          .map((item) =>
            item._id === _id ? { ...item, qty: item.qty - 1 } : item,
          )
          .filter((item) => item.qty > 0), // qty 0 wale items hata do
    );
  };

  // ❌ Product poora cart se hata do
  const removeFromCart = (_id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== _id));
  };

  // 🧹 Poora cart saaf karo (order place hone ke baad)
  const clearCart = () => {
    setCartItems([]);
    // BUG FIX: localStorage bhi clear karo — warna page refresh par cart wapis aa jaata tha
    localStorage.removeItem("cart");
  };

  // 💰 Total price calculate karo (price × qty, sabka sum)
  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  // 🔢 Total items count karo (sabki qty ka sum)
  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + item.qty, 0);

  // Yeh sab functions aur data context ke through share karo
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook — components mein easily cart use karne ke liye
// Usage: const { cartItems, addToCart } = useCart();
export const useCart = () => useContext(CartContext);
