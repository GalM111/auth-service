// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Expect header: "Authorization: Bearer <token>"
    const authHeader = req.header('Authorization');
    if (!authHeader)
        return res
            .status(401)
            .json({ message: 'Access denied. No token provided.' });

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res
            .status(401)
            .json({ message: 'Access denied. Invalid token format.' });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'your_secret_key'
        );
        req.user = decoded; // { id, role, iat, exp }
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
