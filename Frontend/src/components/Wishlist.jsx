import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

// Reusable icons (or import them from a shared file)
const ShoppingCart = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg> );
const Trash = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg> );

// You can reuse your BookCard component, but for simplicity, here's a dedicated card for the wishlist view.
const WishlistCard = ({ item, onAddToCart, onRemove }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col">
        <img
            src={item.image || `https://placehold.co/400x300/E0F2F7/000?text=${item.title.replace(/\s/g, '+')}`}
            alt={item.title}
            className="w-full h-48 object-cover"
        />
        <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-3">by {item.author || 'Unknown Author'}</p>
            <span className="text-pink-600 font-bold text-lg mb-4">₹{item.price ? item.price.toFixed(2) : 'N/A'}</span>
            <div className="mt-auto flex gap-3">
                 <button
                    onClick={() => onAddToCart(item)}
                    className="flex-1 flex items-center justify-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-700 transition"
                >
                    <ShoppingCart /> Add to Cart
                </button>
                <button
                    onClick={() => onRemove(item.id)}
                    className="p-2 rounded-lg bg-red-100 text-red-600 border border-red-600 hover:bg-red-600 hover:text-white transition"
                >
                    <Trash />
                </button>
            </div>
        </div>
    </div>
);


function Wishlist() {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    return (
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 font-inter pt-28 pb-12">
            <div className="text-center mb-12">
                 <h1 className="text-4xl font-extrabold md:text-5xl text-gray-800">
                    My <span className="text-pink-600">Wishlist</span>
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    Your collection of curated books. Ready to make one yours?
                </p>
            </div>

            {wishlistItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlistItems.map((item) => (
                        <WishlistCard
                            key={item.id}
                            item={item}
                            onAddToCart={addToCart}
                            onRemove={removeFromWishlist}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 px-6 bg-gray-50 rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-700">Your Wishlist is Empty</h2>
                    <p className="text-gray-500 mt-2">
                        Looks like you haven't added any books yet.
                    </p>
                    <Link to="/books">
                        <button className="mt-6 bg-pink-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-pink-700 transition">
                            Explore Books
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
    
}

export default Wishlist;