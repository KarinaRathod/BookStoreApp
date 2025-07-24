import React from 'react';
import { useForm } from 'react-hook-form';

function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    console.log('Contact Form Data:', data);
    reset(); // Clear form after submission
    alert('Message submitted successfully!');
  };

  return (
    <div className="flex h-screen items-center justify-center dark:bg-slate-900 dark:text-white">
      <div className="w-[600px] border-2 shadow-md p-6 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Contact Us</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-md outline-none mt-1"
              {...register('name', { required: true })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">Name is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md outline-none mt-1"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label>Message</label>
            <textarea
              placeholder="Enter your message"
              className="w-full px-3 py-2 border rounded-md outline-none mt-1"
              rows={4}
              {...register('message', { required: true })}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">Message is required</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
