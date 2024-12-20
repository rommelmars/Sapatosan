import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser, loginUser } from '../service/apiService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import shoe3 from './adidas.png';
import { IconButton } from '@mui/material';
import { FaGithub } from 'react-icons/fa';
import creator from './creator-developers.mp4';
import denzImage from './denz.png';
import gilesImage from './giles.png';
import './HomePages.css';
import logo from './logo.png';
import mikhailImage from './mikhail.png';
import shoe2 from './nike.png';
import ninoImage from './nino.png';
import shoe1 from './pullsnbear.png';
import shoe4 from './puma.png';
import shoe5 from './reebok.png';
import registerImage from './registerImage.png';
import rommelImage from './rommel.png';
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

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const userData = { username, email, password };
      await createUser(userData);
      setSuccessMessage('Registration successful!');
      toast.success('Successfully registered!');
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      setTimeout(closeModal, 2000); // Close modal after success
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Registration failed. Please try again.');
      } else {
        setErrorMessage('Unexpected Error!');
      }
      toast.error('Registration failed. Please try again.');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await loginUser(email, password); // Call the loginUser function
      console.log('Login response:', response);
      localStorage.setItem('token', response.token); // Adjust according to your response structure
      toast.success('Login successfully!');
      setTimeout(() => {
        closeModal();
        navigate('/listings'); // Redirect or update application state here
      }, 2000); // Delay for 2 seconds before redirecting
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Login failed. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      toast.error('Login failed. Please try again.');
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

  const teamMembers = [
    {
      name: 'Rommel John L. Pobadora',
      image: rommelImage,
      socialLinks: {
        github: 'https://github.com/rommelmars',
      },
    },
    {
      name: 'Joseph Niño E. Amarillo',
      image: ninoImage,
      socialLinks: {
        github: 'https://github.com/codeStreakShifu',
      },
    },
    {
      name: 'Mikhail James P Navarro',
      image: mikhailImage,
      socialLinks: {
        github: 'https://github.com/MikhailAg0ny',
      },
    },
    {
      name: 'Denz Matthew A. Nadal',
      image: denzImage,
      socialLinks: {
        github: 'https://github.com/MikhailAg0ny',
      },
    },
    {
      name: 'Giles Anthony I. Villamor II',
      image: gilesImage,
      socialLinks: {
        github: 'https://github.com/samanthagreen',
      },
    }
  ];

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
          <Link to="#" onClick={openSignInModal}>Basketball Shoes</Link>
          <Link to="#" onClick={openSignInModal}>Casual Shoes</Link>
          <Link to="#" onClick={openSignInModal}>Running Shoes</Link>
        </nav>
        <div className="account-links">
          <button className="button-link" onClick={openRegisterModal}>Join Us</button>
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

      <section>
        <div className="video-container2">
          <video className="video-teaser" autoPlay loop muted>
            <source src={creator} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <section
          className="profile-section"
          style={{
            background: 'linear-gradient(to bottom, #727272 30%, #f0f0f0 60%, white 100%)', // Smoother gradient transition from dark gray to light gray and then white
            padding: '60px 0', // Increased padding for more space around the content
            height: 'auto', // Allowing flexible height based on content
            minHeight: '500px', // Minimum height for the section to ensure consistency
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Soft shadow for added depth
          }}
        >
          <div
            className="profile-cards-container"
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: '20px',
              padding: '20px', // Added padding around the container
            }}
          >
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="card"
                style={{
                  margin: '20px 30px',
                  maxWidth: '300px',
                  backgroundColor: 'var(--primary)', // Card background color
                  border: 'none',
                  boxShadow: 'none',
                  textAlign: 'center',
                  borderRadius: '.55rem',
                  transition: 'transform 0.3s ease', // Hover effect
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.3)'} // Hover effect
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} // Reset on hover out
              >
                <div className="card-media" style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={member.image}
                    alt={`${member.name}'s profile`}
                    className="card-img"
                    style={{
                      height: '200px',
                      width: '200px',
                      objectFit: 'cover',
                      borderRadius: '50%',
                      border: '4px solid black',
                      marginTop: '20px',
                    }}
                  />
                </div>
                <div className="card-content" style={{ padding: '16px' }}>
                  <h5>{member.name}</h5>
                  <p>{member.role}</p>
                  <p>{member.description}</p>
                  <div className="social-links" style={{ marginTop: '12px' }}>
                    {member.socialLinks.github && (
                      <IconButton href={member.socialLinks.github} aria-label="github" color="white">
                        <FaGithub />
                      </IconButton>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

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
            <img src={logo} alt="Sapatosan Logo" className="footer-logo" onClick={() => window.location.reload()} />
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

      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default HomePage;