// route/book.route.js
import express from 'express';
import { getBook, addBook, deleteBook } from '../controller/book.controller.js';
import { protect, authorizeAdmin } from '../middleware/auth.js'; // Import middleware

const router = express.Router();

// GET all books (accessible to everyone)
router.get('/', getBook);

// POST a new book (requires authentication and admin role)
router.post('/', protect, authorizeAdmin, addBook);

// DELETE a book by ID (requires authentication and admin role)
router.delete('/:id', protect, authorizeAdmin, deleteBook);

export default router;