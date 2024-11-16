import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser, loginUser } from '../service/apiService';
import shoe3 from './adidas.png';
import banner from './creator.png';
import './HomePages.css';
import logo from './logo.png';
import shoe2 from './nike.png';
import shoe1 from './pullsnbear.png';
import shoe4 from './puma.png';
import shoe5 from './reebok.png';
import registerImage from './registerImage.png';
import teaser from './teaser.mp4';


// Modal component for registration
const RegisterModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Update form data on input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission for registration
  const handleRegisterSubmit = async (event) => {

    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const { username, email, password, confirmPassword } = formData;

    const showAlert = "Successfully registered!";
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const userData = { username, email, password };
      await createUser(userData);
      setSuccessMessage('Registration successful!');
      
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });

      setTimeout(closeModal, 2000); // Close modal after success
      alert(showAlert);
      
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Registration failed. Please try again.');
      } else {
        setErrorMessage("Unexpected Error!");
      }
    }
  };


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>X</button>
        <div className="modal-body">
          <div className="modal-image">
            <img src={registerImage} alt="Register" className="image-preview" />
          </div>
          <div className="modal-form">
            <h2>Join Us</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form className="register-form" onSubmit={handleRegisterSubmit}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
              <button type="submit" className="submit-button">Register</button>
             
              
            </form>
          </div>
        </div>
      </div>
      
    </div>
  );
};



const SignInModal = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const showAlertWelcome = "Welcome to our page";

  const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');

      try {
          const response = await loginUser(email, password); // Call the loginUser function
          console.log('Login response:', response);
          localStorage.setItem('token', response.token); // Adjust according to your response structure
          setTimeout(closeModal, 200);
          alert(showAlertWelcome);
          navigate('/listings'); // Redirect or update application state here
          
      } catch (err) {
          if (err.response) {
              setError(err.response.data.message || 'Login failed. Please try again.');
          } else {
              setError('An unexpected error occurred. Please try again.');
          }
      }
  };

 

  return (
      <div className="modal-overlay">
          <div className="modal-content">
              <button className="close-button" onClick={closeModal}>X</button>
              <div className="modal-body">
                  <div className="modal-image">
                      <img src={registerImage} alt="Sign In" className="image-preview" />
                  </div>
                  <div className="modal-form">
                      <h2>Sign In</h2>
                      <form className="sign-in-form" onSubmit={handleSubmit}>
                          <label htmlFor="email">Email</label>
                          <input
                              type="email"
                              id="email"
                              name="email"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                          />
                          <label htmlFor="password">Password</label>
                          <input
                              type="password"
                              id="password"
                              name="password"
                              placeholder="Enter your password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                          />
                          
                          <button type="submit" className="submit-button">Sign In</button>
                          {error && <p className="error-message">{error}</p>}
                      </form>
                  </div>
              </div>
          </div>
      </div>
  );
};


const HomePage = () => {

  // Declare state for both modals
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);


  // Functions to open/close Register Modal

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);    
  };

  // Functions to open/close Sign In Modal
  const openSignInModal = () => {
    setIsSignInModalOpen(true);
  };

  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  return (
    <div>
      <header className="header1">
      <Link to="/">
      <img 
        src={logo} 
      alt="Sapatosan Logo" 
      className="logo1" 
        onClick={() => window.location.reload()} 
      style={{ cursor: 'pointer' }}
      />
  </Link>
        <nav className="nav-links">

          <Link to="/basketball-shoes">Basketball Shoes</Link>
          <a href="#">Casual Shoes</a>
          <Link to="/running-shoes">Running Shoes</Link>
          <a href="#">Soccer Shoes</a>
          <a href="#">Sandals Essential</a>
          <Link to="/admin-login">Admin Page</Link>
          

        </nav>


        <div className="account-links">
    {/* Change Join Us link to a button */}
    <button className="button-link" onClick={openRegisterModal}>Join Us</button>
    
    {/* Change Sign In link to a button */}
    <button className="button-link" onClick={openSignInModal}>Sign In</button>
  </div>


      </header>

      <section>

        <div className="video-container1">
          <video className="video-teaser" autoPlay loop muted>
            <source src={teaser} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

      </section>
      <section>
        <div className="featured-shoes">
          <h2>FEATURED BRANDS</h2>
          <div className="shoes-sample-container">
            
            <div className="shoe-sample">
              <img src={shoe1} alt="Pull&Bear" />
            </div>

            <div className="shoe-sample">
              <img src={shoe2} alt="Nike" />
            </div>

            <div className="shoe-sample">
              <img src={shoe3} alt="Adidas" />
            </div>

            <div className="shoe-sample">
              <img src={shoe4} alt="Puma" />
            </div>

            <div className="shoe-sample">
              <img src={shoe5} alt="Reebok" />
            </div>

          </div>
        </div>
      </section>

      <div className="banner-container">
        <img src={banner} alt="Full-width Banner" className="full-width-banner" />
      </div>

      <div className="about-us">
        <h2>About Us</h2>
        <p>
          "Sapatosan" faces several challenges when managing diverse shoe lines, including basketball, running, casual, and soccer shoes. 
          Balancing overstock and shortages across categories can be difficult. Returns and exchanges pose logistical challenges, as each 
          type of shoe has different sizes and customer expectations. Marketing strategies must be tailored to gender and preferences, 
          requiring a nuanced approach. At Sapatosan, we strive to balance customer demands with operational efficiency to provide a 
          seamless shopping experience.
        </p>
      </div>

     {/* Footer Section */}
<div className="footer">
  <div className="footer-content">
    <a href="/">
      <img src={logo} alt="Sapatosan Logo" className="footer-logo" />
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

      {/* Conditionally Render the Modals */}
      {isRegisterModalOpen && <RegisterModal closeModal={closeRegisterModal} />}
      {isSignInModalOpen && <SignInModal closeModal={closeSignInModal} />}
    </div>

  );
};

export default HomePage;
