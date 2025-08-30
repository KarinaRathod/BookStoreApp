// src/routes/order.route.js

import express from 'express';
import Order from '../model/order.model.js';
import { protect, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /orders - Create a new order (accessible to any user)
router.post('/', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send({ message: 'Error placing order', error });
    }
});

// GET /orders - Get all orders (admin only)
router.get('/', [protect, authorizeAdmin], async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.send(orders);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// DELETE /orders/:id - Delete an order (admin only)
router.delete('/:id', [protect, authorizeAdmin], async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).send('Order not found.');
        res.send('Order deleted successfully.');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// NEW: PATCH /orders/:id/status - Update order status (admin only)
router.patch('/:id/status', [protect, authorizeAdmin], async (req, res) => {
    try {
        const { status } = req.body;
        // Basic validation for allowed statuses
        const allowedStatuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).send({ message: 'Invalid status value.' });
        }

        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).send({ message: 'Order not found.' });
        }

        order.status = status;
        await order.save();
        res.send(order); // Send back the updated order
    } catch (error) {
        res.status(500).send({ message: 'Server error', error });
    }
});

export default router;