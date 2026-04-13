"use client";

// 🛍️ Shop Page — Saare products ki listing
// API se products fetch karta hai aur ProductGrid mein dikhata hai
// Yahan search bar nahi hai (sirf Home page par hai)

import { useEffect, useState } from "react";
import ProductGrid from "@/components/ProductGrid";

export default function ShopPage() {
  // Sabhi products store karega
  const [products, setProducts] = useState([]);

  // BUG FIX: Loading state add kiya
  // Pehle "No products found" flash karta tha data aane se pehle
  const [loading, setLoading] = useState(true);

  // Component mount hone par API se products fetch karo
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        // BUG FIX: Array check — agar API error object return kare toh crash na ho
        if (Array.isArray(data)) {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("Shop products fetch error:", error);
        setLoading(false);
      });
  }, []); // Sirf ek baar — component mount par

  return (
    <div>
      {/* Page heading */}
      <h1 className="max-w-6xl mx-auto text-3xl font-bold p-6">🛍️ Shop</h1>

      {/* Products grid — loading mein empty array pass karo */}
      <ProductGrid
        title="All Products"
        products={loading ? [] : products}
        showSearch={false} // Shop page par search bar nahi chahiye
      />
    </div>
  );
}
