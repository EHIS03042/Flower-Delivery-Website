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
router.get('/', getFlowers);
router.get('/:id', getFlowerById);
router.post('/', upload.single('image'), createFlower);
router.patch('/:id', upload.single('image'), updateFlower); 
router.delete('/:id', deleteFlower);

module.exports = router;
