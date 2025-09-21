    // backend/controllers/flowerController.js
    const Flower = require("../models/flowerModel");
    const cloudinary = require("cloudinary").v2;

    // ✅ Create new flower
    const createFlower = async (req, res) => {
    try {
        let imageUrl = null;

        if (req.file) {
        // If CloudinaryStorage worked, req.file.path is already a Cloudinary URL
        if (req.file.path && req.file.path.startsWith("http")) {
            imageUrl = req.file.path;
        } else {
            // If it's still a filename/local path, force upload manually
            const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "flowers",
            transformation: [
                { width: 600, height: 600, crop: "fill" },
                { quality: "auto" },
                { fetch_format: "auto" },
            ],
            });
            imageUrl = result.secure_url;
        }
        }

        const flower = new Flower({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: imageUrl,
        });

        await flower.save();
        res.status(201).json(flower);
    } catch (err) {
        console.error("Error creating flower:", err);
        res.status(500).json({ error: "Failed to create flower" });
    }
    };

    // ✅ Get all flowers
    const getFlowers = async (req, res) => {
    try {
        const flowers = await Flower.find();
        res.json(flowers);
    } catch (err) {
        console.error("Error fetching flowers:", err);
        res.status(500).json({ error: "Failed to fetch flowers" });
    }
    };

    // ✅ Get single flower by ID
    const getFlowerById = async (req, res) => {
    try {
        const flower = await Flower.findById(req.params.id);
        if (!flower) return res.status(404).json({ error: "Flower not found" });
        res.json(flower);
    } catch (err) {
        console.error("Error fetching flower:", err);
        res.status(500).json({ error: "Failed to fetch flower" });
    }
    };

    // ✅ Update flower
    const updateFlower = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        const flower = await Flower.findById(req.params.id);
        if (!flower) return res.status(404).json({ error: "Flower not found" });

        if (name) flower.name = name;
        if (description) flower.description = description;
        if (price) flower.price = price;
        if (category) flower.category = category;

        if (req.file) {
        if (req.file.path && req.file.path.startsWith("http")) {
            flower.image = req.file.path;
        } else {
            const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "flowers",
            transformation: [
                { width: 600, height: 600, crop: "fill" },
                { quality: "auto" },
                { fetch_format: "auto" },
            ],
            });
            flower.image = result.secure_url;
        }
        }

        await flower.save();
        res.json(flower);
    } catch (err) {
        console.error("Error updating flower:", err);
        res.status(500).json({ error: "Failed to update flower" });
    }
    };

    // ✅ Delete flower
    const deleteFlower = async (req, res) => {
    try {
        const flower = await Flower.findByIdAndDelete(req.params.id);
        if (!flower) return res.status(404).json({ error: "Flower not found" });
        res.json({ message: "Flower deleted successfully" });
    } catch (err) {
        console.error("Error deleting flower:", err);
        res.status(500).json({ error: "Failed to delete flower" });
    }
    };

    module.exports = {
    createFlower,
    getFlowers,
    getFlowerById,
    updateFlower,
    deleteFlower,
    };
