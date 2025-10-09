const mongoose = require('mongoose');

const flowerSchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: true,
        trim: true,
        },
        description: {
        type: String,
        required: true,
        },
        price: {
        type: Number,
        required: true,
        min: 0,
        },
        category: {
        type: String,
        required: true,
        },
        image: { 
        type: String },
    },
    {
        timestamps: true,
    }
);

// Create and export the model
const Flower = mongoose.model('Flower', flowerSchema);
module.exports = Flower;
