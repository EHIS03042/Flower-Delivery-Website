// const multer = require('multer');
// const path = require('path');

// // Storage setup
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // folder to store images
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname); // unique name
//     }
//     });

//     // File filter for image types
//     const fileFilter = (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);

//     if (extname && mimetype) {
//         cb(null, true);
//     } else {
//         cb('Error: Images Only!');
//     }
//     };

// const upload = multer({ storage, fileFilter });

// module.exports = upload;

// middleware/upload.js

// 2nd Commented Code
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("cloudinary").v2;

//     cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//     });

//     const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: "flowers", // folder in your Cloudinary account
//         allowed_formats: ["jpg", "jpeg", "png"],
//     },
//     });

//     const upload = multer({ storage });

// module.exports = upload;

// Current upload.js
// backend/middleware/upload.js
// ---------------------------
// Multer middleware that stores directly to Cloudinary.
// If no file is sent, req.file will be undefined (and that's OK).
//
// Required .env:
//   CLOUDINARY_CLOUD_NAME=xxx
//   CLOUDINARY_API_KEY=xxx
//   CLOUDINARY_API_SECRET=xxx

// 3rd Commented Code
// const multer = require("multer");
// const { v2: cloudinary } = require("cloudinary");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,   // e.g. duq0nbvxs
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//     });

//     const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: "flowers",                // Cloudinary folder
//         allowed_formats: ["jpg", "jpeg", "png", "webp"],
//         // public_id is optional; Cloudinary will generate a unique one
//     },
//     });

// const upload = multer({ storage });

// module.exports = upload;


// Re-Code upload.js
const multer = require("multer");

// Store files in memory, so we can push the buffer to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
