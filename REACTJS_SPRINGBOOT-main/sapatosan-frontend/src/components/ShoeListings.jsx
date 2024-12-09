import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUsername } from '../service/apiService';
import './ShoeListings.css';
import basketball from './basketball.mp4';
import casual from './casual.mp4';
import jordan1og from './jordan1og.png';
import jordan4Manila from './jordan4manila.png';
import logo from './logo.png';
import running from './running.mp4';
import sabrina2 from './sabrina2.png';
import profileTeaser from './teaserprofile.mp4';
import travisscotthigh from './travisscotthigh.png';

const ShoeListings = () => {
  const [selectedShoe, setSelectedShoe] = useState(null);
  const navigate = useNavigate();
  const [username, setUsername] = useState(null); // Store username state
  const [loading, setLoading] = useState(true); // Track loading state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Manage dropdown state

  useEffect(() => {
    // Fetch the current username from the backend using the token
    getCurrentUsername()
      .then((response) => {
        setUsername(response.username); // Make sure to store the username directly
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching current username:', error);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    setUsername(null);
    navigate('/');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };

  const shoes = [
    { name: 'Jordan 4 "Manila"', price: '₱15,499.00 PHP', originalPrice: '₱25,499.00 PHP', sale: true, rating: 5, image: jordan4Manila },
    { name: "Nike Women's Sabrina 2 EP Basketball Shoes", price: '₱9,199.00 PHP', originalPrice: '₱15,599.00 PHP', sale: true, rating: 5, image: sabrina2 },
    { name: 'Jordan 1 Retro High OG Chicago', price: '₱15,999.00 PHP', originalPrice: '₱20,499.00 PHP', sale: true, rating: 5, image: jordan1og },
    { name: 'Jordan 1 Retro High Travis Scott', price: '₱20,799.00 PHP', originalPrice: '₱30,499.00 PHP', sale: true, rating: 5, image: travisscotthigh },
  ];

  const handleShoeClick = (shoe) => {
    setSelectedShoe(shoe);
  };

  const handleCloseModal = () => {
    setSelectedShoe(null);
  };

  return (
    <div className="shoe-listings-container">
      {/* Header Section */}
      <header className="header1">
        <img src={logo} alt="Sapatosan Logo" className="logo1" onClick={() => window.location.reload()} />
        <nav className="nav-links">
          <Link to="/basketball-shoes">Basketball Shoes</Link>
          <Link to="/casual-shoes">Casual Shoes</Link>
          <Link to="/running-shoes">Running Shoes</Link>
        </nav>
        <div className="user-options">
          {loading ? (
            <p>Loading...</p>
          ) : username ? (
            <div className="menu-item">
              <p onClick={toggleDropdown} role="button" tabIndex="0" aria-label="Toggle Dropdown">
                Welcome, {username}
              </p>
              {isDropdownOpen && (
                <div className="submenu">
                  <span>
                    <Link to="/profile">Profile</Link>
                  </span>
                  <span>
                    <Link to="/orders">Orders</Link>
                  </span>
                  <span>
                    <Link to="/cart">My cart</Link>
                  </span>
                  <span onClick={handleLogout} role="button" tabIndex="0" aria-label="Logout">
                    Logout
                  </span>
                </div>
              )}
            </div>
          ) : (
            <p>User not authenticated</p>
          )}
        </div>
      </header>

      {/* Video Teaser */}
      <div className="video-container1">
        <video className="video-teaser" autoPlay loop muted>
          <source src={profileTeaser} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Hot Deals Section */}
      <h2 className="hot-deals">Hot Deals</h2>
      <div className="shoe-listings">
        {shoes.map((shoe, index) => (
          <div className="shoe-card" key={index} onClick={() => handleShoeClick(shoe)}>
            <img src={shoe.image} alt={shoe.name} className="shoe-image" />
            <h3 className="shoe-name">{shoe.name}</h3>
            <p className="shoe-price">{shoe.price}</p>
            <div className="rating">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < shoe.rating ? 'star filled' : 'star'}>
                  ★
                </span>
              ))}
            </div>
            {shoe.originalPrice && <p className="original-price">{shoe.originalPrice}</p>}
          </div>
        ))}
      </div>

      {/* Modal for Selected Shoe */}
      {selectedShoe && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">{selectedShoe.name}</h3>
            <h4 className="size-title">Available US Sizes:</h4>
            <div className="size-options">
              {[5, 6, 7, 8, 9, 10, 11, 12, 13].map((size) => (
                <span key={size} className="size-option">
                  {size}
                </span>
              ))}
            </div>
            <button className="add-to-cart-button">Add to Cart</button>
            <button onClick={handleCloseModal} className="close-modal-button">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Categories Section */}
      <h2 className="categories-title">Categories</h2>
      <div className="categories-container">
        <div className="category-box" onClick={() => navigate('/basketball-shoes')} style={{ cursor: 'pointer' }}>
          <h3>Basketball</h3>
          <div className="video-container">
            <video autoPlay loop muted>
              <source src={basketball} type="video/mp4" />
            </video>
          </div>
          <p>Explore our range of basketball shoes that offer premium support and style on the court.</p>
        </div>

        <div className="category-box" onClick={() => navigate('/casual-shoes')} style={{ cursor: 'pointer' }}>
          <h3>Casual</h3>
          <div className="video-container">
            <video autoPlay loop muted>
              <source src={casual} type="video/mp4" />
            </video>
          </div>
          <p>Our casual collection blends style and comfort for everyday wear.</p>
        </div>

        <div className="category-box" onClick={() => navigate('/running-shoes')} style={{ cursor: 'pointer' }}>
          <h3>Running</h3>
          <div className="video-container">
            <video autoPlay loop muted>
              <source src={running} type="video/mp4" />
            </video>
          </div>
          <p>Find the perfect running shoes to enhance your speed and comfort for long distances.</p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer">
        <div className="footer-content">
          <img src={logo} alt="Sapatosan Logo" className="logo1" onClick={() => window.location.reload()} />
          <div className="social-media-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="social-icon">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Sapatosan. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ShoeListings;
