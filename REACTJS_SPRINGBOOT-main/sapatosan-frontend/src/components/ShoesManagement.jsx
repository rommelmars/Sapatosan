import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';  // Use useNavigate here
import "./ShoesManagement.css";
import shoeImage from './registerImage.png';

function ShoesManagement() {
    const navigate = useNavigate();  // Initialize useNavigate
    const [shoes, setShoes] = useState([]);
    const [categories, setCategories] = useState([]); // State for categories
    const [newShoe, setNewShoe] = useState({
        name: "",
        description: "",
        price: "",
        stock_quantity: "",
        imageUrl: "",
        productid: null,
        category: "" // Add category to newShoe state
    });
    const [imageFile, setImageFile] = useState(null);
    const [originalShoe, setOriginalShoe] = useState(null);
    const [addShoeError, setAddShoeError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        fetchShoes();
        fetchCategories();  // Fetch categories when the component mounts
        
    }, []);

    const fetchShoes = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/shoes');
            const shoesWithCategories = response.data.map(shoe => ({
                ...shoe,
                imageUrl: `http://localhost:8080/images/${shoe.image}`,
                categoryName: shoe.categoryName || "N/A"  // Ensuring categoryName is included
                
            }));
            setShoes(shoesWithCategories);
        } catch (error) {
            console.error('Failed to fetch shoes:', error);
        } finally {
            setLoading(false);
        }
    };
    
    
    

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/categories/getall');
            console.log('Categories response:', response.data);  // Log the whole response
            // Extract the content from the paginated response
            setCategories(response.data.content);  // The 'content' field holds the categories array
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewShoe((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleConfirmAction = (message, action) => {
        if (window.confirm(message)) {
            action();
        }
    };

    const addShoe = async () => {
        if (!newShoe.name || !newShoe.description || !newShoe.price || !newShoe.stock_quantity || !newShoe.category) {
            setAddShoeError('All fields are required.');
            return;
        }
    
        const formData = new FormData();
        formData.append('name', newShoe.name);
        formData.append('description', newShoe.description);
        formData.append('price', newShoe.price);
        formData.append('stock_quantity', newShoe.stock_quantity);
        formData.append('categoryID', newShoe.category);  // Updated to 'categoryID'
        if (imageFile) {
            formData.append('image', imageFile);
        }
    
        try {
            const response = await axios.post('http://localhost:8080/api/shoes/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            const newShoeData = {
                ...newShoe,
                productid: response.data.productid,
                imageUrl: `http://localhost:8080/images/${response.data.image}`
            };
            setShoes((prevShoes) => [...prevShoes, newShoeData]);
            console.log('Shoe added successfully');
            resetForm();
        } catch (error) {
            console.error('Failed to add shoe:', error);
            setAddShoeError('Failed to add shoe: ' + error.message);
        }
    };

    const updateShoe = async () => {
        const isChanged = Object.keys(newShoe).some(
            (key) => newShoe[key] !== originalShoe[key]
        );
    
        if (!isChanged && !imageFile) {
            setAddShoeError("No changes made to update.");
            return;
        }
    
        const formData = new FormData();
        formData.append('name', newShoe.name);
        formData.append('description', newShoe.description);
        formData.append('price', newShoe.price);
        formData.append('stock_quantity', newShoe.stock_quantity);
        formData.append('category', newShoe.category);  // Add category to form data
    
        if (imageFile) {
            formData.append('image', imageFile);
        }
    
        handleConfirmAction("Are you sure you want to update this record?", async () => {
            try {
                await axios.put(
                    `http://localhost:8080/api/shoes/${newShoe.productid}/update`, 
                    formData, 
                    {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    }
                );
                fetchShoes();
                resetForm();
            } catch (error) {
                console.error("Failed to update shoe:", error);
                if (error.response) {
                    console.error("Error data:", error.response.data);
                    setAddShoeError('Failed to update shoe: ' + error.response.data.message || error.message);
                } else {
                    setAddShoeError('Failed to update shoe: ' + error.message);
                }
            }
        });
    };
    

    const deleteShoe = async (id) => {
        handleConfirmAction("Are you sure you want to delete this record?", async () => {
            try {
                await axios.delete(`http://localhost:8080/api/shoes/${id}`);
                fetchShoes();
            } catch (error) {
                console.error("Failed to delete shoe:", error);
                setAddShoeError('Failed to delete shoe: ' + error.message);
            }
        });
    };

    const resetForm = () => {
        setNewShoe({ name: "", description: "", price: "", stock_quantity: "", imageUrl: "", productid: null, category: "" });
        setImageFile(null);
        setAddShoeError("");
        setIsEditMode(false);
    };

    const handleEditClick = (shoe) => {
        setNewShoe({
            name: shoe.name,
            description: shoe.description,
            price: shoe.price,
            stock_quantity: shoe.stock_quantity,
            imageUrl: shoe.imageUrl,
            productid: shoe.productid,
            category: shoe.category // Set the category during edit
        });
        setOriginalShoe({
            name: shoe.name,
            description: shoe.description,
            price: shoe.price,
            stock_quantity: shoe.stock_quantity,
            imageUrl: shoe.imageUrl,
            productid: shoe.productid,
            category: shoe.category
        });
        setIsEditMode(true);
    };

    const restrictNumericInput = (e) => {
        if (/\D/.test(e.key)) {
            e.preventDefault();
        }
    };

    return (
        <div className="shoes-management-page">
            <header className="shoes-management-header">
                <Link to="/">
                    <img src={shoeImage} alt="Logo" className="shoes-management-logo" onClick={() => navigate('/')} />
                </Link>
                <h2>Shoes Management</h2>
            </header>
            {addShoeError && <p className="error">{addShoeError}</p>}
            <div className="product-form">
                <input
                    name="name"
                    placeholder="Shoe Name"
                    onChange={handleInputChange}
                    value={newShoe.name}
                    required
                    className="small-input"
                />
                <input
                    name="description"
                    placeholder="Description"
                    onChange={handleInputChange}
                    value={newShoe.description}
                    required
                    className="small-input"
                />
                <input
                    name="price"
                    placeholder="Price"
                    onChange={handleInputChange}
                    value={newShoe.price}
                    onKeyPress={restrictNumericInput}
                    required
                    className="small-input"
                />
                <input
                    name="stock_quantity"
                    placeholder="Stock"
                    onChange={handleInputChange}
                    value={newShoe.stock_quantity}
                    onKeyPress={restrictNumericInput}
                    required
                    className="small-input"
                />
<select value={newShoe.category} onChange={(e) => setNewShoe({ ...newShoe, category: e.target.value })}>
    <option value="" disabled>Select a category</option>
    {categories.map((category) => (
        <option key={category.categoryID} value={category.categoryID}>
            {category.categoryName}
        </option>
    ))}
</select>
                <input type="file" onChange={handleImageChange} accept="image/*" className="small-input" />
                {newShoe.imageUrl && !imageFile && (
                    <div>
                        <p>Current Image:</p>
                        <img src={newShoe.imageUrl} alt={newShoe.name} width="50" />
                    </div>
                )}
                <button onClick={isEditMode ? updateShoe : addShoe} style={{ backgroundColor: isEditMode ? "orange" : "green" }} disabled={loading}>
                    {isEditMode ? "Update Shoe" : "Add Shoe"}
                </button>
                {isEditMode && (
                    <button onClick={resetForm} style={{ backgroundColor: "red" }} disabled={loading}>
                        Cancel
                    </button>
                )}
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
                        <th>Category</th>
                        <th>Image</th>
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
            <td>{shoe.categoryName}</td> {/* Ensure this field is mapped correctly */}
            <td>
                {shoe.imageUrl && (
                    <img src={shoe.imageUrl} alt={shoe.name} width="50" />
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
