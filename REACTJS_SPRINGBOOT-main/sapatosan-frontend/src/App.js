import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminPage from './components/AdminPage';
import HomePage from './components/HomePage';
import ShoeForm from './components/ShoeForm';
import ShoeList from './components/ShoeList';
import ShoeListings from './components/ShoeListings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shoes" element={<ShoeList />} />
        <Route path="/add-shoe" element={<ShoeForm />} />
        <Route path="/listings" element={<ShoeListings />} />
        <Route path="/admin-login" element={<AdminPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
