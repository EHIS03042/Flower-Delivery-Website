    // flowerController.js
        const Flower = require('../models/flowerModel');

    // GET all flowers
    const getFlowers = async (req, res) => {
    try {
        const flowers = await Flower.find();
        res.json(flowers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

    // GET flower by ID
    const getFlowerById = async (req, res) => {
    try {
        const flower = await Flower.findById(req.params.id);
        if (!flower) return res.status(404).json({ error: 'Flower not found' });
        res.json(flower);
    } catch (err) {
        res.status(500).json({ error: err.message || 'Server error' });
    }
    };

    // ADD a flower with image
    const createFlower = async (req, res) => {
    try {
        
        const { name, description, price, category } = req.body;
        const image = req.file ? req.file.filename : null; //  store only filename

        const newFlower = new Flower({
        name,
        description,
        price,
        category,
        image
        });

        const savedFlower = await newFlower.save();
        res.status(201).json(savedFlower);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    };

    // UPDATE a flower by ID
    const updateFlower = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (req.file) {
        updateData.image = req.file.filename; //  store only filename

        }

        const updated = await Flower.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
        });

        if (!updated) return res.status(404).json({ error: 'Flower not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to update flower' });
    }
    };

    // DELETE a flower
    const deleteFlower = async (req, res) => {
    try {
        const deleted = await Flower.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Flower not found' });
        res.json({ message: 'Flower deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message || 'Server error' });
    }
    };

    module.exports = {
    getFlowers,
    getFlowerById,
    createFlower,
    updateFlower,
    deleteFlower,
    };
