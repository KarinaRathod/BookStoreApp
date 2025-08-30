import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

// Create the context
export const WishlistContext = createContext();

// Create the provider component
export const WishlistProvider = ({ children }) => {
    // Load initial wishlist from localStorage
    const initialWishlist = localStorage.getItem('wishlist')
        ? JSON.parse(localStorage.getItem('wishlist'))
        : [];

    const [wishlistItems, setWishlistItems] = useState(initialWishlist);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    // Function to add a book to the wishlist
    const addToWishlist = (book) => {
        const isAlreadyInWishlist = wishlistItems.find((item) => item.id === book.id);

        if (isAlreadyInWishlist) {
            toast.error(`"${book.title}" is already in your wishlist!`);
        } else {
            setWishlistItems((prevItems) => [...prevItems, book]);
            toast.success(`"${book.title}" added to wishlist!`);
        }
    };

    // Function to remove a book from the wishlist
    const removeFromWishlist = (bookId) => {
        setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== bookId));
        toast.success("Item removed from wishlist.");
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

// Custom hook to use the WishlistContext
export const useWishlist = () => useContext(WishlistContext);