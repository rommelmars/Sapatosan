import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Basketball Shoes', price: 1500, quantity: 1 },
    { id: 2, name: 'Casual Shoes', price: 1200, quantity: 2 },
    { id: 3, name: 'Running Shoes', price: 1800, quantity: 1 },
  ]);

  const navigate = useNavigate();

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    // Redirect to checkout page
    navigate('/checkout', { state: { cartItems, total: calculateTotal() } });
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>₱{item.price.toLocaleString()}</p>
                </div>
                <div className="item-actions">
                  <button onClick={() => handleQuantityChange(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>
                    +
                  </button>
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveItem(item.id)}
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
  );
};

export default Cart;
