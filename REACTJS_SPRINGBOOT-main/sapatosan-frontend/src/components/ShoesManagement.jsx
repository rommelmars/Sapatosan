import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./ShoesManagement.css";
import shoeImage from './registerImage.png';

function ShoesManagement() {
    const [shoes, setShoes] = useState([]);
    const [newShoe, setNewShoe] = useState({
        name: "",
        description: "",
        price: "",
        stock_quantity: "", // Ensure this matches the entity
        imageUrl: "",
        productid: null // Ensure this matches the entity
    });
    const [imageFile, setImageFile] = useState(null);
    const [addShoeError, setAddShoeError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        fetchShoes();
    }, []);

    const fetchShoes = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/shoes');
            console.log('API Response:', response.data); // Log the API response
            const shoesWithImages = response.data.map(shoe => ({
                ...shoe,
                imageUrl: `http://localhost:8080/images/${shoe.image}` // Adjust this based on your image path
            }));
            setShoes(shoesWithImages);
        } catch (error) {
            console.error('Failed to fetch shoes:', error);
        } finally {
            setLoading(false);
        }
    };
    
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewShoe((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const addShoe = async () => {
        if (!newShoe.name || !newShoe.description || !newShoe.price || !newShoe.stock_quantity) {
            setAddShoeError('All fields are required.');
            return;
        }
    
        const formData = new FormData();
        formData.append('name', newShoe.name);
        formData.append('description', newShoe.description);
        formData.append('price', newShoe.price);
        formData.append('stock_quantity', newShoe.stock_quantity);
        if (imageFile) {
            formData.append('image', imageFile);
        }
    
        try {
            // Upload the shoe data
            const response = await axios.post('http://localhost:8080/api/shoes/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
    
            // Automatically add the new shoe to the list of shoes
            const newShoeData = {
                ...newShoe,
                productid: response.data.productid, // Assuming the API returns the new product ID
                imageUrl: `http://localhost:8080/images/${response.data.image}` // Set the image URL
            };
    
            setShoes((prevShoes) => [...prevShoes, newShoeData]); // Add new shoe to the list
            console.log('Shoe added successfully');
            resetForm();
        } catch (error) {
            console.error('Failed to add shoe:', error);
            setAddShoeError('Failed to add shoe: ' + error.message);
        }
    };
    

    const updateShoe = async () => {
        if (!newShoe.productid) {
            setAddShoeError('No product selected for update.');
            return;
        }
    
        const formData = new FormData();
        formData.append('name', newShoe.name);
        formData.append('description', newShoe.description);
        formData.append('price', newShoe.price);
        formData.append('stock_quantity', newShoe.stock_quantity);
        if (imageFile) {
            formData.append('image', imageFile);
        }
    
        try {
            await axios.put(`http://localhost:8080/api/shoes/${newShoe.productid}/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log("Shoe updated successfully");
            fetchShoes();
            resetForm();
        } catch (error) {
            console.error("Failed to update shoe:", error);
            setAddShoeError('Failed to update shoe: ' + error.message);
        }
    };

    const deleteShoe = async (id) => {
        if (window.confirm("Are you sure you want to delete this shoe?")) {
            try {
                await axios.delete(`http://localhost:8080/api/shoes/${id}`);
                fetchShoes();
            } catch (error) {
                console.error("Failed to delete shoe:", error);
                setAddShoeError('Failed to delete shoe: ' + error.message);
            }
        }
    };

    const resetForm = () => {
        setNewShoe({ name: "", description: "", price: "", stock_quantity: "", imageUrl: "", productid: null });
        setImageFile(null);
        setAddShoeError("");
        setIsEditMode(false);
    };

    const handleEditClick = (shoe) => {
        setNewShoe({
            name: shoe.name,
            description: shoe.description,
            price: shoe.price,
            stock_quantity: shoe.stock_quantity, // Ensure this matches the entity
            imageUrl: shoe.imageUrl,
            productid: shoe.productid // Make sure this matches the field name in your ShoesEntity
        });
        setIsEditMode(true); // Ensure edit mode is activated
    };

    return (
        <div className="shoes-management-page">
            <header className="shoes-management-header">
            <Link to="/"> {/* Link to navigate back to HomePage */}
                    <img src={shoeImage} alt="Logo" className="shoes-management-logo" />
                </Link>
                
                <h2>Shoes Management</h2>
            </header>
            {addShoeError && <p className="error">{addShoeError}</p>}
            <div className="product-form">
                <input name="name" placeholder="Shoe Name" onChange={handleInputChange} value={newShoe.name} required />
                <input name="description" placeholder="Description" onChange={handleInputChange} value={newShoe.description} required />
                <input name="price" placeholder="Price" onChange={handleInputChange} value={newShoe.price} required />
                <input name="stock_quantity" placeholder="Stock" onChange={handleInputChange} value={newShoe.stock_quantity} required />
                <input type="file" onChange={handleImageChange} accept="image/*" />
                {newShoe.imageUrl && !imageFile && (
                    <div>
                        <p>Current Image:</p>
                        <img src={newShoe.imageUrl} alt={newShoe.name} width="50" />
                    </div>
                )}
                <button onClick={isEditMode ? updateShoe : addShoe} disabled={loading}>
                    {isEditMode ? "Update Shoe" : "Add Shoe"}
                </button>
                {loading && <p>Loading...</p>}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Image</th> {/* New column for image */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {shoes.map(shoe => (
                        <tr key={shoe.productid}>
                            <td>{shoe.productid}</td>
                            <td>{shoe.name}</td>
                            <td>{shoe.description}</td>
                            <td>{shoe.price}</td>
                            <td>{shoe.stock_quantity}</td>
                            <td>
                                {shoe.imageUrl && ( // Render the image if the imageUrl exists
                                    <img src={shoe.imageUrl} alt={shoe.imageUrl} width="50" />
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleEditClick(shoe)}>Edit</button>
                                <button onClick={() => deleteShoe(shoe.productid)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShoesManagement;
