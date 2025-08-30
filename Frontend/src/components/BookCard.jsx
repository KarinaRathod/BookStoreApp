import React from 'react';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext'; // ✅ 1. Import wishlist context

// --- Helper Icon Component ---
const HeartIcon = ({ isFilled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    // Conditionally fill the heart and change color based on `isFilled` prop
    fill={isFilled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-colors duration-300 ${isFilled ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);


function BookCard({ item }) {
  const {
    id,
    title,
    author,
    genre,
    price,
    rating,
    description,
    stock,
    image,
  } = item;

  const { addToCart } = useCart();
  // ✅ 2. Get wishlist state and functions from the context
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  // ✅ 3. Check if the current book is in the wishlist
  const isWishlisted = wishlistItems.some(wishlistItem => wishlistItem.id === id);

  // ✅ 4. Create a handler to toggle the wishlist status
  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist(item);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col hover:shadow-lg transition duration-300 dark:bg-gray-800 dark:text-white">
      <img
        src={image || 'https://via.placeholder.com/150x200'}
        alt={title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />

      <div className="flex-grow">
        <h2 className="text-xl font-semibold mb-1">{title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">
          by {author} • {genre}
        </p>

        <p className="text-sm text-yellow-600 font-medium mb-2">Rating: {rating}⭐</p>

        <p className="text-sm text-gray-700 dark:text-gray-200 mb-2 line-clamp-2">
          {description}
        </p>
      </div>

      <div className="mt-auto pt-4">
        <p className="font-bold text-pink-600 mb-1">₹{price}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {stock > 0 ? `${stock} in stock` : 'Out of Stock'}
        </p>
        
        {/* ✅ 5. Create a container for the buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => addToCart(item)}
            className={`flex-1 px-4 py-2 rounded-lg text-white font-semibold transition ${
              stock > 0
                ? 'bg-pink-600 hover:bg-pink-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={stock <= 0}
          >
            Buy Now
          </button>
          
          {/* ✅ 6. Add the wishlist button */}
          <button
            onClick={handleWishlistToggle}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle Wishlist"
          >
            <HeartIcon isFilled={isWishlisted} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;