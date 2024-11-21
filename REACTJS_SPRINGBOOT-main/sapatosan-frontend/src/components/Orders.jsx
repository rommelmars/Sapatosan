import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUsername } from '../service/apiService';
import logo from './logo.png';

import './orders.css';

const Orders = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState(null); // Store username state
 

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the current username from the backend using the token
    getCurrentUsername()
      .then(response => {
        setUsername(response.username); // Make sure to store the username directly
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching current username:", error);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    setUsername(null);
    navigate('/');
  };

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
    
    <div>

<header className="header">
      <img src={logo} alt="Sapatosan Logo" className="logo1" onClick={() => window.location.reload()} />
        <nav className="nav-links">
            <Link to="/listings">Home</Link>
        <Link to="/basketball-shoes">Basketball Shoes</Link>
          <a href="#">Casual Shoes</a>
          <Link to="#">Running Shoes</Link>
          <a href="#">Soccer Shoes</a>
          <a href="#">Sandals Essential</a>
        </nav>
        <div className="user-options">
          {loading ? (
            <p>Loading...</p> // Show loading while fetching the username
          ) : username ? (
            <div className="menu-item">
              <p>Welcome, {username}</p>
              <div className="submenu">
                <span> <Link to="/profile">Profile</Link></span>
                <span><Link to="/orders">Orders</Link></span>
                <span><Link to="/cart">My cart</Link></span>
                <span 
                  onClick={handleLogout} 
                  role="button" 
                  tabIndex="0" 
                  aria-label="Logout">
                  Logout
              </span>
              </div>
            </div>
          ) : (
            <p>User not authenticated</p> // Handle case when no username is returned
          )}
        </div>
      </header>

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
    </div>
  );
};

export default Orders;
