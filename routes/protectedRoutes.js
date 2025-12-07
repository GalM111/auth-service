// routes/protectedRoutes.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// GET /api/user (any logged-in user)
router.get('/user', authMiddleware, (req, res) => {
    res
        .status(200)
        .json({
            message: 'Welcome to the user dashboard',
            user: req.user,
        });
});

module.exports = router;
