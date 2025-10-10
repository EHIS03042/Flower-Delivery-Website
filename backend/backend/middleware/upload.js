    // backend/middleware/upload.js
    const cloudinary = require("cloudinary").v2;
    const multer = require("multer");
    const { CloudinaryStorage } = require("multer-storage-cloudinary");

    cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Storage engine for Multer + Cloudinary
    const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "flowers", // folder in Cloudinary
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
        transformation: [
        { width: 600, height: 600, crop: "fill" }, // resize
        { quality: "auto" },                       // auto compression
        { fetch_format: "auto" },                  // serve WebP/AVIF when possible
        ],
    },
    });

    // Multer instance
    const upload = multer({ storage });

    // ✅ Export only the Multer instance
    module.exports = upload;
