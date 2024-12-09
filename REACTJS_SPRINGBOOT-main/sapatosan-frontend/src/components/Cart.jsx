import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUsername, fetchCartItems, updateOrderByUser, clearCartsByUser } from '../service/apiService'; // Import necessary functions
import logo from './logo.png';
import './cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null); // Store username state
  const [userId, setUserId] = useState(null); // Store user ID state
  const [loading, setLoading] = useState(true); // Track loading state
  const [cartItems, setCartItems] = useState([]); // Initialize cart items as an empty array
  const [showCheckoutModal, setShowCheckoutModal] = useState(false); // Track checkout modal visibility
  const [total, setTotal] = useState(0); // Initialize total amount

  useEffect(() => {
    // Fetch the current username and user ID from the backend using the token
    getCurrentUsername()
      .then(response => {
        setUsername(response.username); // Store the username directly
        setUserId(response.id); // Store the user ID
        return fetchCartItems();
      })
      .then(data => {
        // Initialize quantity for each item
        const itemsWithQuantity = data.map(item => ({
          ...item,
          quantity: item.quantity || 1, // Default quantity is 1 if not provided
        }));
        setCartItems(itemsWithQuantity);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    setUsername(null);
    navigate('/');
  };

  const handleQuantityChange = (id, value) => {
    const newQuantity = Math.max(Math.min(value, cartItems.find(item => item.cartId === id).shoes[0]?.stock_quantity || 1), 1);
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
    return cartItems.reduce((acc, item) => acc + ((item.shoes[0]?.price || 0) * item.quantity), 0);
  };

  const handleCheckout = () => {
    setTotal(calculateTotal());
    setShowCheckoutModal(true);
  };

  const handlePlaceOrder = () => {
    const updateOrderPromises = cartItems.map(item => {
      const order = {
        orderDate: new Date().toISOString(),
        totalAmount: (item.shoes[0]?.price || 0) * item.quantity,
        status: 'Complete',
        quantity: item.quantity,
        price: item.shoes[0]?.price * item.quantity,
      };

      return updateOrderByUser(item.order.orderID, order);
    });

    Promise.all(updateOrderPromises)
      .then(responses => {
        console.log('Orders updated successfully:', responses);
        alert('Orders updated successfully!');
        setShowCheckoutModal(false);
        clearCartsByUser() // Clear the cart items for the user
          .then(() => {
            setCartItems([]); // Clear the cart items from the state
            navigate('/orders'); // Redirect to orders page
          })
          .catch(error => {
            console.error('Error clearing cart items:', error);
            alert('Failed to clear cart items.');
          });
      })
      .catch(error => {
        console.error('Error updating orders:', error);
        alert('Failed to update orders.');
      });
  };

  if (loading) {
    return <p>Loading cart items...</p>;
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

      <div className="cart-container">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-list">
              {cartItems.map((item) => (
                <li key={item.cartId} className="cart-item">
                  {item.shoes && item.shoes[0] && (
                    <>
                      <img
                        src={`http://localhost:8080/api/shoes/images/${item.shoes[0]?.image}`} // Ensure this is correct based on your API setup
                        alt={item.shoes[0]?.name}
                        className="cart-item-image"
                      />
                      <div className="item-details">
                        <h4>{item.shoes[0]?.name}</h4>
                        <p>Cart ID: {item.cartId}</p>
                        <p>Order ID: {item.order.orderID}</p>
                        <p>{item.shoes[0]?.description}</p>
                        <p>₱{(item.shoes[0]?.price || 0).toLocaleString()}</p>
                        <p>{item.shoes[0]?.categoryName}</p>
                        <p>Available Stock: {item.shoes[0]?.stock_quantity}</p>
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
                          max={item.shoes[0]?.stock_quantity}
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
                    </>
                  )}
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

      {showCheckoutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowCheckoutModal(false)}>X</button>
            <div className="modal-body">
              <h2>Checkout</h2>
              <ul className="checkout-list">
                {cartItems.map((item) => (
                  <li key={item.cartId} className="checkout-item">
                    {item.shoes && item.shoes[0] && (
                      <>
                        <span>{item.shoes[0]?.name}</span>
                        <span>{item.quantity} × ₱{item.shoes[0]?.price.toLocaleString()}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              <div className="checkout-summary">
                <h3>Total: ₱{total.toLocaleString()}</h3>
                <button className="place-order-button" onClick={handlePlaceOrder}>
                  Place Order
                </button>
                <button className="cancel-button" onClick={() => setShowCheckoutModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;