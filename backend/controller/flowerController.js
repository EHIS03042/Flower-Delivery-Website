    const Flower = require('../models/flowerModel');
    const path = require('path');

    // GET all flowers.
    const getFlowers = async (req, res) => {
    try {
        const flowers = await Flower.find();
        res.json(flowers);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
    };

    // GET flower by ID.
    const getFlowerById = async (req, res) => {
    try {
        const flower = await Flower.findById(req.params.id);
        if (!flower) return res.status(404).json({ error: 'Flower not found' });
        res.json(flower);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
    };

    // POST a new flower with image.
    const createFlower = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const image = req.file ? req.file.filename : null;
        const flower = new Flower({
        name,
        description,
        price,
        category,
        image
        });

        const savedFlower = await flower.save();
        res.status(201).json(savedFlower);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create flower' });
    }
    };

    // PATCH (update) a flower by ID.
    const updateFlower = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // If updating the image
        if (req.file) {
        updates.image = req.file.filename;
        }

        const updated = await Flower.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
        });

        if (!updated) return res.status(404).json({ error: 'Flower not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update flower' });
    }
    };

    // DELETE a flower.
    const deleteFlower = async (req, res) => {
    try {
        const deleted = await Flower.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Flower not found' });
        res.json({ message: 'Flower deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
    };

    module.exports = {
    getFlowers,
    getFlowerById,
    createFlower,
    updateFlower, 
    deleteFlower,
    };
