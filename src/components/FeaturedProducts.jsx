"use client";

// ⭐ FeaturedProducts — isFeatured: true wale products dikhata hai
// API se products fetch karta hai aur filter karke max 6 dikhata hai

import { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid";

export default function FeaturedProducts() {
  // Featured products ki list store karega
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // BUG FIX: Loading state add kiya — pehle "No products found" flash karta tha
  // Jab tak data load ho, loading dikhao
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API se sabhi products fetch karo
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        // BUG FIX: Check karo ki data array hai — agar API error return kare
        // toh data.filter crash karta tha
        if (Array.isArray(data)) {
          // Sirf woh products lo jinki isFeatured: true ho
          // aur max 6 dikhao
          const featured = data.filter((p) => p.isFeatured).slice(0, 6);
          setFeaturedProducts(featured);
        }
        setLoading(false); // Data aa gaya, loading false karo
      })
      .catch((error) => {
        console.log("Featured products fetch error:", error);
        setLoading(false); // Error par bhi loading false karo
      });
  }, []); // Sirf ek baar — component mount par

  // Data load ho raha hai toh kuch mat dikhao
  if (loading) return null;

  return (
    <ProductGrid
      title="⭐ Featured Products"
      products={featuredProducts}
      showSearch={false} // Featured section mein search nahi chahiye
    />
  );
}
