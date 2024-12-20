import React, { useEffect, useState } from 'react';

import './RunningShoesList.css';
import jordan1og from './jordan1og.png';
import jordan4Manila from './jordan4manila.png';
import logo from './registerImage.png';
import sabrina2 from './sabrina2.png';
import profileTeaser from './teaserprofile.mp4';
import travisscotthigh from './travisscotthigh.png';

const RunningShoesList = () => {
  const [user, setUser] = useState(null);
  const [selectedShoe, setSelectedShoe] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await fetch("/api/auth/user").then(res => res.json());
      setUser(userData);
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  const shoes = [
    { name: 'Jordan 4 "Manila"', price: '₱15,499.00 PHP', originalPrice: '₱25,499.00 PHP', sale: true, rating: 5, image: jordan4Manila },
    { name: 'Nike Women\'s Sabrina 2 EP Basketball Shoes', price: '₱9,199.00 PHP', originalPrice: '₱15,599.00 PHP', sale: true, rating: 5, image: sabrina2 },
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
      <header className="header">
        <img src={logo} alt="Sapatosan Logo" className="logo" />
        <nav className="nav-links">
          <a href="#">Basketball Shoes</a>
          <a href="#">Casual Shoes</a>
          <a href="/running-shoes">Running Shoes</a>
          <a href="#">Soccer Shoes</a>
        </nav>
        <div className="user-info">
          {user ? (
            <>
              <span className="user-name">Hello, {user.name}</span>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </>
          ) : (
            <a href="/login" className="login-link">Login</a>
          )}
        </div>
      </header>

      <div className="teaser-video-container">
        <video className="teaser-video" autoPlay loop muted>
          <source src={profileTeaser} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <h2 className="hot-deals">Hot Deals</h2>
      <div className="shoe-listings">
        {shoes.map((shoe, index) => (
          <div className="shoe-card" key={index} onClick={() => handleShoeClick(shoe)}>
            <img src={shoe.image} alt={shoe.name} className="shoe-image" />
            <h3 className="shoe-name">{shoe.name}</h3>
            <p className="shoe-price">{shoe.price}</p>
            <div className="rating">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < shoe.rating ? 'star filled' : 'star'}>★</span>
              ))}
            </div>
            {shoe.originalPrice && (
              <p className="original-price">{shoe.originalPrice}</p>
            )}
          </div>
        ))}
      </div>

      {selectedShoe && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">{selectedShoe.name}</h3>
            <h4 className="size-title">Available US Sizes:</h4>
            <div className="size-options">
              {[5, 6, 7, 8, 9, 10, 11, 12, 13].map(size => (
                <span key={size} className="size-option">{size}</span>
              ))}
            </div>
            <button className="add-to-cart-button">Add to Cart</button>
            <button onClick={handleCloseModal} className="close-modal-button">Close</button>
          </div>
        </div>
      )}

      {/* Categories Section */}
      <h2 className="categories-title">Categories</h2>
      <div className="categories-container">
        <div className="category-box">
          <h3>Basketball</h3>
          <div className="video-container">
            <video autoPlay loop muted>
              <source src={profileTeaser} type="video/mp4" />
            </video>
          </div>
          <p>Explore our range of basketball shoes that offer premium support and style on the court.</p>
        </div>
        <div className="category-box">
          <h3>Running</h3>
          <div className="video-container">
            <video autoPlay loop muted>
              <source src={profileTeaser} type="video/mp4" />
            </video>
          </div>
          <p>Find the perfect running shoes to enhance your speed and comfort for long distances.</p>
        </div>
        <div className="category-box">
          <h3>Casual</h3>
          <div className="video-container">
            <video autoPlay loop muted>
              <source src={profileTeaser} type="video/mp4" />
            </video>
          </div>
          <p>Our casual collection blends style and comfort for everyday wear.</p>
        </div>
        <div className="category-box">
          <h3>Sandals</h3>
          <div className="video-container">
            <video autoPlay loop muted>
              <source src={profileTeaser} type="video/mp4" />
            </video>
          </div>
          <p>Perfect for warm weather, our sandals offer breathable comfort and style.</p>
        </div>
        <div className="category-box">
          <h3>Soccer</h3>
          <div className="video-container">
            <video autoPlay loop muted>
              <source src={profileTeaser} type="video/mp4" />
            </video>
          </div>
          <p>Get a grip on the game with our high-performance soccer shoes.</p>
        </div>
      </div>
    </div>
  );
};

export default RunningShoesList;
