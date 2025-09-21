// App.js 
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Flowers from "./pages/Flowers";
import AddFlower from "./pages/AddFlower";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1 className="app-title">Admin Panel</h1>
        <nav className="navbar">
          <Link to="/flowers" className="nav-link">Flowers</Link>
          <Link to="/add-flower" className="nav-link">Add Flowers</Link>
        </nav>
        <hr />
        <Routes>
          {/* Default redirect from "/" to "/flowers" */}
          <Route path="/" element={<Navigate to="/flowers" replace />} />

          {/* Main routes */}
          <Route path="/flowers" element={<Flowers />} />
          <Route path="/add-flower" element={<AddFlower />} />

          {/* Fallback for unknown routes */}
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
      <ToastContainer position="top-right" autoClose={3001} />
    </Router>
  );
}

export default App;
