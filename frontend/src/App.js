import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate,Outlet } from 'react-router-dom';
import './App.css';
import NotFound from './components/NotFound'
import ProductDashboard from './components/ProductDashboard'


function App() {
  return (
    
    <Router>
      <Routes> 
        <Route exact path="/" element={<ProductDashboard/>} />     
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
