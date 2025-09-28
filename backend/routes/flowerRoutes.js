  // backend/routes/flowerRoutes.js
  const express = require("express");
  const router = express.Router();

  const {
    getFlowers,
    getFlowerById,
    createFlower,
    updateFlower,
    deleteFlower,
  } = require("../controller/flowerController"); // ✅ make sure "controllers" is plural

  const upload = require("../middleware/upload"); // ✅ directly import the multer instance

  // Routes
  router.get("/", getFlowers); // Get all flowers
  router.get("/:id", getFlowerById); // Get flower by ID
  router.post("/", upload.single("image"), createFlower); // Add new flower
  router.put("/:id", upload.single("image"), updateFlower); // Update flower
  router.delete("/:id", deleteFlower); // Delete flower

  module.exports = router;
