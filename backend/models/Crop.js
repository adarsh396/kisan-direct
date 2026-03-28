const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    title: {
        type: String,
        required: [true, 'Crop title is required']
    },
    pricePerKg: {
        type: Number,
        required: [true, 'Please enter the price per Kg']
    },
    quantityAvailable: {
        type: Number,
        required: [true, 'Please enter total quantity available']
    },
    location: {
        type: String,
        required: [true, 'Please enter the pickup location']
    },
    imageUrl: {
        type: String,
        required: [true, 'Please upload an image']
    },
    description: {
        type: String,
        default: 'Freshly harvested produce from local farms.'
    },
    // Added defaults to prevent 'undefined' errors
    farmerName: { 
        type: String,
        default: 'Local Farmer'
    }, 
    farmerPhone: { 
        type: String,
        default: ''
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        // CRITICAL: If your frontend sends emojis, they must be here, 
        // OR update your frontend <option> values to be plain text.
        enum: ['Grains', 'Vegetables', 'Fruits', 'Pulses', 'Other'] 
    },
}, { timestamps: true });

module.exports = mongoose.model('Crop', cropSchema);