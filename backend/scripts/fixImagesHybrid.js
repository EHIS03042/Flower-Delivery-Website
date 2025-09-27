    // backend/scripts/fixImagesHybrid.js
    const path = require("path"); // <-- import path first
    console.log("🚀 Migration script starting...");

    require("dotenv").config({ path: path.join(__dirname, "../.env") });

    const mongoose = require("mongoose");
    const cloudinary = require("cloudinary").v2;
    const fs = require("fs");
    const Flower = require("../models/flowerModel");

    // ✅ Configure Cloudinary
    cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Default fallback image (upload this once to Cloudinary manually and paste URL here)
    const DEFAULT_IMAGE =
    "https://res.cloudinary.com/duq0nbvxs/image/upload/v1234567890/flowers/placeholder.jpg";

    (async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB");

        const brokenFlowers = await Flower.find({
        image: { $not: /^https/ }, // not Cloudinary
        });

        console.log(`Found ${brokenFlowers.length} broken flowers.`);

        for (const flower of brokenFlowers) {
        console.log(`🔄 Fixing ${flower.name} (${flower.image})...`);

        const localPath = path.join(__dirname, "..", "uploads", flower.image);

        try {
            let imageUrl = DEFAULT_IMAGE;

            if (fs.existsSync(localPath)) {
            const result = await cloudinary.uploader.upload(localPath, {
                folder: "flowers",
                transformation: [{ quality: "auto", fetch_format: "auto" }],
            });
            imageUrl = result.secure_url;
            } else {
            console.warn(
                `⚠️ Local file not found for ${flower.name}, using placeholder`
            );
            }

            flower.image = imageUrl;
            await flower.save();
            console.log(`✅ Updated ${flower.name}: ${imageUrl}`);
        } catch (err) {
            console.error(`❌ Failed to fix ${flower.name}:`, err.message);
        }
        }

        console.log("🎉 Migration complete");
        process.exit();
    } catch (err) {
        console.error("Migration error:", err.message);
        process.exit(1);
    }
    })();
