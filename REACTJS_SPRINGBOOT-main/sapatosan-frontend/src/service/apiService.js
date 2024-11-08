import axios from 'axios';

// Base URL for the API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/users';
const AUTH_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/auth';

// Function to create a new user
export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/create`, userData);
        return response.data; // Returns created user info
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; // Rethrow error for handling in component
    }
};

// Function to get all users
export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`);
        return response.data; // Returns the list of users
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Rethrow error for handling in component
    }
};

// Function to get a specific user by ID
export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data; // Returns user info by ID
    } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error);
        throw error;
    }
};

// Function to update user information
export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, userData);
        return response.data; // Returns updated user info
    } catch (error) {
        console.error(`Error updating user with ID ${id}:`, error);
        throw error;
    }
};

// Function to delete a user by ID
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data; // Returns a success message or the deleted user info
    } catch (error) {
        console.error(`Error deleting user with ID ${id}:`, error);
        throw error;
    }
};

// Function to log in a user
// Function to log in a user
export const loginUser = async (email, password) => {
    try {
        // Send a POST request to the login endpoint
        const response = await axios.post(`${AUTH_URL}/login`, {
            email,
            password,
        });

        // Debugging: Log the response data to see what the API returns
        console.log('Login response:', response.data); // **New line added**

        return response.data; // Returns authentication response (e.g., JWT token)
    } catch (error) {
        // Enhanced error handling
        console.error('Error logging in user:', error.response ? error.response.data : error.message); // **Modified line**
        throw error; // Rethrow error for handling in component
    }
};

