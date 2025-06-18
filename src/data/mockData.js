const { encrypt } = require('../services/aes');

const rawAccounts = {
  user1: {
    accountNumber: '1234567890',
    balance: 54200.75,
    transactions: [
      { id: 1, amount: -200.0, desc: 'ATM Withdrawal' },
      { id: 2, amount: 500.0, desc: 'Salary' }
    ],
    userConsent: true
  },
  admin1: {
    accountNumber: '9876543210',
    balance: 100000.00,
    transactions: [
      { id: 1, amount: -1000.0, desc: 'Office Supplies' },
      { id: 2, amount: 20000.0, desc: 'Bonus' }
    ],
    userConsent: true
  }
};

// Encrypt once at startup
const encryptedAccounts = {};
for (const [username, data] of Object.entries(rawAccounts)) {
  encryptedAccounts[username] = encrypt(JSON.stringify(data));
}

function getEncryptedAccount(username) {
  return encryptedAccounts[username];
}

module.exports = { getEncryptedAccount };