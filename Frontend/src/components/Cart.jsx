import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(stored);
  }, []);

  const updateLocalStorage = (items) => {
    setCartItems(items);
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const incrementQty = (id) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
    );
    updateLocalStorage(updated);
  };

  const decrementQty = (id) => {
    const updated = cartItems.map(item =>
      item.id === id && (item.qty || 1) > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    );
    updateLocalStorage(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    updateLocalStorage(updated);
  };

  const clearCart = () => {
    updateLocalStorage([]);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * (item.qty || 1),
    0
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>Your cart is empty.</p>
          <Link to="/books">
            <button className="mt-4 bg-pink-600 text-white px-5 py-2 rounded hover:bg-pink-700">
              Browse Books
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div key={item.id} className="border rounded-lg shadow-md p-4 flex flex-col">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 object-cover rounded mb-4"
                />
                <h2 className="text-lg font-bold text-gray-800">{item.title}</h2>
                <p className="text-gray-600 mb-1">by {item.name}</p>
                <p className="text-sm text-gray-500 mb-2">{item.genre} | ⭐ {item.rating}</p>
                <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                <p className="text-pink-600 font-bold mt-1">₹{item.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center mt-4 space-x-3">
                  <button
                    onClick={() => decrementQty(item.id)}
                    className="bg-gray-300 px-3 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="px-3">{item.qty || 1}</span>
                  <button
                    onClick={() => incrementQty(item.id)}
                    className="bg-gray-300 px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Summary & Checkout */}
          <div className="mt-12 text-center">
            <p className="text-xl font-semibold">Total: ₹{totalPrice.toFixed(2)}</p>

            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-2">Checkout</h2>
              <form className="max-w-md mx-auto text-left">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border border-gray-300 p-3 mb-4 rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 p-3 mb-4 rounded"
                />
                <input
                  type="text"
                  placeholder="Shipping Address"
                  className="w-full border border-gray-300 p-3 mb-4 rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
