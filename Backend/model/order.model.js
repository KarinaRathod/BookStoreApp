import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  items: [
    {
      bookId: { type: String, required: true },
      title: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { 
    type: String, 
    default: 'Pending' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const Order = mongoose.model('Order', orderSchema);

// 👇 This line fixes the error
export default Order;