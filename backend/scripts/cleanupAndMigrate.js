    // scripts/cleanupAndMigrate.js
    const mongoose = require("mongoose");
    const cloudinary = require("cloudinary").v2;
    const path = require("path");
    const fs = require("fs");
    const Flower = require("../models/flowerModel");

    require("dotenv").config();

    // Cloudinary config
    cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    (async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        const flowers = await Flower.find();

        for (const flower of flowers) {
        // If URL already looks valid (has version + https), keep it
        if (flower.image && flower.image.startsWith("https://res.cloudinary.com") && flower.image.includes("/upload/v")) {
            console.log(`⏭ Skipping ${flower.name}, already has secure_url`);
            continue;
        }

        // If old-style broken Cloudinary URL, re-upload from local uploads
        if (flower.image && !flower.image.includes("/upload/v")) {
            const fileName = path.basename(flower.image); // e.g. 1756570271559-Snowfall.png
            const localPath = path.join(__dirname, "..", "uploads", fileName);

            if (fs.existsSync(localPath)) {
            try {
                const result = await cloudinary.uploader.upload(localPath, {
                folder: "flowers",
                });

                flower.image = result.secure_url; // ✅ use real Cloudinary URL
                await flower.save();

                console.log(`✅ Fixed ${flower.name} -> ${result.secure_url}`);
            } catch (err) {
                console.error(`❌ Failed to re-upload ${flower.name}:`, err.message);
            }
            } else {
            console.warn(`⚠️ Missing local file for ${flower.name}: ${localPath}`);
            }
        }
        }

        console.log("🎉 Cleanup + migration complete!");
        process.exit();
    } catch (err) {
        console.error("❌ Script error:", err.message);
        process.exit(1);
    }
    })();
