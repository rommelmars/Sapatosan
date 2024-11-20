import React from 'react';
import {Link, useLocation } from 'react-router-dom';
import './checkout.css';

const Checkout = () => {
  const location = useLocation();
  const { cartItems, total } = location.state || { cartItems: [], total: 0 };

  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
    // Additional logic: Clear cart, redirect, or save order in database
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <ul className="checkout-list">
        {cartItems.map((item) => (
          <li key={item.id} className="checkout-item">
            <span>{item.name}</span>
            <span>{item.quantity} × ₱{item.price.toLocaleString()}</span>
          </li>
        ))}
      </ul>
      <div className="checkout-summary">
        <h3>Total: ₱{total.toLocaleString()}</h3>
        <button className="place-order-button" onClick={handlePlaceOrder}> <Link to="/listings">Place Order</Link>
          
        </button>
      </div>
    </div>
  );
};

export default Checkout;
