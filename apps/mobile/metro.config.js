const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Configure for monorepo
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

config.watchFolders = [monorepoRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Only target native platforms (iOS and Android) - web is handled by Next.js
config.resolver.platforms = ['native', 'ios', 'android'];

module.exports = config;