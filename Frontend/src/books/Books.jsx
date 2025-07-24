import React from 'react'
import Navbar from '../components/Navbar'
import Books from '../components/Books'
import Footer from '../components/Footer'

function book() {
  return (
    <>
     <Navbar />
     <div className="min-h-screen">
      <Books />
     </div>
     <Footer />
    </>
  )
}

export default book
