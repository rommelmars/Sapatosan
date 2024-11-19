import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminLogin from "./AdminLogin";
import "./AdminPage.css";
import shoeImage from './registerImage.png'; // Import the logo image
 
function AdminPage() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: "",
        category: ""
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState("");
 
    useEffect(() => {
        if (isLoggedIn) {
            fetchProducts();
        }
    }, [isLoggedIn]);
 
    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/admin/products", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };
 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };
 
    const addProduct = async () => {
        try {
            await axios.post("http://localhost:8080/api/admin/products", newProduct, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchProducts();
            setNewProduct({ name: "", description: "", price: "", stock: "", imageUrl: "", category: "" });
        } catch (error) {
            console.error("Failed to add product:", error);
        }
    };
 
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/admin/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchProducts();
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    };
 
    const handleLogin = (token) => {
        setIsLoggedIn(true);
        setToken(token);
    };
 
    return (
        <div className="admin-page">
            {!isLoggedIn ? (
                <AdminLogin onLogin={handleLogin} />
            ) : (
                <>
                    <header className="admin-header">
                        <img src={shoeImage} alt="Logo" className="admin-logo" />
                        <h2>Admin Dashboard</h2>
                    </header>
                    <h2>Admin Page - Product Management</h2>
                    <div className="product-form">
                        <input name="name" placeholder="Product Name" onChange={handleInputChange} value={newProduct.name} />
                        <input name="description" placeholder="Description" onChange={handleInputChange} value={newProduct.description} />
                        <input name="price" placeholder="Price" onChange={handleInputChange} value={newProduct.price} />
                        <input name="stock" placeholder="Stock" onChange={handleInputChange} value={newProduct.stock} />
                        <input name="imageUrl" placeholder="Image URL" onChange={handleInputChange} value={newProduct.imageUrl} />
                        <select name="category" onChange={handleInputChange} value={newProduct.category}>
                            <option value="">Select Category</option>
                            <option value="soccer">Soccer</option>
                            <option value="basketball">Basketball</option>
                            <option value="sandals">Sandals</option>
                            <option value="running">Running</option>
                            <option value="casual">Casual</option>
                        </select>
                        <button onClick={addProduct}>Add Product</button>
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
                                <th>Image URL</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.productId} className="product-item">
                                    <td>{product.productId}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.category}</td>
                                    <td><img src={product.imageUrl} alt={product.name} width="50" /></td>
                                    <td>
                                        <button onClick={() => deleteProduct(product.productId)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}
 
export default AdminPage;