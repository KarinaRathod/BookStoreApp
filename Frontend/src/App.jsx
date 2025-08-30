import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext'; 

// Import your components
import Navbar from './components/Navbar';
import Home from './home/Home';
import Books from './books/Books';
import Signup from './components/Signup';
import ContactUs from './components/ContactUs';
import About from './components/About';
import Cart from './components/Cart';
import AdminDashboard from './components/AdminDashboard';
import Checkout from './components/Checkout';
import Wishlist from './components/Wishlist'; 

function App() {
  return (
    <CartProvider>
      <WishlistProvider> 
        <div className="dark:bg-slate-900 dark:text-white min-h-screen">
          <Toaster position="top-center" />
          <Navbar />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </div>
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;