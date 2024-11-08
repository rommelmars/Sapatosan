import React from 'react';
import './Basketballshoe.css';

const BasketballShoe = () => {
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
          <button className="login-button">Login</button>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="banner-content">
          <h1>Discover the Best Basketball Shoes</h1>
          <p>Performance meets style. Elevate your game with our latest collection.</p>
          <button className="shop-now-button">Shop Now</button>
        </div>
      </section>

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
