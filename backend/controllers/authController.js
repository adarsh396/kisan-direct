const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user (Farmer or Buyer)
// @route   POST /api/auth/register
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role, location, contactNumber } = req.body;

        // 1. Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 2. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create user in MongoDB
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            location,
            contactNumber // Saved to DB
        });

        if (user) {
            // 4. Send response BACK TO FRONTEND (Now including contactNumber)
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                location: user.location,
                contactNumber: user.contactNumber, // This ensures Dashboard has access to it
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Log this to your terminal so you can SEE if the phone exists in DB
            console.log("User found in DB:", user.name, "Phone:", user.contactNumber);

            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                location: user.location,
                contactNumber: user.contactNumber, // THE KEY LINE
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.location = req.body.location || user.location;
            user.contactNumber = req.body.contactNumber || user.contactNumber;

            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                location: updatedUser.location,
                contactNumber: updatedUser.contactNumber,
                token: generateToken(updatedUser._id),
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};