const jwt = require('jsonwebtoken');

const secretKey = 'captain';

const adminToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(400).json({ message: "No token provided" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: "Failed to verify token" });
        }

        req.admin = decoded;
        next();
    });
};

module.exports = adminToken;
