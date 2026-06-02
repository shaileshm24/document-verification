#!/usr/bin/env node
/**
 * Fix script for Node v24.13.0 compatibility
 * This script comments out native modules that can't compile with Node v24
 * 
 * Usage: node fix-node-v24.js
 */

const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, 'package.json');

console.log('🔧 Fixing Node v24 compatibility issues...\n');

// Read package.json
const content = fs.readFileSync(packageJsonPath, 'utf8');
const pkg = JSON.parse(content);

// Native modules that don't compile with Node v24.13.0
const problematicModules = [
  'sharp',        // Image processing with C++ bindings
  'sharp-phash',  // Perceptual hash with C++ bindings
  'tesseract.js'  // OCR with C++ bindings (optional)
];

let modified = false;

// Remove problematic modules
for (const module of problematicModules) {
  if (pkg.dependencies[module]) {
    console.log(`❌ Removing: ${module} (C++ native module incompatible with Node v24)`);
    delete pkg.dependencies[module];
    modified = true;
  }
}

if (modified) {
  // Write back to package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log('\n✅ package.json updated\n');
  console.log('📋 Next steps:\n');
  console.log('  1. cd backend');
  console.log('  2. rm -rf node_modules package-lock.json');
  console.log('  3. npm install');
  console.log('  4. npm run dev\n');
} else {
  console.log('✅ No native modules found. Your setup is compatible!\n');
  console.log('Run: npm install && npm run dev\n');
}

console.log('ℹ️  Note: To restore all features, use Node v20 (LTS):\n');
console.log('  nvm use 20');
console.log('  npm install');
console.log('  npm run dev\n');
