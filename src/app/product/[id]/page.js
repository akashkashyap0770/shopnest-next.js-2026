"use client";

// 📄 Product Detail Page — Ek product ki full detail dikhata hai
// URL: /product/[id] — id MongoDB ka _id hota hai
// Features: Image, title, description, price, Add to Cart, Buy Now

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";

export default function ProductDetails() {
  // URL se product id lo (e.g., /product/abc123 → id = "abc123")
  const params = useParams();
  const id = params?.id;

  const router = useRouter();
  const { isSignedIn } = useUser();
  const { addToCart } = useCart();

  // Product data store karega
  // null = abhi load ho raha hai, false = product nahi mila
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // ID available hone par product fetch karo
  useEffect(() => {
    // BUG FIX: id valid string hai ya nahi check karo
    if (!id || typeof id !== "string") return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);

        // BUG FIX: Response ok nahi hai (e.g., 404) toh product false set karo
        if (!res.ok) {
          setProduct(false);
          return;
        }

        const data = await res.json();

        // API ne error object return kiya toh bhi false
        if (data.error) {
          setProduct(false);
        } else {
          setProduct(data); // Product data set karo
        }
      } catch (error) {
        console.log("Product fetch error:", error);
        setProduct(false);
      } finally {
        setLoading(false); // Loading hamesha false karo (success ya error dono mein)
      }
    };

    fetchProduct();
  }, [id]); // id badle toh dobara fetch karo

  // ⏳ LOADING STATE
  if (loading) {
    return (
      <div className="p-10 text-center text-lg text-gray-600">
        Loading product...
      </div>
    );
  }

  // ❌ PRODUCT NOT FOUND
  if (!product) {
    return (
      <div className="p-10 text-center text-xl font-semibold text-gray-700">
        Product not found 😢
      </div>
    );
  }

  // 🛒 ADD TO CART handler
  const handleAddToCart = () => {
    // Login nahi hai toh sign-in par redirect karo
    if (!isSignedIn) {
      toast.error("Please login first!");
      router.push("/sign-in");
      return;
    }

    addToCart(product); // Cart mein add karo
    toast.success("Added to cart 🛒");
  };

  return (
    <div className="bg-stone-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center bg-white p-8 rounded-2xl shadow-lg">
        {/* 🖼️ PRODUCT IMAGE */}
        <div className="overflow-hidden rounded-xl">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[400px] object-cover rounded-xl hover:scale-105 transition duration-300"
            // BUG FIX: Image load fail hone par placeholder dikhao
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x400?text=No+Image";
            }}
          />
        </div>

        {/* 📝 PRODUCT DETAILS */}
        <div className="space-y-5">
          {/* Category badge */}
          {product.category && (
            <span className="inline-block px-3 py-1 text-sm bg-orange-100 text-orange-600 rounded-full">
              {product.category}
            </span>
          )}

          {/* Product title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {product.title}
          </h1>

          {/* Product description */}
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Price */}
          <div className="text-3xl font-bold text-gray-900">
            ₹{product.price}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-black transition font-semibold w-full"
            >
              Add to Cart 🛒
            </button>

            {/* Buy Now — Cart mein add karo aur seedha cart par le jao */}
            <button
              onClick={() => {
                handleAddToCart();
                // BUG FIX: Pehle wali code mein handleAddToCart ke andar
                // router.push tha — ab yahan karte hain kyunki addToCart async nahi hai
                router.push("/cart");
              }}
              className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition font-semibold w-full"
            >
              Buy Now ⚡
            </button>
          </div>

          {/* EXTRA TRUST INFO */}
          <div className="pt-6 border-t text-sm text-gray-500 space-y-1">
            <p>🚚 Free Delivery Available</p>
            <p>🔁 7 Days Return Policy</p>
            <p>🔒 Secure Checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
}
