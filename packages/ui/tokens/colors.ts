export const colors = {
  // Liquid Glass - Ethereal Blue & Amethyst Palette
  primaryBackground: '#D9E8F5',    // Very Light Sky Blue - canvas for translucency
  secondaryBackground: '#F0F8FF',  // Alice Blue - frosted glass layers, cards
  primaryAccent: '#6699FF',        // Vibrant Cerulean Blue - interactive elements, highlights
  secondaryAccent: '#9966CC',      // Soft Amethyst Purple - complementary highlights, secondary CTAs
  textDark: '#3C4A5C',            // Deep Slate Blue - professional, readable on light glass
  textSubtle: '#8DA3B5',          // Cool Gray-Blue - secondary info, light borders
  pureWhite: '#FFFFFF',           // For glowing elements, light text on darker accents

  // Legacy aliases for backward compatibility
  background: '#D9E8F5',
  coreDark: '#3C4A5C',
  darkGray: '#3C4A5C',
  mediumGray: '#8DA3B5',
  lightGray: '#8DA3B5',
  accentPop: '#6699FF',
  white: '#FFFFFF',
  black: '#3C4A5C',

  // Glass effect variants
  glassBlur: 'rgba(240, 248, 255, 0.8)',      // F0F8FF with transparency
  glassFrost: 'rgba(217, 232, 245, 0.6)',     // D9E8F5 with transparency
  glassGlow: 'rgba(102, 153, 255, 0.3)',      // 6699FF with transparency
  glassAmethyst: 'rgba(153, 102, 204, 0.2)',  // 9966CC with transparency

  // State colors
  error: '#FF6B9D',           // Soft pink instead of red for glass aesthetic
  success: '#4ECDC4',         // Aqua teal
  warning: '#FFD93D',         // Bright yellow
  info: '#6699FF',            // Use primary accent
} as const;

export type ColorKeys = keyof typeof colors;