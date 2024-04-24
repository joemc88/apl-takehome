import {React, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NotFound from './components/NotFound'
import ProductDashboard from './components/ProductDashboard'
import { AuthProvider } from './AuthContext';

function App() {
 
  return (
    <AuthProvider>
        <Router>
          <Routes> 
            <Route exact path="/" element={<ProductDashboard/>} />     
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </Router>
    </AuthProvider>
  );
}

export default App;
