import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';

function Cards({ item }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [rating, setRating] = useState(0);

  // Load wishlist status from localStorage
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (wishlist.includes(item.id)) {
      setIsWishlisted(true);
    }

    // Generate random rating between 3.0 to 5.0 only once if not stored
    const savedRating = localStorage.getItem(`rating-${item.id}`);
    if (savedRating) {
      setRating(parseFloat(savedRating));
    } else {
      const randomRating = (Math.random() * 1 + 4).toFixed(1);
      setRating(parseFloat(randomRating));
      localStorage.setItem(`rating-${item.id}`, randomRating);
    }
  }, [item.id]);

  // Handle wishlist toggle with persistence
  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    let updatedWishlist;

    if (isWishlisted) {
      updatedWishlist = wishlist.filter((id) => id !== item.id);
    } else {
      updatedWishlist = [...wishlist, item.id];
    }

    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setIsWishlisted(!isWishlisted);
  };

  // Handle rating click
  const handleRatingClick = (newRating) => {
    setRating(newRating);
    localStorage.setItem(`rating-${item.id}`, newRating);
  };

  // Render star rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`cursor-pointer transition ${
            i <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          onClick={() => handleRatingClick(i)}
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden w-full max-w-sm mx-auto flex flex-col justify-between transform transition duration-300 hover:scale-105 hover:shadow-blue-300 mt-5 dark:bg-slate-900 dark:text-white dark:border">

      {/* Image */}
      <div className="aspect-[6/5] overflow-hidden bg-gray-100">

        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x240?text=No+Image';
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 ">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
          <span className="text-xs bg-purple-200 text-purple-700 rounded px-2 py-1">{item.category}</span>
        </div>

        <p className="text-sm text-gray-600">{item.name}</p>

        <div className="flex items-center justify-between">
          <p className="text-green-600 font-bold text-base">
            ₹{item.price === 0 ? 'Free' : item.price}
          </p>
          <div className="flex items-center gap-1">{renderStars()}</div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center pt-2">
          <button className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-sm">
            Read Now
          </button>
          <button
            onClick={toggleWishlist}
            className="text-red-500 hover:scale-110 transition"
            aria-label="Wishlist Toggle"
          >
            {isWishlisted ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cards;

