import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import BookManager from "./BookManager";
import OrderManager from "./OrderManager";

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const verificationComplete = useRef(false);

  // ... (all your functions like getAuthConfig, fetchBooks, handleAddBook, etc. remain the same)
  // Helper to get auth token for API requests
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return { headers: { "x-auth-token": token } };
  };

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:4001/books");
      setBooks(res.data);
    } catch (err) {
      toast.error("Failed to load books");
    }
  };

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:4001/orders", getAuthConfig());
      setOrders(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      toast.error("Failed to load orders");
    }
  };

  // Handle adding a new book
  const handleAddBook = async (bookData) => {
    try {
      await axios.post("http://localhost:4001/books", bookData, getAuthConfig());
      toast.success("Book added successfully!");
      fetchBooks(); // Re-fetch books to update the list
      return true; // Indicate success to child component
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error adding book.";
      toast.error(errorMessage);
      return false; // Indicate failure
    }
  };

  // Handle deleting a book
  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/books/${id}`, getAuthConfig());
      toast.success("Book deleted successfully!");
      fetchBooks(); // Re-fetch books
    } catch (err) {
      toast.error("Error deleting book.");
    }
  };

  // Handle order status updates
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await axios.patch(
        `http://localhost:4001/orders/${orderId}/status`,
        { status: newStatus },
        getAuthConfig()
      );
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: res.data.status } : order
        )
      );
      toast.success(`Order status updated to ${newStatus}!`);
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  // Handle admin logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully.");
    navigate("/");
  };

  // Verify admin on component mount
  useEffect(() => {
    const verifyAdmin = async () => {
      if (verificationComplete.current) return;
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized access. Please log in.");
        navigate("/");
        return;
      }
      try {
        const res = await axios.get("http://localhost:4001/user/me", {
          headers: { "x-auth-token": token },
        });
        if (res.data.role !== "admin") {
          toast.error("Access denied: Admins only.");
          navigate("/");
        } else {
          if (!verificationComplete.current) {
            toast.success("Admin Login Successful!");
          }
          fetchBooks();
          fetchOrders();
          verificationComplete.current = true;
        }
      } catch (err) {
        toast.error("Session expired or invalid. Please log in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    verifyAdmin();
  }, [navigate]);

  if (loading) {
    // ... loading UI remains the same
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {/* ... */}
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      {/* 👇 THIS IS THE MODIFIED SECTION 👇 */}
      <header className="bg-white shadow-lg p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-emerald-600">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 md:px-4 md:py-2 bg-red-500 text-white rounded-full font-semibold shadow-md hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <LogOut className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
            Logout
          </button>
        </div>
      </header>

      {/* The main content now needs padding at the top to not be hidden by the new header */}
      <main className="container mx-auto my-8 space-y-12 p-4 md:p-0">
        <BookManager
          books={books}
          onAddBook={handleAddBook}
          onDeleteBook={handleDeleteBook}
        />
        <OrderManager orders={orders} onStatusChange={handleStatusChange} />
      </main>
    </div>
  );
}