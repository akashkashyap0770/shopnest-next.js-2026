# 🛍️ ShopNest – Full Stack E-Commerce App

🔗 **Live App:** https://shopnest-next-js-2026.vercel.app/
🔗 **GitHub Repository:** https://github.com/akashkashyap0770/shopnest-next.js-2026

A modern, fully responsive **Full Stack E-Commerce Web Application** built using **Next.js + MongoDB + Clerk Authentication + Tailwind CSS**.  
This project includes product listing, cart management, order placement, and secure user authentication — all in a single Next.js project without a separate backend.

---

## 🚀 Demo

🔗 **Live Website:** https://shopnest-next-js-2026.vercel.app/  
🔗 **GitHub Repository:** https://github.com/akashkashyap0770/shopnest-next.js-2026

---

## 🛠 Tech Stack

- ⚡ Next.js 15 (App Router)
- 🍃 MongoDB + Mongoose
- 🔐 Clerk (Authentication)
- 🎨 Tailwind CSS
- 🔔 React Hot Toast
- 🛒 React Context API (Cart & Search)
- ☁️ Vercel (Deployment)

---

## 📌 Key Features

- ✅ Full Stack — Frontend + Backend in one project (No Express needed)
- ✅ User Authentication (Sign Up, Sign In, Sign Out) via Clerk
- ✅ Product Listing with Search & Filter
- ✅ Featured Products Section
- ✅ Product Detail Page
- ✅ Add to Cart / Remove / Quantity Control
- ✅ Checkout & Order Placement
- ✅ My Orders Page with Order Status
- ✅ Persistent Cart (localStorage)
- ✅ Auto Image Slider (Banner)
- ✅ Newsletter Subscription
- ✅ Fully Responsive Layout
- ✅ Protected Routes (Middleware)
- ✅ Seller Dashboard (Coming Soon)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.js              # Home Page
│   ├── shop/                # All Products
│   ├── product/[id]/        # Product Detail (Dynamic Route)
│   ├── cart/                # Cart Page
│   ├── orders/              # My Orders
│   ├── about/               # About Page
│   ├── contact/             # Contact Page
│   ├── seller/              # Seller Dashboard
│   └── api/                 # Backend API Routes
│       ├── products/        # GET & POST products
│       ├── orders/          # GET & POST orders
│       └── users/           # Save user to DB
├── components/              # Reusable UI Components
├── context/                 # Cart & Search Context
├── lib/                     # MongoDB Connection
└── models/                  # Mongoose Schemas
```

---

## 🔌 API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Fetch all products |
| GET | `/api/products/[id]` | Fetch single product |
| POST | `/api/products` | Add new product |
| GET | `/api/orders` | Fetch user orders |
| POST | `/api/orders` | Place new order |
| POST | `/api/users` | Save user to DB |

---

## 🚀 Installation & Setup

Clone the repo:
```bash
git clone https://github.com/akashkashyap0770/shopnest-next.js-2026.git
```

Install dependencies:
```bash
npm install
```

Create `.env.local` file in root:
```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

Start dev server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

---

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key |

---

## ☁️ Deployment

This project is deployed on **Vercel**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

> **Note:** Add all environment variables in Vercel dashboard before deploying.

---

## 👨‍💻 Author

**Akash Kashyap**  
🔗 Portfolio: https://a-portfolio-2025.netlify.app/  
🔗 GitHub: https://github.com/akashkashyap0770
