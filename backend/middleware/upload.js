const multer = require('multer');
const path = require('path');

// Storage setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // folder to store images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // unique name
    }
    });

    // File filter for image types
    const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
    };

const upload = multer({ storage, fileFilter });

module.exports = upload;
