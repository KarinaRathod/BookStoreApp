import React, { useState, useEffect } from 'react';
import BookCard from './BookCard'; // updated import
import list2 from '../../public/list2.json';
import { Link } from 'react-router-dom';

function Books() {
  const [filteredBooks, setFilteredBooks] = useState(list2);
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = ["All", ...new Set(list2.map((book) => book.genre))];

  useEffect(() => {
    if (selectedGenre === "All") {
      setFilteredBooks(list2);
    } else {
      setFilteredBooks(list2.filter(book => book.genre === selectedGenre));
    }
  }, [selectedGenre]);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-28 mb-12 gap-8">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-extrabold md:text-5xl leading-tight text-gray-800">
            Discover Your Next <span className="text-pink-600">Literary Adventure!</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Dive into a world where every page holds a new story. Explore everything from thrillers to cookbooks!
          </p>
          <div className="mt-8 flex justify-center md:justify-start gap-4">
            <Link to="/">
              <button className="bg-pink-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-pink-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
        <div className="aspect-[6/5] overflow-hidden flex justify-center">
          <img src="https://img.freepik.com/premium-vector/stack-books-with-cup-coffee-top-it_1253202-15819.jpg" />
        </div>
      </div>

      {/* Genre Filter */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-700 font-medium">Filter by Genre:</label>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          {genres.map((genre, idx) => (
            <option key={idx} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      {/* Books Grid Section */}
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Our Curated Collection
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((item) => (
          <BookCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Books;
