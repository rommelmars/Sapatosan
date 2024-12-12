import axios from 'axios';

// Base URL for the API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/users';
const AUTH_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/auth';
const SHOES_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/shoes';
const ORDER_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/orders';
const CART_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/cart';
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
export const loginUser = async (email, password) => {
    try {
        // Send a POST request to the login endpoint
        const response = await axios.post(`${AUTH_URL}/login`, {
            email,
            password,
        });

        // Store the JWT token in localStorage or cookies for future requests
        localStorage.setItem('token', response.data.token);  // Assuming token is returned

        return response.data; // Returns authentication response (e.g., JWT token)
    } catch (error) {
        console.error('Error logging in user:', error.response ? error.response.data : error.message);
        throw error; // Rethrow error for handling in component
    }
};

// Function to get current username (protected route)
export const getCurrentUsername = async () => {
    try {
        // Get the token from localStorage (or cookies)
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('User is not authenticated');
        }

        // Send the token in the request headers for authentication
        const response = await axios.get(`${AUTH_URL}/current`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data; // Returns the username and ID of the currently authenticated user
    } catch (error) {
        console.error('Error fetching current username:', error);
        throw error; // Rethrow error for handling in component
    }
};

export const fetchShoes = async () => {
    try {
        const response = await axios.get(SHOES_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching shoes:", error);
        throw error;
    }
};


export const createCart = async (cart) => {
    try {
        const response = await axios.post(`${CART_URL}`, cart, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating cart:", error);
        throw error;
    }
};

// Function to fetch orders
export const fetchOrdersByUsername = async () => {
    try {
        const response = await axios.get(`${ORDER_URL}/user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

export const fetchCartItems = async () => {
    try {
        const response = await axios.get(`${CART_URL}/user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching cart items:", error);
        throw error;
    }
};

export const createOrder = async (order) => {
    try {
      const response = await axios.post(`${API_URL}/orders`, order, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  export const updateOrderByUser = async (orderId, order) => {
    try {
        const response = await axios.put(`${ORDER_URL}/${orderId}`, order, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating order:', error);
        throw error;
    }
  };

  export const getCurrentUserInfo = async () => {
    try {
        // Get the token from localStorage (or cookies)
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('User is not authenticated');
        }

        // Send the token in the request headers for authentication
        const response = await axios.get(`${AUTH_URL}/current`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data; // Returns the current user's details (username, email, wallet, etc.)
    } catch (error) {
        console.error('Error fetching current user info:', error);
        throw error; // Rethrow error for handling in component
    }
};

export const deleteCartItemsByUser = async (userId) => {
    try {
        const response = await axios.delete(`${CART_URL}/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting cart items:', error);
        throw error;
    }
};

export const clearCartsByUser = async () => {
    try {
        const response = await axios.delete(`${CART_URL}/user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error clearing cart items:', error);
        throw error;
    }
};

export const deleteCartItemById = async (cartId) => {
    try {
        const response = await axios.delete(`${CART_URL}/${cartId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting cart item:', error);
        throw error;
    }
};