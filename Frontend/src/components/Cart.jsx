// In src/components/Cart.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { Plus, Minus, Trash2, LogOut } from 'lucide-react'; // Added LogOut icon

function Cart() {
  const navigate = useNavigate();
  // ✅ Get the new 'logout' function from the context
  const { cartItems, updateCart, removeFromCart, clearCart: contextClearCart, logout } = useCart();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      toast.error("Please log in to view your cart");
      navigate("/");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  // ✅ Create a handler for the logout action
  const handleLogout = () => {
    logout(); // This will clear user data and the cart
    navigate("/login"); // Redirect to the login page
  };

  if (!user) return null;

  const incrementQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  const decrementQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(updated);
  };

  const clearCart = () => {
    contextClearCart();
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-100 dark:bg-slate-900 min-h-screen p-4 sm:p-8 font-sans pt-28">
      <div className="max-w-screen-xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">🛒 Your Cart</h1>
          {/* ✅ Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition-colors shadow-md"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-300 p-8">
            <p className="text-xl">Your cart is empty.</p>
            <Link to="/books">
              <button className="mt-6 bg-pink-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-pink-700 transition-colors shadow-md">
                Browse Books
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm p-4 flex flex-col hover:shadow-md transition-shadow"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="flex-grow">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400">by {item.author}</p>
                    <p className="text-pink-600 font-bold mt-2">₹{item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center mt-4 space-x-3">
                    <button
                      onClick={() => decrementQty(item.id)}
                      className="bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-white w-8 h-8 rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3 text-lg font-medium">{item.quantity}</span>
                    <button
                      onClick={() => incrementQty(item.id)}
                      className="bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-white w-8 h-8 rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-4 w-full bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-full hover:bg-red-200 transition-colors flex items-center justify-center"
                  >
                    <Trash2 size={18} className="mr-2" />
                    Remove
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-gray-50 dark:bg-slate-700/50 rounded-lg shadow-inner flex flex-col sm:flex-row justify-between items-center">
              <div className="text-xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-0">
                Total: <span className="text-pink-600">₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={clearCart}
                  className="bg-gray-300 dark:bg-slate-600 text-gray-800 dark:text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-400 transition-colors shadow-md"
                >
                  Clear Cart
                </button>
                <Link to="/checkout">
                  <button className="bg-green-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-600 transition-colors shadow-md">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;