const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../services/jwt');
const { requireRole } = require('../services/rbac');
const { getLogs } = require('../services/logger');

// Protect this route: must be authenticated AND have admin role
router.get('/stats', verifyJWT, requireRole('admin'), (req, res) => {
  res.json({ message: 'Admin stats: confidential data here.' });
});

router.get('/logs', verifyJWT, requireRole('admin'), (req, res) => {
  res.json(getLogs());
});

module.exports = router;