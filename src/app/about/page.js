"use client";

// ℹ️ About Page — ShopNest ke baare mein jankari
// Sections: Hero, Who We Are, Stats, Features, CTA
// Yeh ek static page hai — koi API call ya state nahi

export default function About() {
  return (
    <div className="bg-stone-50 text-gray-800">
      {/* 🎯 HERO SECTION — Page ka top banner */}
      <div className="bg-gradient-to-r from-rose-300 via-orange-200 to-amber-100 py-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          About ShopNest
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-700">
          We deliver premium products with warmth, trust, and simplicity.
        </p>
      </div>

      {/* 👥 WHO WE ARE — Image aur text side by side */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <img
          src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600"
          alt="ShopNest team"
          className="rounded-xl shadow-lg hover:scale-105 transition duration-300"
          // BUG FIX: Image load fail hone par placeholder
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/600x400?text=ShopNest";
          }}
        />

        {/* Text content */}
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">
            Who We Are
          </h2>
          <p className="mb-4 text-gray-600 leading-relaxed">
            ShopNest is a modern e-commerce platform designed to deliver a
            smooth and cozy shopping experience. We focus on quality,
            affordability, and customer happiness.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to make online shopping simple, comfortable, and
            enjoyable for everyone.
          </p>
        </div>
      </div>

      {/* 📊 STATS — Key numbers dikhata hai */}
      <div className="bg-white py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold text-orange-500">10K+</h3>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-orange-500">500+</h3>
            <p className="text-gray-600">Products</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-orange-500">4.8⭐</h3>
            <p className="text-gray-600">Customer Rating</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-orange-500">24/7</h3>
            <p className="text-gray-600">Support</p>
          </div>
        </div>
      </div>

      {/* ✅ WHY CHOOSE US — 3 feature cards */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Why Choose Us?
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {/* Feature card 1 */}
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition text-center">
            <h3 className="text-xl font-semibold mb-2">🚀 Fast Delivery</h3>
            <p className="text-gray-600">
              Quick and reliable delivery to your doorstep.
            </p>
          </div>

          {/* Feature card 2 */}
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition text-center">
            <h3 className="text-xl font-semibold mb-2">💎 Premium Quality</h3>
            <p className="text-gray-600">
              Handpicked products with top-notch quality.
            </p>
          </div>

          {/* Feature card 3 */}
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition text-center">
            <h3 className="text-xl font-semibold mb-2">💳 Secure Payment</h3>
            <p className="text-gray-600">
              Safe and trusted payment experience.
            </p>
          </div>
        </div>
      </div>

      {/* 🛍️ CTA — Shop par jane ka invitation */}
      <div className="text-center py-16 bg-gradient-to-r from-amber-100 to-rose-100">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900">
          Ready to explore amazing products?
        </h2>
        <a
          href="/shop"
          className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-black transition font-semibold"
        >
          Start Shopping
        </a>
      </div>
    </div>
  );
}
