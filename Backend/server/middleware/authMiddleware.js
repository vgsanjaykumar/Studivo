const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authentication');
    if (!authHeader || !authHeader.startsWith('Bearer'))
        return res.status(401).json({message: 'Access denied, No token will provided'});

    const token = authHeader.split('')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error("JWT Verification Error", err);
            return res.status(403).json({message: 'Invalid Token', err});
        }
        req.user = user;
        next();
    })
}

const authorizeRole = (role) => (req, res, next) => {
    if (req.user.role !== role)
        return res.status(403).json({message: 'Unauthorized Access'});
    next();
}

module.exports = { authenticateJWT, authorizeRole };