//     // Main Code Outline
//     const express = require('express');
//     const mongoose = require('mongoose');
//     const cors = require('cors');
//     const path = require("path");
//     require('dotenv').config();

//     const app = express();
    
//     // Middleware
//     app.use(cors());
//     app.use(express.json());

// // serve images from uploads folder
//     app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



//     // Routes
//     const userRoutes = require('./routes/userRoutes'); 
//     const flowerRoutes = require('./routes/flowerRoutes');

//     // Mount routes
//     app.use('/api/users', userRoutes);
//     app.use('/api/flowers', flowerRoutes);

//     // Serve static files (e.g., image uploads)
//     app.use('/uploads', express.static('uploads'));

//     // MongoDB connection
//     const MONGO_URI = process.env.MONGODB_URI;

//     if (!MONGO_URI) {
//     console.error('MONGODB_URI not defined in .env');
//     process.exit(1);
//     }

//     mongoose
//     .connect(MONGO_URI)
//     .then(() => console.log(' Connected to MongoDB Atlas'))
//     .catch((err) => {
//         console.error('MongoDB connection error:', err);
//         process.exit(1);
//     });

//     // Root route
//     app.get('/', (req, res) => {
//     res.send('Flower Delivery API is running');
//     });

//     // Start server
//     const PORT = process.env.PORT || 3001;
//     app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//     });

// Code Outline
// backend/server.js
// -----------------
// Express server with CORS, Mongo, static /uploads for legacy images,
// and routes for users & flowers.

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// ----- Middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies

// ----- Serve legacy disk images (if any)
// This allows URLs like https://<domain>/uploads/filename.png
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ----- Routes
const userRoutes = require("./routes/userRoutes");
const flowerRoutes = require("./routes/flowerRoutes");

app.use("/api/users", userRoutes);
app.use("/api/flowers", flowerRoutes);

// ----- MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error("Missing MONGO_URI in .env");
    process.exit(1);
    }

    mongoose
    .connect(MONGO_URI)
    .then(() => console.log(" MongoDB connected"))
    .catch((err) => {
        console.error(" MongoDB connection error:", err);
        process.exit(1);
    });

    // ----- Root health route
    app.get("/", (req, res) => {
    res.send("Flower Delivery API is running");
    });

    // ----- Start server
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
    });
