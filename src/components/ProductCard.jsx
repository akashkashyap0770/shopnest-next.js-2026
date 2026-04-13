// 🃏 ProductCard — Ek product ka card UI
// Product ki image, title, price aur category dikhata hai
// Click karne par product detail page par jata hai

import Link from "next/link";
// Note: Regular <img> tag use kar rahe hain onError fallback ke saath
// Next.js Image component ke liye domain config zaroori hoti hai jo complex hai

export default function ProductCard({ product }) {
  return (
    // Product ke _id se detail page ka URL banate hain: /product/[id]
    <Link href={`/product/${product._id}`}>
      <div className="bg-white border rounded-xl p-4 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition duration-300">
        {/* 🖼️ PRODUCT IMAGE */}
        <div className="overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.title || "Product image"} // BUG FIX: fallback alt text
            className="h-44 w-full object-cover hover:scale-105 transition duration-300"
            // BUG FIX: onError handler — agar image load na ho toh placeholder dikhao
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x200?text=No+Image";
            }}
          />
        </div>

        {/* 📝 PRODUCT DETAILS */}
        <div className="mt-3 space-y-1">
          {/* Title — zyada lamba ho toh 2 lines mein cut ho jayega */}
          <h2 className="font-semibold text-gray-900 line-clamp-2">
            {product.title}
          </h2>

          {/* Price */}
          <p className="text-lg font-bold text-gray-900">₹{product.price}</p>

          {/* Category badge — sirf tab dikhao jab category ho */}
          {product.category && (
            <span className="inline-block mt-1 text-xs px-2 py-1 bg-orange-100 text-orange-600 rounded-full">
              {product.category}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
