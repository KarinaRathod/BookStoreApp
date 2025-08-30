import React from "react";
import { ShoppingCart, IndianRupee } from "lucide-react";

export default function OrderManager({ orders, onStatusChange }) {
  // Helper to get badge color based on order status
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="lg:col-span-3">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-emerald-600">
        <ShoppingCart className="w-6 h-6 mr-2" />
        Customer Orders
      </h2>
      <div className="space-y-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row justify-between md:items-center border-b pb-4 mb-4">
                <div>
                  <p className="font-bold text-lg text-gray-900">Order ID: <span className="font-mono text-gray-600">{order._id}</span></p>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className="text-left md:text-right mt-2 md:mt-0">
                  <div className="flex items-center justify-start md:justify-end gap-2">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadgeColor(order.status)}`}>
                      {order.status}
                    </span>
                    <p className="text-sm bg-gray-200 text-gray-800 px-2 py-1 rounded-full inline-block">{order.paymentMethod}</p>
                  </div>
                  <p className="font-semibold text-xl text-emerald-600 flex items-center justify-start md:justify-end mt-2">
                    <IndianRupee className="w-5 h-5" /> {order.total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2 text-gray-800">Customer Details</h4>
                  <p className="text-sm"><strong>Name:</strong> {order.customer.name}</p>
                  <p className="text-sm"><strong>Email:</strong> {order.customer.email}</p>
                  <p className="text-sm"><strong>Phone:</strong> {order.customer.phone}</p>
                  <p className="text-sm"><strong>Address:</strong> {order.customer.address}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2 text-gray-800">Items Ordered</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {order.items.map((item) => (
                      <li key={item.bookId}>
                        {item.title} (x{item.quantity}) - <span className="font-semibold"> ₹{item.price.toFixed(2)} each</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <label htmlFor={`status-${order._id}`} className="block text-sm font-medium text-gray-700 mb-1">Update Order Status</label>
                <select
                  id={`status-${order._id}`}
                  value={order.status}
                  onChange={(e) => onStatusChange(order._id, e.target.value)}
                  className="w-full md:w-auto p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-gray-500">No customer orders found. 🛒</p>
          </div>
        )}
      </div>
    </div>
  );
}