    // Main Code Outline
    const express = require('express');
    const mongoose = require('mongoose');
    const cors = require('cors');
    require('dotenv').config();

    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Routes
    const userRoutes = require('./routes/userRoutes'); 
    const flowerRoutes = require('./routes/flowerRoutes');

    // Mount routes
    app.use('/api/users', userRoutes);
    app.use('/api/flowers', flowerRoutes);

    // Serve static files (e.g., image uploads)
    app.use('/uploads', express.static('uploads'));

    // MongoDB connection
    const MONGO_URI = process.env.MONGODB_URI;

    if (!MONGO_URI) {
    console.error('MONGODB_URI not defined in .env');
    process.exit(1);
    }

    mongoose
    .connect(MONGO_URI)
    .then(() => console.log(' Connected to MongoDB Atlas'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

    // Root route
    app.get('/', (req, res) => {
    res.send('Flower Delivery API is running');
    });

    // Start server
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    });
