// route/user.route.js
import express from 'express';
import { signup, login, promoteToAdmin } from '../controller/user.controller.js';
import { protect, authorizeAdmin } from '../middleware/auth.js'; // Import auth middlewares

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// ✅ Admin-only route to promote a user
router.put('/promote/:id', protect, authorizeAdmin, promoteToAdmin);

// ✅ Add this route to get current logged-in user
router.get('/me', protect, (req, res) => {
  res.json(req.user); // req.user is set in the `protect` middleware
});

export default router;
