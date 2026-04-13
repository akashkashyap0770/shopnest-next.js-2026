// 🦶 Footer — Page ke sabse niche dikhta hai
// Quick links, support links, contact info aur social buttons hain
// Yeh ek static component hai — koi state ya API call nahi

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* MAIN FOOTER CONTENT — 4 columns grid */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        {/* 1️⃣ LOGO + SHORT DESCRIPTION */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">ShopNest</h2>
          <p className="text-sm">
            Your one-stop destination for premium products at the best prices.
          </p>
        </div>

        {/* 2️⃣ QUICK LINKS — Main pages ke links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-white transition">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* 3️⃣ SUPPORT LINKS — Help pages */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2">
            {/* BUG FIX: cursor-pointer aur hover transition add kiya */}
            <li className="hover:text-white cursor-pointer transition">FAQ</li>
            <li className="hover:text-white cursor-pointer transition">
              Shipping
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Returns
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* 4️⃣ CONTACT INFO + SOCIAL LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <p>Email: support@shopnest.com</p>
          <p>Phone: +91 98765 43210</p>

          {/* Social Media Buttons */}
          <div className="flex gap-3 mt-4">
            <span className="bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 cursor-pointer transition">
              Facebook
            </span>
            <span className="bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 cursor-pointer transition">
              Instagram
            </span>
            <span className="bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 cursor-pointer transition">
              Twitter
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR — Copyright */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © 2026 ShopNest. All rights reserved.
      </div>
    </footer>
  );
}
