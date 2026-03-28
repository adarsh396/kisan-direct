const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- 1. UPDATED MIDDLEWARE ---
// This allows BOTH your local computer AND your Vercel link to talk to the backend
app.use(cors({
    origin: [
        'http://localhost:5173', 
        'https://kisan-direct.vercel.app' // 🟢 YOUR REAL VERCEL URL IS HERE NOW!
    ],
    credentials: true
}));

app.use(express.json()); 

// --- 2. DATABASE CONNECTION ---
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error.message);
        // Don't exit the process in production, just log it
        if (process.env.NODE_ENV !== 'production') process.exit(1);
    }
};
connectDB();

// --- 3. ROUTES ---
app.get('/', (req, res) => {
    res.send('🌾 Kisan-Direct API is running smoothly...');
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/crops', require('./routes/cropRoutes'));

// --- 4. GLOBAL ERROR HANDLER ---
// This prevents your server from crashing if there is a tiny bug
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// --- 5. PORT SETTINGS ---
// Process.env.PORT is required for Render.com to work!
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});