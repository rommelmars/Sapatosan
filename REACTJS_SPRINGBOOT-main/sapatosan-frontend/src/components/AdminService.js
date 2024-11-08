import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admins'; // Ensure this matches your backend URL

const loginAdmin = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password,
        });
        return response.data; // Return the token or success message
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data); // Server error response
        } else {
            throw new Error('An error occurred. Please try again.'); // Other errors
        }
    }
};

export { loginAdmin };
