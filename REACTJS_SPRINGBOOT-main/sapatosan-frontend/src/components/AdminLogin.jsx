import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AdminLogin.css';
import shoeImage from './registerImage.png'; // Update the path as necessary

const AdminLogin = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/admins/login", {
                username,
                password,
            });
            const { token } = response.data;

            onLogin(token); // Pass the token to the parent component
            navigate("/admin"); // Redirect to the admin page
        } catch (error) {
            console.error("Login failed:", error);
            // Handle error (show a message to the user)
        }
    };

    return (
        <div className="login-container">
            <div className="image-container">
                <img src={shoeImage} alt="Shoe" className="large-image" /> {/* Use the imported shoe image here */}
            </div>
            <div className="form-container">
                <h2>Admin Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
