const crypto = require('crypto');

const algorithm = 'aes-256-cbc';

if (!process.env.AES_SECRET) {
  throw new Error('AES_SECRET is not set in environment variables');
}
const key = crypto.scryptSync(process.env.AES_SECRET, 'salt', 32);  // 32 bytes for AES-256

function encrypt(text) {
  const iv = crypto.randomBytes(16); // New IV each time recommended
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: iv.toString('hex'), content: encrypted };
}

function decrypt(encrypted) {
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(encrypted.iv, 'hex'));
  let decrypted = decipher.update(encrypted.content, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = { encrypt, decrypt };