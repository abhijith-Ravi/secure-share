const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { generateToken } = require('../services/jwt');

router.post('/login', (req, res) => {
    const { username, role = 'user' } = req.body; // Default role is 'user'
    const token = generateToken(username, role); // <-- Pass as two arguments!
    return res.json({ token });
});

module.exports = router;