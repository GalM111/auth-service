// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();

app.use(express.json());
app.use(cors());

//MongoDB
mongoose
    .connect(process.env.DB_URI, {
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection failed:', err));

// Routes
app.use('/api', authRoutes);        // /api/register, /api/login
app.use('/api', protectedRoutes);   // /api/user, /api/admin

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
