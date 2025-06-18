const jwt = require('jsonwebtoken');

function generateToken(username, role) {
    return jwt.sign({ username, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

function verifyJWT(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).send('Token missing');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        req.user = decoded; // store user info
        next();
    });
}

module.exports = { generateToken, verifyToken, verifyJWT };