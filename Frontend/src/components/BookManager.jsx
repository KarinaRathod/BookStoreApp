import React, { useState } from "react";
import { PlusCircle, Trash2, Star, BookOpen, IndianRupee } from "lucide-react";
import toast from "react-hot-toast";

export default function BookManager({ books, onAddBook, onDeleteBook }) {
  const [formData, setFormData] = useState({
    title: "", name: "", price: "", genre: "", rating: "", stock: "", description: "", image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "rating" && (value < 0 || value > 5)) {
      toast.error("Rating must be between 0 and 5.");
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onAddBook(formData);
    // If the book was added successfully, clear the form
    if (success) {
      setFormData({
        title: "", name: "", price: "", genre: "", rating: "", stock: "", description: "", image: "",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Column 1: Add Book Form */}
      <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6 lg:h-fit sticky top-24">
        <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
          <PlusCircle className="w-6 h-6 mr-2 text-blue-500" />
          Add New Book
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input name="title" type="text" placeholder="Title" value={formData.title} onChange={handleInputChange} className="w-full p-3 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-blue-500" required />
          <input name="name" type="text" placeholder="Author" value={formData.name} onChange={handleInputChange} className="w-full p-3 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-blue-500" required />
          <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleInputChange} className="w-full p-3 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-blue-500" required />
          <input name="genre" type="text" placeholder="Genre" value={formData.genre} onChange={handleInputChange} className="w-full p-3 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-blue-500" required />
          <input name="rating" type="number" step="0.1" min="0" max="5" placeholder="Rating (0-5)" value={formData.rating} onChange={handleInputChange} className="w-full p-3 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-blue-500" required />
          <input name="stock" type="number" placeholder="Stock" value={formData.stock} onChange={handleInputChange} className="w-full p-3 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-blue-500" required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} className="w-full p-3 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-blue-500 resize-none h-24" required></textarea>
          <input name="image" type="text" placeholder="Image URL" value={formData.image} onChange={handleInputChange} className="w-full p-3 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-blue-500" required />
          <button type="submit" className="w-full p-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition-colors">
            Add Book
          </button>
        </form>
      </div>

      {/* Column 2: Book Inventory */}
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-4 text-emerald-600">Book Inventory</h2>
        <div className="grid gap-6">
          {books.map((book) => (
            <div key={book._id} className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center hover:shadow-lg transition-shadow">
              <img src={book.image} alt={book.title} className="w-24 h-32 object-cover rounded-lg shadow-md flex-shrink-0 mb-4 md:mb-0 md:mr-6" />
              <div className="flex-grow text-center md:text-left">
                <h4 className="text-xl font-bold text-gray-900 mb-1">{book.title}</h4>
                <p className="text-gray-600 text-sm italic">by {book.name}</p>
                <div className="mt-2 text-sm flex flex-wrap justify-center md:justify-start gap-x-4">
                  <p className="text-gray-600 flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-500" />{book.rating}</p>
                  <p className="text-gray-600 flex items-center"><BookOpen className="w-4 h-4 mr-1 text-blue-500" />{book.genre}</p>
                  <p className="text-gray-600 flex items-center"><IndianRupee className="w-4 h-4 mr-1" />{book.price}</p>
                  <p className="text-gray-600">Stock: {book.stock}</p>
                </div>
                <p className="mt-3 text-gray-500 text-sm">{book.description}</p>
              </div>
              <button onClick={() => onDeleteBook(book._id)} className="mt-4 md:mt-0 p-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}