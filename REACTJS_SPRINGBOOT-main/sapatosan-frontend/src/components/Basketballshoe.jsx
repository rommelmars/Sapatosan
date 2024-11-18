import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Basketballshoe.css';
import { getCurrentUsername, fetchShoes } from '../service/apiService'; // Import fetchShoes
import logo from './logo.png';

const BasketballShoe = () => {
  const [username, setUsername] = useState(null); // Store username state
  const [loading, setLoading] = useState(true); // Track loading state
  const [products, setProducts] = useState([]); // Declare state for products
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current username from the backend using the token
    getCurrentUsername()
      .then(response => {
        setUsername(response.username); // Store the username directly
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching current username:', error);
        setLoading(false);
      });

    // Fetch products (basketball shoes) from the backend using the fetchShoes function
    fetchShoes()
      .then(data => {
        setProducts(data); // Store the fetched products in the state
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleLogout = () => {
    setUsername(null);
    navigate('/');
  };

  return (
    <div className="basketball-store-container">
      {/* Header Section */}
      <header className="store-header">
        <img src={logo} alt="Sapatosan Logo" className="logo" />
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
                <span>Profile</span>
                <span>Wallet</span>
                <span>Orders</span>
                <span>My cart</span>
                <span
                  onClick={handleLogout}
                  role="button"
                  tabIndex="0"
                  aria-label="Logout"
                >
                  Logout
                </span>
              </div>
            </div>
          ) : (
            <p>User not authenticated</p> // Handle case when no username is returned
          )}
        </div>
      </header>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Basketball Shoes</h2>
        <div className="product-grid">
          {products.length === 0 ? (
            <p>Loading products...</p> // Show a loading message if products are being fetched
          ) : (
            products.map((product, index) => (
              <div key={index} className="product-card">
                {/* Construct the image URL dynamically */}
                <img
                  src={`http://localhost:8080/api/shoes/images/${product.image}`} // Ensure this is correct based on your API setup
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3>
                <p>{`₱${product.price}`}</p>
                <button className="add-to-cart-button">Add to Cart</button>
              </div>
            ))
          )}
        </div>
      </section>

     

      {/* Footer */}
      <footer className="store-footer">
        <p>&copy; 2024 Sapatosan. All rights reserved.</p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#contact">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default BasketballShoe;
