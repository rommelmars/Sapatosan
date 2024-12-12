import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUserInfo } from '../service/apiService'; // Updated function to fetch full user info
import './profile.css';

import logo from './logo.png';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Store full user info state
  const [loading, setLoading] = useState(true); // Track loading state
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [profileImage, setProfileImage] = useState(null); // State for profile image
  const [imagePreview, setImagePreview] = useState(null); // Preview for uploaded image

  useEffect(() => {
    // Fetch the current user info from the backend using the token
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token); // Log token to check if it's available
    
    getCurrentUserInfo()
      .then(response => {
        console.log('User Info:', response); // Log the response to check if data is returned
        setUser(response); // Store the user data
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching current user info:", error);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setIsEditing(prevState => !prevState); // Toggle edit mode
  };

  return (
    <div>
      <header className="header1">
        <img src={logo} alt="Sapatosan Logo" className="logo1" onClick={() => window.location.reload()} />
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
            <p>Loading...</p> // Show loading while fetching user info
          ) : user ? (
            <div className="menu-item">
              <p>Welcome, {user.username}</p>
              <div className="submenu">
                <span><Link to="/profile">Profile</Link></span>
                <span><Link to="/orders">Orders</Link></span>
                <span><Link to="/cart">My cart</Link></span>
                <span onClick={handleLogout} role="button" tabIndex="0" aria-label="Logout">
                  Logout
                </span>
              </div>
            </div>
          ) : (
            <p>User not authenticated</p> // Handle case when user is not authenticated
          )}
        </div>
      </header>

      {/* Profile Details Section */}
      <div className="profile-details">
        <h2>Profile</h2>

        {/* Profile Image Section 
        <div className="profile-image">
          <div className="profile-image-container">
            <img
              src={imagePreview || user?.profileImage || 'https://via.placeholder.com/150'} // Show uploaded image or user profile image
              alt="User Profile"
            />
          </div>
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              aria-label="Upload Profile Image"
            />
          )}
        </div>*/}

        <div className="profile-info">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={user?.username || ''} disabled={!isEditing} />
          
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={user?.email || ''} disabled={!isEditing} />
          
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value="******" disabled={!isEditing} />
          
          <label htmlFor="wallet">Wallet Balance:</label>
          <input type="text" id="wallet" value={user?.wallet || '₱0.00'} disabled={!isEditing} />
        </div>

        <button className="edit-button" onClick={handleEdit}>
          {isEditing ? 'Save Changes' : 'Edit'}
        </button>
      </div>

      {/* Footer Section */}
      <div className="footer">
        <div className="footer-content">
          <a href="/">
            <img src={logo} alt="Sapatosan Logo" className="footer-logo" onClick={() => window.location.reload()} />
          </a>
          <div className="social-media-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="social-icon">
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

export default Profile;
