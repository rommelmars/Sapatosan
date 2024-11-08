import React, { useState } from 'react';
import { createUser } from '../services/apiService'; // Ensure this path is correct
import './Register.css'; // CSS for the modal

const Register = ({ closeModal }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages

        // Check if passwords match
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        const userData = { username, email, password };

        try {
            const createdUser = await createUser(userData);
            setMessage(`User ${createdUser.username} created successfully!`);
            // Optionally close modal or reset form here
        } catch (error) {
            setMessage('Error creating user. Please try again.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={closeModal}>X</button>
                <h2>Be A Part Of Us</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />

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

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        placeholder="Confirm your password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />

                    <button type="submit" className="submit-button">Register</button>
                </form>
                {message && <p className="feedback-message">{message}</p>}
            </div>
        </div>
    );
};

export default Register;
