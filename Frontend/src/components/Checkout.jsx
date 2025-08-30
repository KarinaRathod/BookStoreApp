import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { User, Mail, Phone, MapPin, CreditCard, ShoppingCart, IndianRupee, LogOut } from 'lucide-react';
import { useCart } from "../context/CartContext"; 

function Checkout({ navigate }) {
  // ✅ Get cart state and functions from the global context
  const { cartItems, clearCart } = useCart();

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'Credit Card',
    upiId: '',
  });

  const [errors, setErrors] = React.useState({});

  // Calculate total price from the real cart items
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;

    if (!formData.name.trim()) newErrors.name = 'Full Name is required.';
    if (!formData.address.trim()) newErrors.address = 'Shipping Address is required.';
    if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address.';
    if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Phone number must be exactly 10 digits.';
    if (formData.paymentMethod === 'UPI' && !upiRegex.test(formData.upiId)) {
      newErrors.upiId = 'Please enter a valid UPI ID (e.g., name@bank).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogout = () => {
    toast.success("You have been logged out.");
    setTimeout(() => {
        navigate('/login');
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
        toast.error("Your cart is empty. Please add items before checking out.");
        return;
    }

    if (!validateForm()) {
      toast.error('Please fix the errors in the form before submitting.');
      return;
    }

    const orderDetails = {
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      },
      items: cartItems.map(item => ({
        bookId: item._id || item.id, // Handles different ID property names
        title: item.title,
        quantity: item.quantity,
        price: item.price
      })),
      total: totalPrice,
      paymentMethod: formData.paymentMethod,
      status: "Pending",
    };
    
    try {
      await axios.post('http://localhost:4001/orders', orderDetails);
      
      toast.success('Your order has been placed! Thank you for your purchase. 🚀');
      clearCart();
      
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to place order. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <div className="max-w-screen-xl container mx-auto px-4">
        <div className="flex justify-center items-center relative mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800">Checkout</h1>
            <button 
                onClick={handleLogout}
                className="absolute right-0 flex items-center px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors"
            >
                <LogOut className="mr-2" size={20} />
                Logout
            </button>
        </div>
        
        {cartItems.length === 0 ? (
            <div className="text-center bg-white p-12 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700">Your Cart is Empty</h2>
                <p className="text-gray-500 mt-2">Add some books to your cart to proceed.</p>
                <button 
                    onClick={() => navigate('/books')}
                    className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                >
                    Continue Shopping
                </button>
            </div>
        ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping and Payment Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shipping & Payment Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              
              <div>
                <label htmlFor="name" className="sr-only">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input type="text" id="name" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} className={`w-full p-3 pl-10 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 outline-none`} />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="sr-only">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input type="email" id="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} className={`w-full p-3 pl-10 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 outline-none`} />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="sr-only">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input type="tel" id="phone" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} className={`w-full p-3 pl-10 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 outline-none`} />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="address" className="sr-only">Shipping Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-4 -translate-y-1/2 text-gray-400" size={20} />
                  <textarea id="address" name="address" placeholder="Shipping Address" value={formData.address} onChange={handleInputChange} className={`w-full p-3 pl-10 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none h-24`}></textarea>
                </div>
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
              
              <fieldset>
                <legend className="text-lg font-medium text-gray-700 mb-2">Payment Method</legend>
                <div className="flex flex-wrap items-center gap-4">
                    <label className="flex items-center cursor-pointer">
                        <input type="radio" name="paymentMethod" value="Credit Card" checked={formData.paymentMethod === 'Credit Card'} onChange={handleInputChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                        <span className="ml-2 text-gray-700">Credit Card</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input type="radio" name="paymentMethod" value="UPI" checked={formData.paymentMethod === 'UPI'} onChange={handleInputChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                        <span className="ml-2 text-gray-700">UPI</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input type="radio" name="paymentMethod" value="Cash on Delivery" checked={formData.paymentMethod === 'Cash on Delivery'} onChange={handleInputChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                        <span className="ml-2 text-gray-700">Cash on Delivery</span>
                    </label>
                </div>
              </fieldset>

              {formData.paymentMethod === 'UPI' && (
                <div>
                  <label htmlFor="upiId" className="sr-only">UPI ID</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input type="text" id="upiId" name="upiId" placeholder="UPI ID (e.g., yourname@bank)" value={formData.upiId} onChange={handleInputChange} className={`w-full p-3 pl-10 border ${errors.upiId ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 outline-none`} />
                  </div>
                  {errors.upiId && <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>}
                </div>
              )}

              <button type="submit" className="w-full p-4 bg-emerald-500 text-white font-bold text-lg rounded-lg shadow-md hover:bg-emerald-600 transition-colors duration-300 flex items-center justify-center">
                Place Order
                <IndianRupee className="ml-2" size={22} />
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 bg-white p-8 rounded-lg shadow-md h-fit sticky top-28">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <ShoppingCart className="mr-2" /> Order Summary
            </h2>
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item._id || item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-semibold text-gray-700">{item.title}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;