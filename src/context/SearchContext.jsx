"use client";

// 🔍 SearchContext — Global search state manage karta hai
// Jab user Navbar mein search kare, toh HomePage pe products filter hojayein
// Yeh context dono components ke beech data share karta hai

import { createContext, useContext, useState } from "react";

// Context banao
const SearchContext = createContext();

// 🟢 SearchProvider: Poore app ko wrap karo taaki search state available rahe
export function SearchProvider({ children }) {
  // search = user ne abhi kya type kiya hai search box mein
  const [search, setSearch] = useState(""); // Default: kuch nahi likha

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

// Custom hook — easily search state access karne ke liye
// Usage: const { search, setSearch } = useSearch();
export const useSearch = () => useContext(SearchContext);
