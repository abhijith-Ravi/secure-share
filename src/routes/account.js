const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../services/jwt');
const { decrypt } = require('../services/aes');
const { getEncryptedAccount } = require('../data/mockData');
const { logRequest } = require('../services/logger');
const { checkAnomaly } = require('../services/anomaly');

// Protected route to get account data
router.get('/data', verifyJWT, checkAnomaly, (req, res) => {
  const username = req.user.username;
  const role = req.user.role;
  const encrypted = getEncryptedAccount(username);

  if (!encrypted) return res.status(404).json({ error: 'Account not found' });

  const decrypted = JSON.parse(decrypt(encrypted));

  // Consent check
  if (!decrypted.userConsent) {
    logRequest(username, '/account/data', 'consent-denied');
    return res.status(403).json({ error: 'Consent required' });
  }

  // Role-based filtering
  let response;
  if (role === 'admin') {
    response = decrypted; // full data
  } else if (role === 'user') {
    const { accountNumber, ...rest } = decrypted;
    response = rest; // hide account number
  } else {
    return res.status(403).json({ error: 'Forbidden' });
  }

  logRequest(username, '/account/data', role === 'admin' ? 'full' : 'partial');
  res.json(response);
});

module.exports = router;