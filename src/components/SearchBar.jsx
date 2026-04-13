"use client";

// 🔍 SearchBar — User yahan type karta hai products search karne ke liye
// Jo kuch type hoga woh SearchContext mein store hoga
// ProductGrid us value se products filter karega

import { useSearch } from "@/context/SearchContext";

export default function SearchBar() {
  // SearchContext se search value aur setter lo
  const { search, setSearch } = useSearch();

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={search} // Input ki value context se aati hai
      onChange={(e) => setSearch(e.target.value)} // User type kare toh context update karo
      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-300 bg-white"
    />
  );
}
