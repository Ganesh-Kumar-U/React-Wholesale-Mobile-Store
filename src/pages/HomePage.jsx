import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import HeroSlider from "../components/HeroSlider";
import QuickLinks from "../components/QuickLinks";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import S25blue from "../assets/S25_blue.png";
import S25skyblue from "../assets/S25_skyblue.png";
import S25white from "../assets/S25_white.png";
import Iphone16pro from "../assets/iPhone_16_Pro.png";
import Iphone16plus from "../assets/iPhone_16_Plus.png";
import Iphone13 from "../assets/iphone13.png";

// Products Data
const allProducts = [
  { id: 1, name: "Samsung Galaxy S25 (Blue)", price: "599", image: S25blue, stock: 25 },
  { id: 2, name: "Samsung Galaxy S25 (Sky Blue)", price: "599", image: S25skyblue, stock: 51 },
  { id: 3, name: "Samsung Galaxy S25 (White)", price: "599", image: S25white, stock: 12 },
  { id: 4, name: "iPhone 16 Pro Max (Gold)", price: "599", image: Iphone16pro, stock: 10 },
  { id: 5, name: "iPhone 16 Plus (Blue)", price: "599", image: Iphone16plus, stock: 28 },
  { id: 6, name: "iPhone 13 (Black)", price: "599", image: Iphone13, stock: 19 },
  { id: 7, name: "Samsung Galaxy S25 (White)", price: "599", image: S25white, stock: 12 },
  { id: 8, name: "iPhone 16 Pro Max (Gold)", price: "599", image: Iphone16pro, stock: 10 },
  { id: 9, name: "iPhone 16 Plus (Blue)", price: "599", image: Iphone16plus, stock: 28 },
  { id: 10, name: "iPhone 13 (Black)", price: "599", image: Iphone13, stock: 19 },
  { id: 11, name: "Samsung Galaxy S25 (Blue)", price: "599", image: S25blue, stock: 25 },
  { id: 12, name: "Samsung Galaxy S25 (Sky Blue)", price: "599", image: S25skyblue, stock: 51 },
  { id: 13, name: "Samsung Galaxy S25 (White)", price: "599", image: S25white, stock: 12 },
  { id: 14, name: "iPhone 16 Pro Max (Gold)", price: "599", image: Iphone16pro, stock: 10 },
  { id: 15, name: "iPhone 16 Plus (Blue)", price: "599", image: Iphone16plus, stock: 28 },
  { id: 16, name: "Samsung Galaxy S25 (Blue)", price: "599", image: S25blue, stock: 25 },
  { id: 17, name: "Samsung Galaxy S25 (Sky Blue)", price: "599", image: S25skyblue, stock: 51 },
  { id: 18, name: "Samsung Galaxy S25 (White)", price: "599", image: S25white, stock: 12 },
  { id: 19, name: "Samsung Galaxy S25 (Sky Blue)", price: "599", image: S25skyblue, stock: 51 },
  { id: 20, name: "Samsung Galaxy S25 (White)", price: "599", image: S25white, stock: 12 },
  { id: 21, name: "iPhone 16 Pro Max (Gold)", price: "599", image: Iphone16pro, stock: 10 },
];

const ITEMS_PER_PAGE = 6;

function HomePage({ onAddToCart, onUpdateQuantity, onRemoveItem, cartItems }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);

  // Get products for the current page
  const currentProducts = allProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="container mx-auto px-4 pb-8">
      {/* Top Section with Slider and Quick Links */}
      <div className="flex gap-6 mb-8 mt-8">
        <div className="w-4/5">
          <HeroSlider />
        </div>
        <div className="w-1/5">
          <QuickLinks />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-8">
          <button className="text-boost-orange border-b-2 border-boost-orange px-4 py-2 font-medium">
            Our Store
          </button>
          <button className="text-gray-500 px-4 py-2">Order Status</button>
          <button className="text-gray-500 px-4 py-2">Returns</button>
          <button className="text-gray-500 px-4 py-2">Messages</button>
          <button className="text-gray-500 px-4 py-2">Backorders</button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex gap-8">
        {/* Left Sidebar - Filters */}
        <div className="w-64">
          <Filters />
        </div>

        {/* Product Grid */}
        <div className="flex-grow">
          {/* Search & Sort */}
          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search here deals"
                className="w-[400px] pl-4 pr-10 py-2 border border-gray-300 rounded-lg"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="border border-gray-300 rounded-lg px-3 py-2">
                <option>Featured</option>
              </select>
            </div>
          </div>

          {/* Product Cards (6 per page) */}
          <div className="grid grid-cols-3 gap-6">
            {currentProducts.map((product) => {
              const cartItem = cartItems.find(item => item.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemoveItem={onRemoveItem}
                  isAdded={!!cartItem}
                  quantity={cartItem?.quantity || 1}
                />
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8 bg-white max-w-sm px-4 py-2 shadow-md rounded-lg mx-auto">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-md transition ${
                  currentPage === page ? "bg-gray-200 font-bold text-black" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
              className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
