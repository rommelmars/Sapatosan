
import React, { useState, useEffect } from 'react';
import './Basketballshoe.css';
import {getCurrentUsername}  from '../service/apiService';

const BasketballShoe = () => {
  const [username, setUsername] = useState(null); // Store username state
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Fetch the current username from the backend using the token
    getCurrentUsername()
      .then(response => {
        setUsername(response); // Set the fetched username
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching current username:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="basketball-store-container">
      {/* Header Section */}
      <header className="store-header">
        <img src="logo.png" alt="Store Logo" className="store-logo" />
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="user-options">
        {loading ? (
            <p>Loading...</p> // Show loading while fetching the username
          ) : username ? (
            <p>Welcome, {username}!</p> // Display the username
          ) : (
            <p>User not authenticated</p> // Handle case when no username is returned
          )}
        </div>
      </header>


      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Featured Basketball Shoes</h2>
        <div className="product-grid">
          {/* Sample Products */}
          {[
            { name: 'Air Zoom', price: '$120', img: 'airzoom.jpg' },
            { name: 'LeBron 18', price: '$150', img: 'lebron18.jpg' },
            { name: 'Kyrie 7', price: '$130', img: 'kyrie7.jpg' },
            { name: 'Dunk High', price: '$140', img: 'dunkhigh.jpg' }
          ].map((product, index) => (
            <div key={index} className="product-card">
              <img src={product.img} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button className="add-to-cart-button">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2>Explore Categories</h2>
        <div className="categories-grid">
          <div className="category-card">
            <img src="high_tops.jpg" alt="High Tops" className="category-image" />
            <h3>High Tops</h3>
          </div>
          <div className="category-card">
            <img src="low_tops.jpg" alt="Low Tops" className="category-image" />
            <h3>Low Tops</h3>
          </div>
          <div className="category-card">
            <img src="performance.jpg" alt="Performance" className="category-image" />
            <h3>Performance</h3>
          </div>
          <div className="category-card">
            <img src="lifestyle.jpg" alt="Lifestyle" className="category-image" />
            <h3>Lifestyle</h3>
          </div>
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
