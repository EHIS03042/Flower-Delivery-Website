    // scripts/migrateImagesOptimized.js
    const mongoose = require("mongoose");
    const cloudinary = require("cloudinary").v2;
    const path = require("path");
    const fs = require("fs");
    const Flower = require("../models/flowerModel");

    require("dotenv").config();

    // Configure Cloudinary
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
        // Skip if already optimized
        if (flower.image && flower.image.includes("w_600,h_600,c_fill,q_auto,f_auto")) {
            console.log(`⏭ Skipping ${flower.name}, already optimized`);
            continue;
        }

        // Fallback: skip if no image field
        if (!flower.image) {
            console.log(`⚠️ Skipping ${flower.name}, no image found`);
            continue;
        }

        try {
            let result;

            if (flower.image.startsWith("http")) {
            // Re-upload existing Cloudinary URL
            result = await cloudinary.uploader.upload(flower.image, {
                folder: "flowers",
                transformation: [
                { width: 600, height: 600, crop: "fill" },
                { quality: "auto" },
                { fetch_format: "auto" },
                ],
            });
            } else {
            // Re-upload from local /uploads folder
            const localPath = path.join(__dirname, "..", "uploads", flower.image);
            if (!fs.existsSync(localPath)) {
                console.log(`⚠️ File not found for ${flower.name}: ${localPath}`);
                continue;
            }

            result = await cloudinary.uploader.upload(localPath, {
                folder: "flowers",
                transformation: [
                { width: 600, height: 600, crop: "fill" },
                { quality: "auto" },
                { fetch_format: "auto" },
                ],
            });
            }

            // Save optimized Cloudinary URL
            flower.image = result.secure_url;
            await flower.save();

            console.log(`✅ Updated ${flower.name} -> ${flower.image}`);
        } catch (err) {
            console.error(`❌ Failed to update ${flower.name}:`, err.message);
        }
        }

        console.log("🎉 Migration complete. All images optimized.");
        process.exit();
    } catch (err) {
        console.error("❌ Migration error:", err.message);
        process.exit(1);
    }
    })();
