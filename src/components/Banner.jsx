"use client";

// 🎠 Banner — Home page par auto-sliding image carousel (slideshow)
// Har 3 second mein automatically next slide dikhata hai
// User dots click karke bhi slide change kar sakta hai

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// 🔹 Slides ka data — title, image URL, aur button click karne par kahan jayein
// BUG FIX: Pehle yeh @/lib/data se import ho raha tha
// Ab directly yahan define kar diya taaki file missing ho toh error na aaye
const bannerSlides = [
  {
    title: "New Arrivals",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200",
    link: "/shop",
  },
  {
    title: "Top Deals",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200",
    link: "/shop",
  },
  {
    title: "Premium Collection",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
    link: "/shop",
  },
];

export default function Banner() {
  // current = abhi konsa slide dikh raha hai (index number)
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  // Abhi jo slide active hai uska data lo
  const slide = bannerSlides[current];

  // 🔄 Auto slide: har 3 second mein next slide par jao
  useEffect(() => {
    const interval = setInterval(() => {
      // (prev + 1) % length: Last slide ke baad wapis first par ao
      setCurrent((prev) => (prev + 1) % bannerSlides.length);
    }, 3000);

    // Cleanup: Component unmount hone par interval band karo
    // BUG FIX: Cleanup na hone par memory leak hota tha
    return () => clearInterval(interval);
  }, []); // Sirf ek baar — component mount par run karo

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      {/* 🖼️ BACKGROUND IMAGE — Current slide ki image */}
      <img
        src={slide.image}
        alt={slide.title}
        className="w-full h-full object-cover transition-all duration-700"
      />

      {/* 🌑 DARK OVERLAY — Image ke upar dark layer taaki text readable rahe */}
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-6">
        {/* Slide ka title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 transition-all duration-500">
          {slide.title} 🛍️
        </h1>

        {/* Subtitle — Sab slides ke liye same */}
        <p className="text-lg md:text-xl mb-6 max-w-2xl">
          Discover amazing deals every day at unbeatable prices!
        </p>

        {/* Shop Now button — Click karne par slide ke link par jao */}
        <button
          onClick={() => router.push(slide.link)}
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-white font-semibold transition"
        >
          Shop Now
        </button>
      </div>

      {/* 🔘 DOT INDICATORS — Niche dots, click karke slide change karo */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {bannerSlides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)} // Is dot ka slide dikhao
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              index === current
                ? "bg-white" // Active slide: solid white dot
                : "bg-white/40" // Inactive: transparent dot
            }`}
          />
        ))}
      </div>
    </div>
  );
}
