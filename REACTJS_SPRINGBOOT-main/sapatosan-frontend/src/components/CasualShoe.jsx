import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchShoes, getCurrentUsername, createCart } from '../service/apiService'; // Import fetchShoes
import './CasualShoe.css'; // Use the new CSS file
import logo from './logo.png';

const CasualShoe = () => {
  const [username, setUsername] = useState(null); // Store username state
  const [loading, setLoading] = useState(true); // Track loading state
  const [products, setProducts] = useState([]); // Declare state for products
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product
  const navigate = useNavigate(); // Navigation hook

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

    // Fetch products (casual shoes) from the backend using the fetchShoes function
    fetchShoes()
      .then(data => {
        console.log('Fetched products:', data); // Log the fetched products
        // Filter products to include only those with category name "Casual"
        const casualProducts = data.filter(product => product.categoryName === 'Casual');
        console.log('Filtered casual products:', casualProducts); // Log the filtered products
        setProducts(casualProducts); // Store the filtered products in the state
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const addToCart = (product) => {
    const cart = {
      userInfo: { id: 1 }, // Replace with the actual user ID
      shoes: [{ productid: product.productid }],
      status: 'Pending',
      order: {
        userInfo: { id: 1 }, // Replace with the actual user ID
        orderDate: new Date().toISOString(),
        totalAmount: product.price,
        status: 'Pending',
        quantity: 1, // Assuming 1 for simplicity
        price: product.price,
      }
    };

    createCart(cart)
      .then(response => {
        console.log('Cart created:', response);
        navigate('/orders'); // Navigate to orders page
      })
      .catch(error => {
        console.error('Error creating cart:', error);
      });
  };

  const handleImageClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleLogout = () => {
    setUsername(null);
    navigate('/');
  };

  return (
    <div className="casual-store-container">
      {/* Header Section */}
      <header className="store-header">
        <img src={logo} alt="Sapatosan Logo" className="logo1" />
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
                <span> <Link to="/profile">Profile</Link> </span>
                <span> <Link to="/orders">Orders </Link> </span>
                <span> <Link to="/cart">My cart</Link> </span>
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

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Casual Shoes</h2>
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
                  onClick={() => handleImageClick(product)} // Handle image click
                />
                <h3>{product.name}</h3>
                <p>{`₱${product.price}`}</p>
                <button className="add-to-cart-button1" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedProduct && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={`http://localhost:8080/api/shoes/images/${selectedProduct.image}`} alt={selectedProduct.name} className="modal-image" />
            <p className="modal-product-name">{selectedProduct.name}</p>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <div className="footer">
        <div className="footer-content">
          <a href="/">
            <img
              src={logo}
              alt="Sapatosan Logo"
              className="footer-logo"
              onClick={() => window.location.reload()}
            />
          </a>
          <div className="social-media-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
            >
              <i className="fa-brands fa-tiktok"></i>
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

export default CasualShoe;