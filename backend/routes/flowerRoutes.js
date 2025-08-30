// // flowerRoutes.js
// const express = require('express');
// const router = express.Router();
// const {
//   getFlowers,
//   getFlowerById,
//   createFlower,
//   updateFlower,
//   deleteFlower
// } = require('../controller/flowerController');
// const upload = require('../middleware/upload');

// // Routes
// router.get('/', getFlowers); // Get all flowers
// router.get('/:id', getFlowerById); // Get flower by ID
// router.post('/', upload.single('image'), createFlower); // Add new flower
// router.patch('/:id', upload.single('image'), updateFlower); // Update flower
// // Alternative: router.put('/:id', upload.single('image'), updateFlower);
// router.delete('/:id', deleteFlower); // Delete flower

// module.exports = router;

// Re-Code 1
// backend/routes/flowerRoutes.js
// ------------------------------
// Keep upload.single('image') so multipart works,
// but JSON-only (image as URL) also works because controller is tolerant.

const express = require("express");
const router = express.Router();

const {
  getFlowers,
  getFlowerById,
  createFlower,
  updateFlower,
  deleteFlower,
} = require("../controller/flowerController");

const upload = require("../middleware/upload");

router.get("/", getFlowers);
router.get("/:id", getFlowerById);
router.post("/", createFlower);
router.patch("/:id", updateFlower);
router.delete("/:id", deleteFlower);

module.exports = router;

// Re-Code 2
