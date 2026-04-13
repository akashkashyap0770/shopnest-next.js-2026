"use client";

// 🏠 Home Page — ShopNest ka main landing page
// Sections: Banner (slider), Popular Products, Featured Products, Newsletter, Footer

import { useState, useEffect } from "react";
import { useSearch } from "@/context/SearchContext";
import Banner from "@/components/Banner";
import ProductGrid from "@/components/ProductGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  // SearchContext se current search value lo
  const { search } = useSearch();

  // Sabhi products store karega (API se aayenge)
  const [products, setProducts] = useState([]);

  // BUG FIX: Loading state add kiya
  // Pehle products load hone se pehle "No products found" flash karta tha
  const [loading, setLoading] = useState(true);

  // Component load hone par API se products fetch karo
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        // BUG FIX: Ensure data is array before setting
        if (Array.isArray(data)) {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("Products fetch error:", error);
        setLoading(false);
      });
  }, []); // Sirf ek baar run karo

  // Search filter: User ne jo type kiya hai usse products filter karo
  // toLowerCase: case-insensitive search (Nike = nike = NIKE)
  const popularProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      {/* 🎠 HERO SLIDER */}
      <Banner />

      {/* 🔥 POPULAR PRODUCTS — Saare products (searchable) */}
      {/* loading true hai toh empty array pass karo (no flash) */}
      <ProductGrid
        title="🔥 Popular Products"
        products={loading ? [] : popularProducts}
        showSearch={true} // Search bar dikhao
      />

      {/* ⭐ FEATURED PRODUCTS — isFeatured: true wale products */}
      <FeaturedProducts />

      {/* 💌 NEWSLETTER SUBSCRIPTION */}
      <Newsletter />

      {/* 🦶 FOOTER */}
      <Footer />
    </div>
  );
}
