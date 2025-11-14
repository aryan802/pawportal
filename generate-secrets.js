#!/usr/bin/env node

/**
 * Generate secure random secrets for JWT tokens
 * Run: node generate-secrets.js
 */

const crypto = require('crypto');

console.log('\n🔐 Generating secure secrets for JWT tokens...\n');
console.log('Copy these values to your backend environment variables:\n');
console.log('─'.repeat(60));

const jwtSecret = crypto.randomBytes(32).toString('hex');
const jwtRefreshSecret = crypto.randomBytes(32).toString('hex');

console.log(`JWT_SECRET=${jwtSecret}`);
console.log(`JWT_EXPIRES_IN=7d`);
console.log(`JWT_REFRESH_SECRET=${jwtRefreshSecret}`);
console.log(`JWT_REFRESH_EXPIRES_IN=30d`);

console.log('\n─'.repeat(60));
console.log('\n✅ Secrets generated! Copy these to your deployment platform.\n');
console.log('⚠️  Keep these secrets secure and never commit them to git!\n');

