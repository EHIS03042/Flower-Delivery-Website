    // backend/server.js
    const express = require("express");
    const mongoose = require("mongoose");
    const cors = require("cors");
    require("dotenv").config();

    const app = express();

    // ----- Middleware
    app.use(cors());
    app.use(express.json());

    // ----- Routes
    const userRoutes = require("./routes/userRoutes");
    const flowerRoutes = require("./routes/flowerRoutes");

    app.use("/api/users", userRoutes);
    app.use("/api/flowers", flowerRoutes);

    // ----- MongoDB connection
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
    console.error("❌ Missing MONGO_URI in .env");
    process.exit(1);
    }

    mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    });

    // ----- Root health route
    app.get("/", (req, res) => {
    res.send("🌸 Flower Delivery API is running");
    });

    // ----- Start server
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
