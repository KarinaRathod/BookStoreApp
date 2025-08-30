import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast'; // Assuming you have react-hot-toast installed

function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    console.log('Contact Form Data:', data);
    // In a real application, you would send this data to your backend here
    // e.g., using axios.post('/api/contact', data)

    toast.success('Your message has been sent successfully!'); // Use toast for better feedback
    reset(); // Clear form after submission
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-slate-950 dark:to-black p-4">
      <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-lg relative transform transition-all duration-300 hover:scale-[1.01]">
        
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            We'd love to hear from you! Please fill out the form below.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
              {...register('name', { required: "Name is required" })}
            />
            {errors.name && (
              <p className="mt-1 text-red-600 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
              {...register('email', { 
                  required: "Email is required",
                  pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address"
                  }
              })}
            />
            {errors.email && (
              <p className="mt-1 text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Message</label>
            <textarea
              id="message"
              placeholder="Type your message here..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-all duration-200 resize-y" // Added resize-y
              rows={5} // Increased rows for more space
              {...register('message', { required: "Message is required" })}
            />
            {errors.message && (
              <p className="mt-1 text-red-600 text-sm">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-2"> {/* Centered button */}
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 transform active:scale-98"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;