import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUsername, fetchCartItems } from '../service/apiService'; // Import fetchCartItems
import logo from './logo.png';

import './cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null); // Store username state
  const [loading, setLoading] = useState(true); // Track loading state
  const [cartItems, setCartItems] = useState([]); // Initialize cart items as an empty array

  useEffect(() => {
    // Fetch the current username from the backend using the token
    getCurrentUsername()
      .then(response => {
        setUsername(response.username); // Store the username directly
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching current username:", error);
        setLoading(false);
      });

    // Fetch cart items for the currently authenticated user from the backend
    fetchCartItems()
      .then(data => {
        // Initialize quantity for each item
        const itemsWithQuantity = data.map(item => ({
          ...item,
          quantity: 1, // Default quantity is 1
        }));
        setCartItems(itemsWithQuantity);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    setUsername(null);
    navigate('/');
  };

  const handleQuantityChange = (id, value) => {
    const newQuantity = Math.max(Math.min(value, cartItems.find(item => item.cartId === id).shoes[0].stock_quantity), 1);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartId === id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.cartId !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + (item.shoes[0].price || 0) * item.quantity, 0);
  };

  const handleCheckout = () => {
    // Redirect to checkout page with cart items and total amount
    navigate('/checkout', { state: { cartItems, total: calculateTotal() } });
  };

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

      <div className="cart-container">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-list">
              {cartItems.map((item) => (
                <li key={item.cartId} className="cart-item">
                  <img
                    src={`http://localhost:8080/api/shoes/images/${item.shoes[0].image}`} // Ensure this is correct based on your API setup
                    alt={item.shoes[0].name}
                    className="cart-item-image"
                  />
                  <div className="item-details">
                    <h4>{item.shoes[0].name}</h4>
                    <p>Cart ID: {item.cartId}</p>
                    <p>{item.shoes[0].description}</p>
                    <p>₱{(item.shoes[0].price || 0).toLocaleString()}</p>
                    <p>{item.shoes[0].categoryName}</p>
                    <p>Available Stock: {item.shoes[0].stock_quantity}</p>
                  </div>
                  <div className="item-actions">
                    <button onClick={() => handleQuantityChange(item.cartId, item.quantity - 1)}>
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.cartId, parseInt(e.target.value))}
                      min="1"
                      max={item.shoes[0].stock_quantity}
                    />
                    <button onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}>
                      +
                    </button>
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveItem(item.cartId)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <h3>Total: ₱{calculateTotal().toLocaleString()}</h3>
              <button className="checkout-button" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;