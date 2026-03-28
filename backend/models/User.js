const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    role: {
        type: String,
        enum: ['farmer', 'buyer'],
        required: [true, 'Please specify your role']
    },
    location: {
        type: String,
        required: [true, 'Please add your city or village']
    },
    contactNumber: {
        type: String,
        required: [true, 'Please add a contact number']
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt dates
});

module.exports = mongoose.model('User', userSchema);