        // scripts/migrateImages.js
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
            // Only skip if image already ends with a valid extension
            if (flower.image && flower.image.match(/\.(png|jpg|jpeg|gif)$/i)) {
                console.log(`⏭ Skipping ${flower.name}, already has valid Cloudinary URL`);
                continue;
            }

            // Look for local file in uploads folder
            const uploadsDir = path.join(__dirname, "..", "uploads");
            const files = fs.readdirSync(uploadsDir);

            const match = files.find(file =>
                file.toLowerCase().includes(flower.name.toLowerCase())
            );

            if (!match) {
                console.log(`❌ No local file found for ${flower.name}`);
                continue;
            }

            const localPath = path.join(uploadsDir, match);

            try {
                const result = await cloudinary.uploader.upload(localPath, {
                folder: "flowers",
                transformation: [{ quality: "auto", fetch_format: "auto" }],
                resource_type: "image",
                });

                flower.image = result.secure_url; // ✅ Save proper Cloudinary URL
                await flower.save();

                console.log(`✅ Updated ${flower.name} -> ${result.secure_url}`);
            } catch (err) {
                console.error(`❌ Failed to update ${flower.name}`, err.message);
            }
            }

            console.log("🎉 Migration complete");
            process.exit();
        } catch (err) {
            console.error("❌ Migration error:", err.message);
            process.exit(1);
        }
        })();

    