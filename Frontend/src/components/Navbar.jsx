import React, { useEffect, useState } from 'react';
import Login from './Login';
import { Link } from 'react-router-dom';

function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [sticky, setSticky] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const element = document.documentElement;

  // Theme setup
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // Sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load cart items (For demonstration, keep this as is. In a real app,
  // consider a global state management solution like Context API or Redux)
  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(storedCart);
    } catch (error) {
      console.error("Failed to parse cart items from localStorage:", error);
      setCartItems([]); // Reset cart if parsing fails
    }
  }, []);

  // Update cart items in local storage whenever cartItems state changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);


  const navItems = (
    <>
      <li><Link to="/" className="hover:text-pink-500 transition duration-200">Home</Link></li>
      <li><Link to="/books" className="hover:text-pink-500 transition duration-200">Books</Link></li>
      <li><Link to="/contact" className="hover:text-pink-500 transition duration-200">Contact</Link></li>
      <li><Link to="/about" className="hover:text-pink-500 transition duration-200">About</Link></li>
    </>
  );

  return (
    <div className={`max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 
      ${sticky ? "shadow-md bg-white dark:bg-slate-900 transition-all ease-in-out duration-300" : ""}`}>
      <div className="navbar dark:bg-slate-900 dark:text-white px-0">
        <div className="navbar-start">
          {/* Dropdown for mobile */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 dark:bg-slate-800 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {navItems}
              {/* Cart link in mobile dropdown */}
              <li>
                <Link to="/cart" className="relative hover:text-pink-500 transition duration-200">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Cart
                    {cartItems.length > 0 && (
                      <span className="ml-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {cartItems.length}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="text-3xl font-bold cursor-pointer text-gray-800 dark:text-white">
            Book<span className="text-pink-600">Wave</span>
          </Link>
        </div>

        <div className="navbar-end space-x-2 md:space-x-4">
          {/* Desktop Nav Items */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-2">
              {navItems}
            </ul>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block">
            <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-full dark:border-gray-700 bg-gray-100 dark:bg-slate-800 hover:border-pink-500 transition duration-200">
              <input type="text" className="grow outline-none bg-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="Search books" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70 text-gray-500 dark:text-gray-400">
                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
              </svg>
            </label>
          </div>

          {/* Theme Toggle (Sun/Moon icon) - Now with your provided SVG paths */}
          <label className="swap swap-rotate btn btn-ghost btn-circle bg-gray-100 dark:bg-slate-800">
            {/* this hidden checkbox controls the state */}
            {/* Added onChange handler and checked prop to control state */}
            <input type="checkbox" className="theme-controller" checked={theme === "dark"} onChange={() => setTheme(theme === "light" ? "dark" : "light")} />

            {/* sun icon */}
            <svg
              className="swap-off h-7 w-7 fill-current text-yellow-500" // Reduced size to h-7 w-7 for consistency
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-on h-7 w-7 fill-current text-blue-300" // Reduced size to h-7 w-7 for consistency
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          {/* Cart Icon */}
          <Link to="/cart" className="relative hidden md:flex items-center text-gray-700 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition duration-200 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Login Button */}
          <div>
            <a className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300 cursor-pointer" onClick={() => document.getElementById("my_modal_3").showModal()}>
              Login
            </a>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;