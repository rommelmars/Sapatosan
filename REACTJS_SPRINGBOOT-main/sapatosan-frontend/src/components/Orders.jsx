import React, { useEffect, useState } from 'react';
import './orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetch for orders - replace with API call
    const fetchOrders = () => {
      setLoading(true);
      setTimeout(() => {
        setOrders([
          {
            id: 'ORD12345',
            date: '2024-11-15',
            items: [
              { name: 'Basketball Shoes', quantity: 1 },
              { name: 'Casual Shoes', quantity: 2 },
            ],
            total: '₱4,500.00',
          },
          {
            id: 'ORD67890',
            date: '2024-10-20',
            items: [
              { name: 'Running Shoes', quantity: 1 },
              { name: 'Sandals Essential', quantity: 1 },
            ],
            total: '₱3,200.00',
          },
        ]);
        setLoading(false);
      }, 1000); // Simulate network delay
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              <div className="order-header">
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Date:</strong> {order.date}
                </p>
              </div>
              <div className="order-details">
                <h4>Items:</h4>
                <ul className="items-list">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.quantity}x {item.name}
                    </li>
                  ))}
                </ul>
                <p>
                  <strong>Total:</strong> {order.total}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
