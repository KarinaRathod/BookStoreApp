import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({

  title: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true }, 
  price: { type: Number, required: true, min: [0, 'Price cannot be negative'] },
  genre: { type: String, required: true },
  rating: {
    type: Number,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  stock: { type: Number, required: true, min: [0, 'Stock cannot be negative'] },
  description: { type: String },
  image: { type: String, required: true },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;