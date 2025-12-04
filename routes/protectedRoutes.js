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

// GET /api/admin (only admin role)
router.get(
    '/admin',
    [authMiddleware, roleMiddleware('admin')],
    (req, res) => {
        res
            .status(200)
            .json({
                message: 'Welcome to the admin dashboard',
                user: req.user,
            });
    }
);

module.exports = router;
