// middlewares/roleMiddleware.js
const roleMiddleware = (requiredRole) => (req, res, next) => {
    if (!req.user) {
        return res
            .status(401)
            .json({ message: 'Access denied. No user information.' });
    }

    if (req.user.role !== requiredRole) {
        return res.status(403).json({ message: 'Access forbidden' });
    }

    next();
};

module.exports = roleMiddleware;
