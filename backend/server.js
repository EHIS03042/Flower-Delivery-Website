        // // backend/server.js
        // const express = require("express");
        // const mongoose = require("mongoose");
        // const cors = require("cors");
        // require("dotenv").config();
        // const Stripe = require("stripe");


        // const app = express();
        // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        // // ----- Middleware
        // app.use(cors());
        // app.use(express.json());

        // // ----- Routes
        // const userRoutes = require("./routes/userRoutes");
        // const flowerRoutes = require("./routes/flowerRoutes");
        // const paymentRoutes = require("./routes/paymentRoutes"); 


        // app.use("/api/users", userRoutes);
        // app.use("/api/flowers", flowerRoutes);
        // app.use("/api/payment", paymentRoutes);


        // // ✅ Stripe Checkout Route
        // app.post("/api/payment/create-checkout-session", async (req, res) => {
        // try {
        //     const { items } = req.body;

        //     if (!items || !Array.isArray(items)) {
        //     return res.status(400).json({ error: "Invalid cart items" });
        //     }

        //     const lineItems = items.map((item) => ({
        //     price_data: {
        //         currency: "usd",
        //         product_data: {
        //         name: item.name,
        //         images: item.image ? [item.image] : [],
        //         },
        //         unit_amount: item.price * 100, // ✅ convert dollars to cents
        //     },
        //     quantity: item.quantity || 1,
        //     }));

        //     const session = await stripe.checkout.sessions.create({
        //     payment_method_types: ["card"],
        //     mode: "payment",
        //     line_items: lineItems,

        //     // ✅ Success & cancel URLs come from .env (recommended)
        //     success_url: `${process.env.CLIENT_URL}/?payment=success`,
        //     cancel_url: `${process.env.CLIENT_URL}/checkout?payment=failed`,
        //     });

        //     res.json({ url: session.url });
        // } catch (error) {
        //     console.error("❌ Stripe Checkout Error:", error.message);
        //     res.status(500).json({ error: error.message });
        // }
        // });

        // // ----- MongoDB connection
        // const MONGO_URI = process.env.MONGO_URI;
        // if (!MONGO_URI) {
        // console.error("❌ Missing MONGO_URI in .env");
        // process.exit(1);
        // }

        // mongoose
        // .connect(MONGO_URI, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // })
        // .then(() => console.log("✅ MongoDB connected"))
        // .catch((err) => {
        //     console.error("❌ MongoDB connection error:", err.message);
        //     process.exit(1);
        // });

        // // ----- Root health route
        // app.get("/", (req, res) => {
        // res.send("🌸 Flower Delivery API is running");
        // });

        // // ----- Start server
        // const PORT = process.env.PORT || 3001;
        // app.listen(PORT, () => {
        // console.log(`🚀 Server running on http://localhost:${PORT}`);
        // });

        // Re-Code server.js
        // backend/server.js
    const express = require("express");
    const mongoose = require("mongoose");
    const cors = require("cors");
    require("dotenv").config();

    const app = express();

    // ----- Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // ----- Import Routes
    const userRoutes = require("./routes/userRoutes");
    const flowerRoutes = require("./routes/flowerRoutes");
    const paymentRoutes = require("./routes/paymentRoutes");
    const authRoutes = require("./routes/authRoutes");
    

    // ----- Use Routes
    app.use("/api/users", userRoutes);
    app.use("/api/flowers", flowerRoutes);
    app.use("/api/payment", paymentRoutes); // ✅ Stripe payment route handled ONLY here
    app.use("/api/auth", authRoutes);

    // ----- MongoDB Connection
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

    // ----- Health Check Route
    app.get("/", (req, res) => {
    res.send("🌸 Flower Delivery API is running");
    });

    // ----- Start Server
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
