// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();

// Middleware to parse JSON
app.use(express.json());
// Enable CORS for development (adjust origin in production)
app.use(cors());

// Connect to MongoDB
mongoose
    .connect('mongodb://localhost:27017/authDB', {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection failed:', err));

// Routes
app.use('/api', authRoutes);        // /api/register, /api/login
app.use('/api', protectedRoutes);   // /api/user, /api/admin

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
