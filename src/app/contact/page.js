"use client";

// 📞 Contact Page — User ShopNest se contact kar sakta hai
// BUG FIX: Pehle yeh client component nahi tha ("use client" missing tha)
// Form submit hone par toast notification dikhane ke liye "use client" zaroori hai
// Sections: Hero, Contact Form, Contact Info, Social Links, CTA

import { useState } from "react";
import toast from "react-hot-toast"; // BUG FIX: alert() ki jagah toast use karo

export default function Contact() {
  // Form ke teeno fields ki state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // BUG FIX: Form submit hone par validation aur feedback
  // Pehle form submit hone par kuch nahi hota tha (no handler tha)
  const handleSubmit = (e) => {
    e.preventDefault(); // Page reload mat karo

    // Validation: Saare fields bhar ke hone chahiye
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill all fields ❌");
      return;
    }

    // Email format basic check
    if (!email.includes("@")) {
      toast.error("Please enter a valid email ❌");
      return;
    }

    // Yahan aap apni email API integrate kar sakte hain (e.g., EmailJS, Resend)
    // Abhi ke liye success dikhate hain
    toast.success("Message sent successfully! We'll reply soon 📩");

    // Form clear karo after submit
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="bg-stone-50 text-gray-800">
      {/* 🎯 HERO SECTION */}
      <div className="bg-gradient-to-r from-rose-300 via-orange-200 to-amber-100 py-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Contact Us
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-700">
          We'd love to hear from you! Reach out anytime and we'll respond
          quickly.
        </p>
      </div>

      {/* MAIN SECTION — Form + Info side by side */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
        {/* 📝 CONTACT FORM */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Send a Message
          </h2>

          {/* BUG FIX: onSubmit handler add kiya, controlled inputs banaye */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-300"
            />

            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-300"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-300"
            />

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-black transition font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* 📍 CONTACT INFO */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Get in Touch
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Have questions about products, orders, or support? Our team is
              always ready to help you with quick responses.
            </p>
          </div>

          {/* INFO CARDS */}
          <div className="space-y-4">
            <div className="p-5 bg-white rounded-xl shadow hover:shadow-md transition">
              <p className="font-semibold">📧 Email</p>
              <p className="text-gray-600">support@shopnest.com</p>
            </div>

            <div className="p-5 bg-white rounded-xl shadow hover:shadow-md transition">
              <p className="font-semibold">📞 Phone</p>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>

            <div className="p-5 bg-white rounded-xl shadow hover:shadow-md transition">
              <p className="font-semibold">📍 Address</p>
              <p className="text-gray-600">Gurgaon, Haryana, India</p>
            </div>
          </div>

          {/* SOCIAL LINKS */}
          <div>
            <h3 className="font-semibold mb-3">Follow Us</h3>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md hover:bg-blue-50 transition">
                Facebook
              </button>
              <button className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md hover:bg-pink-50 transition">
                Instagram
              </button>
              <button className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md hover:bg-sky-50 transition">
                Twitter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA BOTTOM */}
      <div className="text-center py-16 bg-gradient-to-r from-amber-100 to-rose-100">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900">
          We're always here to help 🙂
        </h2>
        <p className="text-gray-600">
          Expect a reply within 24 hours from our support team.
        </p>
      </div>
    </div>
  );
}
