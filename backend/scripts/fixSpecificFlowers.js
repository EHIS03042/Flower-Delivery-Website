    // scripts/fixSpecificFlowers.js
    const mongoose = require("mongoose");
    const cloudinary = require("cloudinary").v2;
    const path = require("path");
    const Flower = require("../models/flowerModel");

    require("dotenv").config();

    cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    (async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        // Find only lily and marigold
        const flowers = await Flower.find({ name: { $in: ["lily", "marigold"] } });

        for (const flower of flowers) {
        console.log(`🔎 Checking ${flower.name}...`);

        // Skip if already a valid Cloudinary URL
        if (flower.image && flower.image.startsWith("http")) {
            console.log(`⏭ Skipping ${flower.name}, already has Cloudinary URL`);
            continue;
        }

        if (flower.image) {
            const localPath = path.join(__dirname, "..", "uploads", flower.image);

            try {
            const result = await cloudinary.uploader.upload(localPath, {
                folder: "flowers",
                transformation: [{ quality: "auto", fetch_format: "auto" }],
            });

            flower.image = result.secure_url;
            await flower.save();

            console.log(`✅ Updated ${flower.name} -> ${result.secure_url}`);
            } catch (err) {
            console.error(`❌ Failed to update ${flower.name}:`, err.message);
            }
        } else {
            console.warn(`⚠️ ${flower.name} has no image field in DB`);
        }
        }

        console.log("🎉 Repair complete");
        process.exit();
    } catch (err) {
        console.error("❌ Error:", err.message);
        process.exit(1);
    }
    })();
