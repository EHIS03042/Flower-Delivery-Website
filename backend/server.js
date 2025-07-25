    // Main Code Outline.
    const express = require('express');
    const mongoose = require('mongoose');
    const cors = require('cors');
    require('dotenv').config();

    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());

    // MongoDB connection
    const MONGO_URI = process.env.MONGODB_URI;

    if (!MONGO_URI) {
    console.error(" MONGODB_URI not defined in .env");
    process.exit(1); // Exit the server early
    }

    mongoose.connect(MONGO_URI
    )
    
    .then(() => console.log(' Connected to MongoDB Atlas'))
    .catch((err) => {
    console.error(' MongoDB connection error:', err);
    process.exit(1);
    });

    // Static files
    app.use('/uploads', express.static('uploads'));

    // Routes
    const flowerRoutes = require('./routes/flowerRoutes');
    app.use('/api/flowers', flowerRoutes);

    // Root route
    app.get('/', (req, res) => {
    res.send(' Flower Delivery API is running');
    });

    // Start the server
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
    });
