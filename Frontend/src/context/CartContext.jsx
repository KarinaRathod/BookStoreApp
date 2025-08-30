import React, { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

// Create the Cart Context
const CartContext = createContext();

// Function to get the initial cart state from localStorage
const getInitialCart = () => {
  try {
    // Using "cartItems" as the key
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Failed to parse cart from localStorage", error);
    return [];
  }
};

// The Cart Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getInitialCart());

  // Persist the cart state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to add a book to the cart
  const addToCart = (book) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    const alreadyInCart = cartItems.find((item) => item.id === book.id);
    if (alreadyInCart) {
      toast("This book is already in your cart");
      return;
    }

    setCartItems([...cartItems, { ...book, quantity: 1 }]);
    toast.success("Added to cart");
  };

  // Function for "Buy Now" button
  const buyNow = (book) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("Please login to buy an item");
      return false;
    }

    const alreadyInCart = cartItems.find((item) => item.id === book.id);
    if (!alreadyInCart) {
      setCartItems((prevItems) => [...prevItems, { ...book, quantity: 1 }]);
      toast.success("Added to cart");
    }
    return true;
  };

  // Function to remove an item from the cart
  const removeFromCart = (bookId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== bookId));
    toast.success("Item removed from cart");
  };

  // Function to update the entire cart state
  const updateCart = (updatedItems) => {
    setCartItems(updatedItems);
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared");
  };
  
  // ✅ ADDED: Function to handle user logout
  const logout = async () => {
    localStorage.removeItem("user"); // Remove user from storage
    setCartItems([]); // Clear the cart state completely
    toast.success("Logged out successfully!");

  };

  return (
    <CartContext.Provider
      // ✅ ADDED: 'logout' function is now available to any component using the context
      value={{
        cartItems,
        addToCart,
        buyNow,
        removeFromCart,
        updateCart,
        clearCart,
        logout,
      }}
    >
      {children}
      <Toaster />
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart Context
export const useCart = () => useContext(CartContext);