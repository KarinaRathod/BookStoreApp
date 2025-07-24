import React from 'react';
import './About.css'; // Make sure this file is present for custom animations
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="relative overflow-hidden min-h-screen dark:bg-slate-900 bg-white dark:text-white text-gray-800">
      {/* Abstract Wave Background - You can replace this with a more complex SVG or CSS animation */}
      <div className="absolute inset-0 z-0 opacity-10 wave-bg"></div>

      <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Welcome to <span className="text-blue-500 dark:text-blue-400">BookWave</span> 🌊📚
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Dive into a world of stories, knowledge, and endless possibilities.
          </p>
        </div>

        {/* Core Description Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-16 animate-fade-in">
          <p className="text-lg md:text-xl leading-relaxed mb-6">
            <strong>BookWave</strong> is your premier online destination for discovering, Browse, and purchasing books across an expansive range of genres. We believe in the power of stories to connect, inspire, and transform.
          </p>
          <p className="text-lg md:text-xl leading-relaxed">
            Whether your passion lies in thrilling mysteries, heartwarming romances, epic fantasies, profound non-fiction, or captivating biographies, BookWave is meticulously designed to bring the sheer joy of reading directly to your fingertips.
         
          </p> 
        </div>
         

        {/* Centered Back Button with space below */}
        <div className="flex justify-center mb-16"> {/* Use flex and justify-center to center it, mb-16 for space below */}
          <Link to="/">
            <button className="bg-pink-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-pink-700 duration-300 text-lg font-semibold">
              Back to Home
            </button>
          </Link>
        </div>

        {/* Feature Section with Images */}
        {/* Changed grid to 3 columns by default, will wrap to 2 then 1 on smaller screens */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {/* Feature 1: Vast Collection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center feature-card animate-fade-in">
            <img
              src="https://collegeinfogeek.com/wp-content/uploads/2018/11/Essential-Books.jpg"
              alt="Illustration of a large library or many books"
              className="w-32 h-32 mx-auto mb-4 rounded-full object-cover shadow-md feature-image"
            />
            <h3 className="text-2xl font-semibold mb-3">Expansive Selection</h3>
            <p className="text-md opacity-90">
              Explore millions of titles from bestsellers to hidden gems across every genre imaginable.
            </p>
          </div>

          {/* Feature 2: Personalized Recommendations */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center feature-card animate-fade-in animation-delay-200">
            <img
              src="https://www.shutterstock.com/image-photo/bewitched-book-magic-glows-darkness-600nw-393367726.jpg"
              alt="Illustration of a person reading with personalized suggestions"
              className="w-32 h-32 mx-auto mb-4 rounded-full object-cover shadow-md feature-image"
            />
            <h3 className="text-2xl font-semibold mb-3">Curated for You</h3>
            <p className="text-md opacity-90">
              Our intelligent recommendation engine helps you discover your next favorite read effortlessly.
            </p>
          </div>

          {/* Feature 3: Seamless Experience */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center feature-card animate-fade-in animation-delay-400">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/020/713/360/small_2x/shoping-icon-isolate-shopping-cart-flat-icon-vector.jpg"
              alt="Illustration of a smooth, easy checkout process"
              className="w-32 h-32 mx-auto mb-4 rounded-full object-cover shadow-md feature-image"
            />
            <h3 className="text-2xl font-semibold mb-3">Effortless Shopping</h3>
            <p className="text-md opacity-90">
              Enjoy a user-friendly interface and a secure, streamlined checkout process.
            </p>
          </div>

          {/* Feature 4: Vibrant Community */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center feature-card animate-fade-in animation-delay-600">
            <img
              src="https://img.freepik.com/premium-vector/community-building-connecting-people-ideas-vibrant-neighborhood_1305385-73671.jpg"
              alt="Illustration of people connecting or a community chat icon"
              className="w-32 h-32 mx-auto mb-4 rounded-full object-cover shadow-md feature-image"
            />
            <h3 className="text-2xl font-semibold mb-3">Vibrant Community</h3>
            <p className="text-md opacity-90">
              Join fellow book lovers, share reviews, and engage in inspiring discussions.
            </p>
          </div>

          {/* Feature 5: Accessible Anywhere */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center feature-card animate-fade-in animation-delay-800">
            <img
              src="https://www.wedopulse.com/cmr/assets/media/img-feature-2@3x.a18e2122.png"
              alt="Illustration of a person reading on a tablet or phone"
              className="w-32 h-32 mx-auto mb-4 rounded-full object-cover shadow-md feature-image"
            />
            <h3 className="text-2xl font-semibold mb-3">Read Anywhere, Anytime</h3>
            <p className="text-md opacity-90">
              Access your favorite reads on any device, seamlessly picking up where you left off.
            </p>
          </div>

          {/* Feature 6: Eco-Friendly Options */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center feature-card animate-fade-in animation-delay-1000">
            <img
              src="https://csrbox.org/company/proj_img/1634789686How-to-Promote-Environmental-Sustainability-Within-Your-Company.jpg"
              alt="Illustration of a green leaf or recycled material"
              className="w-32 h-32 mx-auto mb-4 rounded-full object-cover shadow-md feature-image"
            />
            <h3 className="text-2xl font-semibold mb-3">Sustainable Choices</h3>
            <p className="text-md opacity-90">
              Support our eco-friendly initiatives with options for digital books and recycled packaging.
            </p>
          </div>
        </div>

        {/* Call to Action/Final Note */}
        <div className="text-center mt-16 animate-fade-in-up">
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            At BookWave, we are more than just an online store; we are a community built around the shared love of reading.
          </p>
          <p className="text-lg md:text-xl font-semibold">
            Start your next literary adventure with BookWave today!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;