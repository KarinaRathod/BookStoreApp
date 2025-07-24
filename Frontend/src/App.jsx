import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './home/Home'
import Books from './books/Books'
import Signup from './components/Signup'
import ContactUs from './components/ContactUs';
import About from './components/About';
import Cart from './components/Cart';

function App() {
  return (
    <div className="dark:bg-slate-900 dark:text-white">
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<Books />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/about" element={<About />} />
      <Route path="/cart" element={<Cart />} />

       
      </Routes>
    </div>
  )
}

export default App
