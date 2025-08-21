// App.js 
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Flowers from "./pages/Flowers";
import AddFlower from "./pages/AddFlower";
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
          <Route path="/flowers" element={<Flowers />} />
          <Route path="/add-flower" element={<AddFlower />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
