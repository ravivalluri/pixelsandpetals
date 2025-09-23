// Test script to check if @pixelsandpetals/ui can be resolved
try {
  const ui = require('@pixelsandpetals/ui');
  console.log('Successfully resolved @pixelsandpetals/ui');
  console.log('Available exports:', Object.keys(ui));
} catch (error) {
  console.error('Failed to resolve @pixelsandpetals/ui:', error.message);
}