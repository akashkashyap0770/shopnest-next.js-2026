// 🗂️ ProductGrid — Products ki grid layout dikhata hai
// Title, optional SearchBar aur products ke cards render karta hai
// Home page aur Shop page dono use karte hain ise

import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";

export default function ProductGrid({ title, products, showSearch }) {
  return (
    <div className="px-6 py-10 bg-stone-50">
      {/* HEADER: Title + optional SearchBar */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Section title (e.g., "🔥 Popular Products") */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </h2>

          {/* SearchBar sirf tab dikhao jab showSearch prop true ho */}
          {/* Home page: true (search dikhao), Shop page: false */}
          {showSearch && (
            <div className="w-full md:w-80">
              <SearchBar />
            </div>
          )}
        </div>

        <p className="text-gray-500 mt-2 text-sm">
          Discover amazing products curated just for you
        </p>
      </div>

      {/* PRODUCTS GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          // Products hain toh cards dikhao
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          // Koi product nahi mila (search result empty ya data load ho raha hai)
          <div className="col-span-full text-center py-20">
            <h3 className="text-xl font-semibold text-gray-700">
              No products found 😢
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
