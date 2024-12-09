import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUsername, updateOrderByUser } from '../service/apiService'; // Import updateOrderByUser
import './checkout.css';
import logo from './logo.png'; // Import the logo

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState(null); // Store username state
  const [userId, setUserId] = useState(null); // Store user ID state
  const [loading, setLoading] = useState(true); // Track loading state
  const [cartItems, setCartItems] = useState(location.state?.cartItems || []); // Initialize cart items from location state
  const [total, setTotal] = useState(location.state?.total || 0); // Initialize total amount from location state

  useEffect(() => {
    // Fetch the current username and user ID from the backend using the token
    getCurrentUsername()
      .then(response => {
        setUsername(response.username); // Store the username directly
        setUserId(response.id); // Store the user ID
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

  const handlePlaceOrder = () => {
    const order = {
      orderDate: new Date().toISOString(),
      totalAmount: total,
      status: 'Complete',
      quantity: cartItems.reduce((acc, item) => acc + item.quantity, 0),
      price: cartItems.reduce((acc, item) => acc + item.shoes[0].price * item.quantity, 0),
    };

    updateOrderByUser(userId, order)
      .then(response => {
        console.log('Order updated successfully:', response);
        alert('Order updated successfully!');
        navigate('/orders'); // Redirect to orders page
      })
      .catch(error => {
        console.error('Error updating order:', error);
        alert('Failed to update order.');
      });
  };

  if (loading) {
    return <p>Loading checkout details...</p>;
  }

  return (
    <div>
      <header className="header">
        <img src={logo} alt="Sapatosan Logo" className="logo1" onClick={() => window.location.reload()} />
        <nav className="nav-links">
          <Link to="/listings">Home</Link>
          <Link to="/basketball-shoes">Basketball Shoes</Link>
          <Link to="/casual-shoes">Casual Shoes</Link>
          <Link to="/running-shoes">Running Shoes</Link>
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

      <div className="checkout-container">
        <h2>Checkout</h2>
        <ul className="checkout-list">
          {cartItems.map((item) => (
            <li key={item.cartId} className="checkout-item">
              <span>{item.shoes[0].name}</span>
              <span>{item.quantity} × ₱{item.shoes[0].price.toLocaleString()}</span>
            </li>
          ))}
        </ul>
        <div className="checkout-summary">
          <h3>Total: ₱{total.toLocaleString()}</h3>
          <button className="place-order-button" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;