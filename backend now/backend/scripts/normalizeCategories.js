    // backend/scripts/normalizeCategories.js
    require("dotenv").config();
    const mongoose = require("mongoose");
    const Flower = require("../models/flowerModel");

    // ✅ Map label → slug
    const categorySlugMap = {
    "Fresh Flowers": "fresh-flowers",
    "Dried Flowers": "dried-flowers",
    "Live Plants": "live-plants",
    "Aroma Candles": "aroma-candles",
    "Fresheners": "fresheners",
    "Bouquets": "bouquets",
    "Luxury Arrangements": "luxury-arrangements",
    };

    (async () => {
    try {
        console.log("🔄 Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected!");

        const flowers = await Flower.find();
        console.log(`📦 Found ${flowers.length} flowers.`);

        let updatedCount = 0;

        for (const flower of flowers) {
        const oldCategory = flower.category?.trim();
        const newCategory = categorySlugMap[oldCategory];

        if (newCategory && newCategory !== oldCategory) {
            flower.category = newCategory;
            await flower.save();
            console.log(`✅ Updated "${flower.name}" → ${newCategory}`);
            updatedCount++;
        } else {
            console.log(`⏭ Skipped "${flower.name}" (already normalized or unknown)`);
        }
        }

        console.log(`🎉 Migration complete! ✅ ${updatedCount} documents updated.`);
        process.exit(0);
    } catch (err) {
        console.error("❌ Migration failed:", err.message);
        process.exit(1);
    }
    })();
