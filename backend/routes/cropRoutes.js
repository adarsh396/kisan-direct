const express = require('express');
const router = express.Router();
const { getCrops, createCrop, deleteCrop } = require('../controllers/cropController');
const { protect } = require('../middleware/authMiddleware');

// Route for getting all crops (public) and creating a crop (protected)
router.route('/').get(getCrops).post(protect, createCrop);

// Route for deleting a specific crop (protected)
router.route('/:id').delete(protect, deleteCrop);
// Add this to your existing cropRoutes.js
router.delete('/:id', protect, async (req, res) => {
    try {
        const crop = await Crop.findById(req.params.id);

        if (!crop) {
            return res.status(404).json({ message: 'Crop not found' });
        }

        // Security: Check if the person deleting is the owner
        if (crop.farmerId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized to delete this' });
        }

        await crop.deleteOne();
        res.json({ message: 'Crop removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;