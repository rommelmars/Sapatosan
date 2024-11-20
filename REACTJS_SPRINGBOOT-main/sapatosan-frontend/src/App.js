import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminPage from './components/AdminPage';
import Basketballshoe from './components/Basketballshoe';
import HomePage from './components/HomePage';
import RunningShoesList from './components/RunningShoesList';
import ShoeForm from './components/ShoeForm';
import ShoeListings from './components/ShoeListings';
import ShoesManagement from './components/ShoesManagement';
import Profile from './components/Profile';
import Orders from './components/Orders';

import Cart from './components/Cart';
import Checkout from './components/Checkout';


function App() {
  const [adminToken, setAdminToken] = useState(null);

  const handleLogin = (token) => {
    setAdminToken(token); // Store the token in state
    localStorage.setItem("adminToken", token); // Also store it in localStorage if needed
  };
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shoes-management" element={<ShoesManagement />} />
        <Route path="/add-shoe" element={<ShoeForm />} />
        <Route path="/listings" element={<ShoeListings />} />
        <Route path="/running-shoes" element={<RunningShoesList />} />
        <Route path="/admin-login" element={<AdminLogin onLogin={handleLogin} />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/basketball-shoes" element={<Basketballshoe />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;


