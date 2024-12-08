import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUsername, fetchOrders } from '../service/apiService';
import logo from './logo.png';

import './orders.css';

const Orders = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null); // Store username state
  const [orders, setOrders] = useState([]); // Initialize orders as an empty array
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
    // Fetch orders from the backend
    fetchOrders()
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
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
          {username ? (
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
              <li key={order.orderID} className="order-item">
                <div className="order-header">
                  <p>
                    <strong>Order ID:</strong> {order.orderID}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}
                  </p>
                </div>
                <div className="order-details">
                  <p>
                    <strong>Status:</strong> {order.status}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {order.quantity}
                  </p>
                  <p>
                    <strong>Price:</strong> {order.price}
                  </p>
                  <p>
                    <strong>Total Amount:</strong> {order.totalAmount}
                  </p>
                  {order.shoes && order.shoes.length > 0 && (
                    <>
                      <p>
                        <strong>Product Name:</strong> {order.shoes[0].name}
                      </p>
                      <p>
                        <strong>Description:</strong> {order.shoes[0].description}
                      </p>
                      <p>
                        <strong>Price:</strong> {order.shoes[0].price}
                      </p>
                      <p>
                        <strong>Category:</strong> {order.shoes[0].categoryName}
                      </p>
                    </>
                  )}
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