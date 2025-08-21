// flowerRoutes.js
const express = require('express');
const router = express.Router();
const {
  getFlowers,
  getFlowerById,
  createFlower,
  updateFlower,
  deleteFlower
} = require('../controller/flowerController');
const upload = require('../middleware/upload');

// Routes
router.get('/', getFlowers); // Get all flowers
router.get('/:id', getFlowerById); // Get flower by ID
router.post('/', upload.single('image'), createFlower); // Add new flower
router.patch('/:id', upload.single('image'), updateFlower); // Update flower
// Alternative: router.put('/:id', upload.single('image'), updateFlower);
router.delete('/:id', deleteFlower); // Delete flower

module.exports = router;