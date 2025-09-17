const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // 1. Get the token from the Authorization header
    const authHeader = req.header('Authorization');

    // 2. Check if the header exists and has the correct format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No valid Bearer token, authorization denied' });
    }

    // 3. Extract the token string, removing the "Bearer " prefix
    const token = authHeader.split(' ')[1];

    // Now, the rest of your code is the same
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};