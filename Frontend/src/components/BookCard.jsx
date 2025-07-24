import React from 'react';

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

  const handleBuyNow = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if item already in cart
    const index = existingCart.findIndex((book) => book.id === id);

    if (index > -1) {
      // If already in cart, increase quantity
      existingCart[index].quantity += 1;
    } else {
      // Else, add new item with quantity
      existingCart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert('Book added to cart!');
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300 dark:bg-gray-800 dark:text-white">
      <img
        src={image || 'https://via.placeholder.com/150x200'}
        alt={title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />

      <h2 className="text-xl font-semibold mb-1">{title}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">
        by {author} • {genre}
      </p>

      <p className="text-sm text-yellow-600 font-medium mb-2">Rating: {rating}⭐</p>

      <p className="text-sm text-gray-700 dark:text-gray-200 mb-2 line-clamp-2">
        {description}
      </p>

      <p className="font-bold text-pink-600 mb-1">₹{price}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {stock > 0 ? `${stock} in stock` : 'Out of Stock'}
      </p>

      <button
        onClick={handleBuyNow}
        className={`w-full px-4 py-2 rounded-lg text-white font-semibold transition ${
          stock > 0
            ? 'bg-pink-600 hover:bg-pink-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
        disabled={stock <= 0}
      >
        Buy Now
      </button>
    </div>
  );
}

export default BookCard;
