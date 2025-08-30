import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // ✅ 1. Import useNavigate
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext'; // ✅ 2. Import the auth hook

// --- Helper Components (Icons & BookCard) ---
const ShoppingCart = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg> );
const Heart = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg> );
const BookCard = ({ item, onBuyNow, onAddToWishlist }) => ( <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-200"><div className="aspect-w-16 aspect-h-9 overflow-hidden"><img src={item.image || `https://placehold.co/400x300/E0F2F7/000?text=${item.title.replace(/\s/g, '+')}`} alt={item.title} className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/E0F2F7/000?text=${item.title.replace(/\s/g, '+')}`; }} /></div><div className="p-4 flex flex-col flex-grow"><h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3><p className="text-gray-600 text-sm mb-2">by {item.author || 'Unknown Author'}</p><div className="flex justify-between items-center mb-3"><span className="text-pink-600 font-bold text-lg">₹{item.price ? item.price.toFixed(2) : 'N/A'}</span><span className="text-yellow-500 text-sm flex items-center gap-1"> {'★'.repeat(Math.round(item.rating) || 0)}{'☆'.repeat(5 - (Math.round(item.rating) || 0))} {item.rating ? ` (${item.rating}/5)` : ''}</span></div><p className="text-gray-700 text-sm line-clamp-3 mb-4 flex-grow">{item.description || 'No description available.'}</p><div className="mt-auto"><span className="inline-block bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-4">{item.genre || 'Uncategorized'}</span><div className="flex gap-3 mt-4"><button onClick={() => onBuyNow(item)} className="flex-1 flex items-center justify-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-700 transition duration-300 ease-in-out transform hover:scale-105"><ShoppingCart /> Buy Now</button><button onClick={() => onAddToWishlist(item)} className="p-2 rounded-lg bg-gray-100 text-pink-600 border border-pink-600 hover:bg-pink-600 hover:text-white transition"><Heart /></button></div></div></div></div> );

// --- Main Books Component ---

function Books() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("All");

    const { addToCart } = useCart();
    const { addToWishlist } = useWishlist();
    const { authUser, logout } = useAuth(); // ✅ 3. Get user state and logout function
    const navigate = useNavigate(); // ✅ 4. Initialize navigate for redirection

    const getBooks = async () => {
        try {
            const res = await axios.get("http://localhost:4001/books");
            const standardizedBooks = res.data.map(book => ({ ...book, id: book._id }));
            setBooks(standardizedBooks);
            setFilteredBooks(standardizedBooks);
        } catch (error) {
            console.error("Failed to fetch books:", error);
        }
    };

    useEffect(() => {
        getBooks();
    }, []);

    useEffect(() => {
        if (selectedGenre === "All") {
            setFilteredBooks(books);
        } else {
            setFilteredBooks(books.filter(book => book.genre === selectedGenre));
        }
    }, [selectedGenre, books]);

    const genres = ["All", ...new Set(books.map(book => book.genre).filter(Boolean))];

    const handleBuyNow = (book) => {
        addToCart(book);
    };
    
    const handleAddToWishlist = (book) => {
        addToWishlist(book);
    };

    // ✅ 5. Create a logout handler function
    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to home page after logout
    };

    return (
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 font-inter">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row items-center justify-between mt-28 mb-12 gap-8">
                <div className="md:w-1/2 text-center md:text-left">
                    <h1 className="text-4xl font-extrabold md:text-5xl leading-tight text-gray-800">
                        Discover Your Next <span className="text-pink-600">Literary Adventure!</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-600">
                        Dive into a world where every page holds a new story. Explore everything from thrillers to cookbooks!
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                        <Link to="/">
                            <button className="bg-pink-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-pink-700 transition">
                                Back to Home
                            </button>
                        </Link>
                        <Link to="/wishlist">
                            <button className="bg-white text-pink-600 border border-pink-600 px-6 py-3 rounded-lg shadow-lg hover:bg-pink-50 transition">
                                View Wishlist
                            </button>
                        </Link>
                        {/* ✅ 6. Conditionally render the Logout button */}
                        {authUser && (
                            <button 
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
                <div className="md:w-1/2">
                    <img src="https://img.freepik.com/premium-vector/stack-books-with-cup-coffee-top-it_1253202-15819.jpg" alt="Books Banner" className="rounded-lg w-full" />
                </div>
            </div>

            {/* Genre Filter */}
            <div className="mb-6">
                <label htmlFor="genre-select" className="block mb-2 text-gray-700 font-medium">Filter by Genre:</label>
                <select id="genre-select" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="p-3 border border-gray-300 rounded-md w-full sm:w-auto">
                    {genres.map((genre, idx) => (
                        <option key={idx} value={genre}>{genre}</option>
                    ))}
                </select>
            </div>

            {/* Books Grid */}
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Our Curated Collection</h2>
            {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12">
                    {filteredBooks.map((item) => (
                        <BookCard key={item.id} item={item} onBuyNow={handleBuyNow} onAddToWishlist={handleAddToWishlist} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-600 py-12">
                    {books.length === 0 ? <p>Loading books...</p> : <p>No books found for the selected genre.</p>}
                </div>
            )}
        </div>
    );
}

export default Books;