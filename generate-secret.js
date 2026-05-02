// Run this file to generate a BETTER_AUTH_SECRET
// Usage: node generate-secret.js

const crypto = require('crypto');

console.log('\n🔐 BETTER_AUTH_SECRET Generator\n');
console.log('Copy this secret and paste it in your .env.local file:\n');
console.log('─'.repeat(70));
console.log(crypto.randomBytes(32).toString('hex'));
console.log('─'.repeat(70));
console.log('\nThis secret is 64 characters long (32 bytes in hex).\n');
