import Book from "../model/book.model.js";

export const getBook = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};

export const addBook = async (req, res) => {
  try {
    const { title, name, price, genre, rating, stock, description, image } = req.body;
    
    // Convert string values from the form into numbers before creating the book
    const newBook = new Book({
      title,
      name,
      price: Number(price),
      genre,
      rating: Number(rating),
      stock: Number(stock),
      description,
      image
    });

    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.log("Add Book Error:", error);
    res.status(500).json({ message: "Failed to add book" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    await Book.findByIdAndDelete(bookId);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log("Delete Book Error:", error);
    res.status(500).json({ message: "Failed to delete book" });
  }
};