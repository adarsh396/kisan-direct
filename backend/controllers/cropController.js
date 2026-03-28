const Crop = require('../models/Crop');

// @desc    Get all crops (For the Marketplace feed)
// @route   GET /api/crops
const getCrops = async (req, res) => {
    try {
        const crops = await Crop.find().populate('farmerId', 'name location contactNumber');
        res.status(200).json(crops);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Create a new crop listing
// @route   POST /api/crops
const createCrop = async (req, res) => {
    try {
        const { 
            title, 
            pricePerKg, 
            quantityAvailable, 
            location, 
            imageUrl, 
            description,
            farmerName, 
            farmerPhone,
            category 
        } = req.body;

        // --- UPDATED VALIDATION ---
        // Added 'category' to the required check
        if (!title || !pricePerKg || !quantityAvailable || !location || !imageUrl || !category) {
            return res.status(400).json({ 
                message: 'Please provide all required fields, including category and image.' 
            });
        }

        const crop = await Crop.create({
            farmerId: req.user.id, 
            title,
            pricePerKg,
            quantityAvailable,
            location,
            imageUrl,
            description,
            farmerName, 
            farmerPhone,
            category 
        });

        res.status(201).json(crop);
    } catch (error) {
        // Log the exact error to your terminal so you can see if it's an 'enum' mismatch
        console.error("🔥 Create Crop Error:", error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete a crop listing
const deleteCrop = async (req, res) => {
    try {
        const crop = await Crop.findById(req.params.id);
        if (!crop) return res.status(404).json({ message: 'Crop not found' });

        if (crop.farmerId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await crop.deleteOne();
        res.status(200).json({ id: req.params.id, message: 'Crop deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getCrops, createCrop, deleteCrop };