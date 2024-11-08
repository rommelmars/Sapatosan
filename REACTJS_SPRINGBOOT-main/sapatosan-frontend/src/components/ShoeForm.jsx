import axios from 'axios';
import React, { useState } from 'react';

const ShoeForm = () => {
  const [shoe, setShoe] = useState({
    name: '',
    category: '',
    size: '',
    stock: 0,
    price: 0,
  });

  const handleChange = (e) => {
    setShoe({ ...shoe, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/shoes', shoe)
      .then(response => {
        alert('Shoe added successfully!');
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Add a New Shoe</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={shoe.name} onChange={handleChange} placeholder="Shoe Name" />
        <input type="text" name="category" value={shoe.category} onChange={handleChange} placeholder="Category" />
        <input type="text" name="size" value={shoe.size} onChange={handleChange} placeholder="Size" />
        <input type="number" name="stock" value={shoe.stock} onChange={handleChange} placeholder="Stock" />
        <input type="number" name="price" value={shoe.price} onChange={handleChange} placeholder="Price" />
        <button type="submit">Add Shoe</button>
      </form>
    </div>
  );
};

export default ShoeForm;
