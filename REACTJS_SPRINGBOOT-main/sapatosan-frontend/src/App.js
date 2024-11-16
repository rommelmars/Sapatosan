import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminPage from './components/AdminPage';
import Basketballshoe from './components/Basketballshoe';
import HomePage from './components/HomePage';
import RunningShoesList from './components/RunningShoesList';
import ShoeForm from './components/ShoeForm';
import ShoeList from './components/ShoeList';
import ShoeListings from './components/ShoeListings';
import ShoesManagement from './components/ShoesManagement';

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
        <Route path="/shoes" element={<ShoeList />} />
        <Route path="/add-shoe" element={<ShoeForm />} />
        <Route path="/listings" element={<ShoeListings />} />
        <Route path="/running-shoes" element={<RunningShoesList />} />
        <Route path="/admin-login" element={<AdminLogin onLogin={handleLogin} />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/basketball-shoes" element={<Basketballshoe />} />
      </Routes>
    </Router>
  );
}

export default App;


