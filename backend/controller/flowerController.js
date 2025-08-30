    // // flowerController.js
    //     const Flower = require('../models/flowerModel');

    // // GET all flowers
    // const getFlowers = async (req, res) => {
    // try {
    //     const flowers = await Flower.find();
    //     res.json(flowers);
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
    // };

    // // GET flower by ID
    // const getFlowerById = async (req, res) => {
    // try {
    //     const flower = await Flower.findById(req.params.id);
    //     if (!flower) return res.status(404).json({ error: 'Flower not found' });
    //     res.json(flower);
    // } catch (err) {
    //     res.status(500).json({ error: err.message || 'Server error' });
    // }
    // };

    // // ADD a flower with image
    // const createFlower = async (req, res) => {
    // try {
        
    //     const { name, description, price, category } = req.body;
    //     const image = req.file ? req.file.filename : null; //  store only filename

    //     const newFlower = new Flower({
    //     name,
    //     description,
    //     price,
    //     category,
    //     image
    //     });

    //     const savedFlower = await newFlower.save();
    //     res.status(201).json(savedFlower);
    // } catch (error) {
    //     res.status(400).json({ error: error.message });
    // }
    // };

    // // UPDATE a flower by ID
    // const updateFlower = async (req, res) => {
    // try {
    //     const { id } = req.params;
    //     const updates = req.body;

    //     if (req.file) {
    //     updateData.image = req.file.filename; //  store only filename

    //     }

    //     const updated = await Flower.findByIdAndUpdate(id, updates, {
    //     new: true,
    //     runValidators: true,
    //     });

    //     if (!updated) return res.status(404).json({ error: 'Flower not found' });
    //     res.json(updated);
    // } catch (err) {
    //     res.status(500).json({ error: err.message || 'Failed to update flower' });
    // }
    // };

    // // DELETE a flower
    // const deleteFlower = async (req, res) => {
    // try {
    //     const deleted = await Flower.findByIdAndDelete(req.params.id);
    //     if (!deleted) return res.status(404).json({ error: 'Flower not found' });
    //     res.json({ message: 'Flower deleted' });
    // } catch (err) {
    //     res.status(500).json({ error: err.message || 'Server error' });
    // }
    // };

    // module.exports = {
    // getFlowers,
    // getFlowerById,
    // createFlower,
    // updateFlower,
    // deleteFlower,
    // };

    // Re-Code 1
    // controller/flowerController.js
    // const Flower = require("../models/flowerModel");

    // // @desc    Get all flowers
    // // @route   GET /api/flowers
    // const getFlowers = async (req, res) => {
    // try {
    //     const flowers = await Flower.find();
    //     res.json(flowers);
    // } catch (err) {
    //     console.error("Error fetching flowers:", err);
    //     res.status(500).json({ message: "Server error while fetching flowers" });
    // }
    // };

    // // @desc    Get flower by ID
    // // @route   GET /api/flowers/:id
    // const getFlowerById = async (req, res) => {
    // try {
    //     const flower = await Flower.findById(req.params.id);
    //     if (!flower) return res.status(404).json({ message: "Flower not found" });
    //     res.json(flower);
    // } catch (err) {
    //     console.error("Error fetching flower:", err);
    //     res.status(500).json({ message: "Server error while fetching flower" });
    // }
    // };

    // // @desc    Create a new flower
    // // @route   POST /api/flowers
    // const createFlower = async (req, res) => {
    // try {
    //     const { name, description, price, category } = req.body;

    //     // Use req.file?.path from Cloudinary
    // const image = req.file ? req.file.path : null;

    //     if (!name || !description || !price || !category || !image) {
    //     return res.status(400).json({ message: "All fields are required" });
    //     }

    //     const newFlower = new Flower({
    //     name,
    //     description,
    //     price,
    //     category,
    //     image, // Cloudinary URL
    //     });

    //     const savedFlower = await newFlower.save();
    //     res.status(201).json(savedFlower);
    // } catch (err) {
    //     console.error("Error creating flower:", err);
    //     res.status(500).json({ message: "Server error while creating flower" });
    // }
    // };

    // // @desc    Update an existing flower
    // // @route   PUT /api/flowers/:id
    // const updateFlower = async (req, res) => {
    // try {
    //     const { name, description, price, category, image } = req.body;

    //     const updatedFlower = await Flower.findByIdAndUpdate(
    //     req.params.id,
    //     { name, description, price, category, image },
    //     { new: true, runValidators: true }
    //     );

    //     if (!updatedFlower) {
    //     return res.status(404).json({ message: "Flower not found" });
    //     }

    //     res.json(updatedFlower);
    // } catch (err) {
    //     console.error("Error updating flower:", err);
    //     res.status(500).json({ message: "Server error while updating flower" });
    // }
    // };

    // // @desc    Delete flower
    // // @route   DELETE /api/flowers/:id
    // const deleteFlower = async (req, res) => {
    // try {
    //     const flower = await Flower.findByIdAndDelete(req.params.id);
    //     if (!flower) return res.status(404).json({ message: "Flower not found" });
    //     res.json({ message: "Flower deleted successfully" });
    // } catch (err) {
    //     console.error("Error deleting flower:", err);
    //     res.status(500).json({ message: "Server error while deleting flower" });
    // }
    // };

    // module.exports = {
    // getFlowers,
    // getFlowerById,
    // createFlower,   // POST
    // updateFlower,   // PUT
    // deleteFlower,
    // };

//     // Re-Code 2
//     const Flower = require("../models/flowerModel");

// // @desc   Create new flower
// // @route  POST /api/flowers
// // @access Public (you can lock this down later)
//     const createFlower = async (req, res) => {
//     try {
//         const { name, description, price, category } = req.body;

//         // multer-storage-cloudinary attaches the uploaded Cloudinary URL to req.file.path
//         // const imageUrl = req.file ? req.file.filename : null;

//         const imageUrl = `/uploads/${req.file.filename}`;

//         const flower = new Flower({
//         name,
//         description,
//         price,
//         category,
//         image: imageUrl,
//         });

//         const savedFlower = await flower.save();
//         res.status(201).json(savedFlower);
//     } catch (error) {
//         console.error("Error creating flower:", error);
//         res.status(500).json({ message: "Server error" });
//     }
//     };

//     // @desc   Update a flower
//     // @route  PUT /api/flowers/:id
//     // @access Public (or restrict later)
//     const updateFlower = async (req, res) => {
//     try {
//         const { name, description, price, category } = req.body;

//         let updateData = {
//         name,
//         description,
//         price,
//         category,
//         };

//         // If a new image was uploaded, add it to update
//         if (req.file) {
//         updateData.image = req.file.filename;
//         }

//         const updatedFlower = await Flower.findByIdAndUpdate(
//         req.params.id,
//         updateData,
//         { new: true }
//         );

//         if (!updatedFlower) {
//         return res.status(404).json({ message: "Flower not found" });
//         }

//         res.json(updatedFlower);
//     } catch (error) {
//         console.error("Error updating flower:", error);
//         res.status(500).json({ message: "Server error" });
//     }
//     };

//     // @desc   Get all flowers
//     // @route  GET /api/flowers
//     const getFlowers = async (req, res) => {
//     try {
//         const flowers = await Flower.find();
//         res.json(flowers);
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
//     };

//     // @desc   Get flower by ID
//     // @route  GET /api/flowers/:id
//     const getFlowerById = async (req, res) => {
//     try {
//         const flower = await Flower.findById(req.params.id);
//         if (!flower) return res.status(404).json({ message: "Flower not found" });
//         res.json(flower);
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
//     };

//     // @desc   Delete flower
//     // @route  DELETE /api/flowers/:id
//     const deleteFlower = async (req, res) => {
//     try {
//         const deleted = await Flower.findByIdAndDelete(req.params.id);
//         if (!deleted) return res.status(404).json({ message: "Flower not found" });
//         res.json({ message: "Flower deleted" });
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
//     };

//     module.exports = {
//     createFlower,
//     updateFlower,
//     getFlowers,
//     getFlowerById,
//     deleteFlower,
// };

// // Recode 3 Updated
// // backend/controller/flowerController.js
// // --------------------------------------
// // Controller tolerant to BOTH:
// //  - req.body.image: a Cloudinary absolute URL (preferred)
// //  - req.file.path:  set by multer-storage-cloudinary (absolute Cloudinary URL)
// //  - req.file.filename: disk fallback -> saved as /uploads/<filename>

// const Flower = require("../models/flowerModel");

// // Normalize/choose the image URL consistently
//     function resolveImageUrl(req) {
//     // 1) Client provided explicit URL (e.g., Cloudinary secure_url)
//     if (req.body && req.body.image && typeof req.body.image === "string") {
//         return req.body.image.trim();
//     }

//     // 2) Multer + Cloudinary storage: multer sets req.file.path to absolute URL
//     if (req.file && req.file.path) {
//         return req.file.path;
//     }

//     // 3) Disk fallback (only if using disk storage): map to /uploads/<filename>
//     if (req.file && req.file.filename) {
//         return `/uploads/${req.file.filename}`;
//     }

//     // 4) Nothing provided
//     return null;
//     }

//     // @desc   Create new flower
//     // @route  POST /api/flowers
//     // @access Public/Admin (depending on your auth)
//     const createFlower = async (req, res) => {
//     try {
//         const { name, description, price, category } = req.body;

//         if (!name || !description || !price || !category) {
//         return res.status(400).json({ message: "Missing required fields" });
//         }

//         const imageUrl = resolveImageUrl(req);

//         const flower = new Flower({
//         name,
//         description,
//         price,
//         category,
//         image: imageUrl,
//         });

//         await flower.save();
//         res.status(201).json(flower);
//     } catch (err) {
//         console.error("createFlower error:", err);
//         res.status(500).json({ message: "Server error while creating flower" });
//     }
//     };

//     // @desc   Get all flowers
//     // @route  GET /api/flowers
//     const getFlowers = async (_req, res) => {
//     try {
//         const flowers = await Flower.find().sort({ createdAt: -1 });
//         res.json(flowers);
//     } catch (err) {
//         console.error("getFlowers error:", err);
//         res.status(500).json({ message: "Server error while fetching flowers" });
//     }
//     };

//     // @desc   Get single flower
//     // @route  GET /api/flowers/:id
//     const getFlowerById = async (req, res) => {
//     try {
//         const flower = await Flower.findById(req.params.id);
//         if (!flower) return res.status(404).json({ message: "Flower not found" });
//         res.json(flower);
//     } catch (err) {
//         console.error("getFlowerById error:", err);
//         res.status(500).json({ message: "Server error while fetching flower" });
//     }
//     };

//     // @desc   Update flower
//     // @route  PATCH /api/flowers/:id
//     const updateFlower = async (req, res) => {
//     try {
//         const { name, description, price, category } = req.body;

//         // If a new image (URL or file) is provided, replace; else keep current
//         const incomingImage = resolveImageUrl(req);

//         const update = {
//         ...(name !== undefined && { name }),
//         ...(description !== undefined && { description }),
//         ...(price !== undefined && { price }),
//         ...(category !== undefined && { category }),
//         };
//         if (incomingImage !== null) update.image = incomingImage;

//         const updated = await Flower.findByIdAndUpdate(req.params.id, update, {
//         new: true,
//         });
//         if (!updated) return res.status(404).json({ message: "Flower not found" });

//         res.json(updated);
//     } catch (err) {
//         console.error("updateFlower error:", err);
//         res.status(500).json({ message: "Server error while updating flower" });
//     }
//     };

//     // @desc   Delete flower
//     // @route  DELETE /api/flowers/:id
//     const deleteFlower = async (req, res) => {
//     try {
//         const deleted = await Flower.findByIdAndDelete(req.params.id);
//         if (!deleted) return res.status(404).json({ message: "Flower not found" });
//         res.json({ message: "Flower deleted" });
//     } catch (err) {
//         console.error("deleteFlower error:", err);
//         res.status(500).json({ message: "Server error while deleting flower" });
//     }
//     };

//     module.exports = {
//     createFlower,
//     getFlowers,
//     getFlowerById,
//     updateFlower,
//     deleteFlower,
//     };

// Re-Code 4
    const Flower = require("../models/flowerModel");

    //  Get all flowers
    const getFlowers = async (req, res) => {
    try {
        const flowers = await Flower.find();
        res.json(flowers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

    //  Get a single flower by ID
    const getFlowerById = async (req, res) => {
    try {
        const flower = await Flower.findById(req.params.id);
        if (!flower) return res.status(404).json({ error: "Flower not found" });
        res.json(flower);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

    //  Create a flower (with image upload)
    const createFlower = async (req, res) => {
    try {
        // Always store the full relative path so frontend can access it
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const flower = new Flower({ ...req.body, image });
        await flower.save();

        res.status(201).json(flower);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    };

    //  Update a flower
    const updateFlower = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        if (req.file) {
        // Always store full path here too
        updateData.image = `/uploads/${req.file.filename}`;
        }

        const flower = await Flower.findByIdAndUpdate(id, updateData, { new: true });
        if (!flower) return res.status(404).json({ error: "Flower not found" });

        res.json(flower);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    };

    //  Delete a flower
    const deleteFlower = async (req, res) => {
    try {
        const { id } = req.params;
        const flower = await Flower.findByIdAndDelete(id);
        if (!flower) return res.status(404).json({ error: "Flower not found" });

        res.json({ message: "Flower deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

    module.exports = {
    getFlowers,
    getFlowerById,
    createFlower,
    updateFlower,
    deleteFlower,
    };
