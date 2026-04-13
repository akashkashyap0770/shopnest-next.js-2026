// Navigation links data (id, title, path)
// BUG FIX: Yeh data yahan define kar diya — pehle @/lib/data se import ho raha tha
// jo ek alag file hai aur miss ho sakti thi
export const navLinks = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Shop", path: "/shop" },
  { id: 3, title: "Orders", path: "/orders" },
  { id: 4, title: "About", path: "/about" },
  { id: 5, title: "Contact", path: "/contact" },
];

// 🔹 Banner Slides
export const bannerSlides = [
  {
    id: 1,
    title: "Big Sale 🔥",
    image:
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1600&q=80",
    link: "/shop",
  },
  {
    id: 2,
    title: "New Arrivals 🚀",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80",
    link: "/shop",
  },
  {
    id: 3,
    title: "Electronics Deals ⚡",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1600&q=80",
    link: "/shop",
  },
];

// 🔹 Products
export const products = [
  {
    id: "1",
    title: "iPhone 15",
    price: 79999,
    category: "Electronics",
    description: "Latest Apple iPhone with premium features",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    isFeatured: true,
  },
  {
    id: "2",
    title: "Running Shoes",
    price: 2999,
    category: "Fashion",
    description: "Comfortable running shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    isFeatured: true,
  },
  {
    id: "3",
    title: "Wrist Watch",
    price: 1999,
    category: "Accessories",
    description: "Stylish wrist watch",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    isFeatured: false,
  },
  {
    id: "4",
    title: "Headphones",
    price: 4999,
    category: "Electronics",
    description: "Noise cancelling headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    isFeatured: true,
  },
  {
    id: "5",
    title: "Laptop",
    price: 59999,
    category: "Electronics",
    description: "High performance laptop",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80",
    isFeatured: true,
  },
  {
    id: "6",
    title: "Backpack",
    price: 1499,
    category: "Fashion",
    description: "Durable travel backpack",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80",
    isFeatured: false,
  },
  {
    id: "7",
    title: "Sunglasses",
    price: 999,
    category: "Accessories",
    description: "Stylish sunglasses",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80",
    isFeatured: false,
  },
  {
    id: "8",
    title: "Smart TV",
    price: 45999,
    category: "Electronics",
    description: "4K Ultra HD Smart TV",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80",
    isFeatured: true,
  },
  {
    id: "9",
    title: "Gaming Mouse",
    price: 1299,
    category: "Electronics",
    description: "High precision gaming mouse",
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&q=80",
    isFeatured: false,
  },
  {
    id: "10",
    title: "Keyboard",
    price: 1999,
    category: "Electronics",
    description: "Mechanical keyboard",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80",
    isFeatured: false,
  },
  {
    id: "11",
    title: "Camera",
    price: 34999,
    category: "Electronics",
    description: "Professional DSLR camera",
    image:
      "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&q=80",
    isFeatured: true,
  },
  {
    id: "12",
    title: "Bluetooth Speaker",
    price: 2499,
    category: "Electronics",
    description: "Portable bluetooth speaker",
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80",
    isFeatured: false,
  },
];
