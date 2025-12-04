// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');


const User = require('../models/user');

const router = express.Router();

// POST /api/register
router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Enter a valid email'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const { username, email, password } = req.body;

        try {
            // Check if email already exists (optional but useful)
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res
                    .status(400)
                    .json({ message: 'User with this email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, email, password: hashedPassword });

            await user.save();

            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            res
                .status(500)
                .json({ message: 'Error registering user', error: err.message });
        }
    }
);

// POST /api/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: 'Invalid credentials' });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'your_secret_key',
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, message: 'Logged in successfully' });
    } catch (err) {
        res
            .status(500)
            .json({ message: 'Error logging in', error: err.message });
    }
});

module.exports = router;
