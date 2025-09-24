import React from 'react';
import Svg, { Defs, LinearGradient, Stop, G, Path, Rect, Text, TSpan } from 'react-native-svg';

interface PixelsPetalsLogoProps {
  width?: number;
  height?: number;
  theme?: 'light' | 'dark';
}

export const PixelsPetalsLogo: React.FC<PixelsPetalsLogoProps> = ({
  width = 190,
  height = 50,
  theme = 'light'
}) => {
  // Define colors based on theme
  const wordmarkColor = theme === 'dark' ? '#FFFFFF' : '#1A1F24';
  const taglineColor = theme === 'dark' ? '#E2E8F0' : '#2A323C';

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 760 200"
      role="img"
    >
      <Defs>
        <LinearGradient id="gradIcon" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="#7C5CFF" />
          <Stop offset="50%" stopColor="#6EE7B7" />
          <Stop offset="100%" stopColor="#FF7A90" />
        </LinearGradient>
      </Defs>

      {/* Icon: stylized petal + pixel cluster */}
      <G transform="translate(30,20)">
        <Path
          d="M60 4 C94 12 120 40 120 76 C120 112 86 132 60 132 C34 132 4 112 4 76 C4 40 26 12 60 4 Z"
          fill="url(#gradIcon)"
          opacity="0.98"
        />
        <Path
          d="M48 18 C70 10 98 24 100 46 C102 68 80 84 60 92 C40 100 30 86 32 64 C34 42 38 28 48 18 Z"
          fill="rgba(255,255,255,0.12)"
        />
        <G transform="translate(78,70)">
          <Rect x="0" y="0" width="12" height="12" fill={wordmarkColor} opacity="0.2" rx="2" />
          <Rect x="-16" y="0" width="12" height="12" fill={wordmarkColor} opacity="0.2" rx="2" />
          <Rect x="0" y="-16" width="12" height="12" fill={wordmarkColor} opacity="0.2" rx="2" />
        </G>
      </G>

      {/* Wordmark */}
      <G transform="translate(180,90)">
        <Text
          x="0"
          y="0"
          fill={wordmarkColor}
          fontSize="46"
          fontWeight="700"
          fontFamily="Inter, system-ui, -apple-system, sans-serif"
          letterSpacing="-0.5"
        >
          Pixels &amp; Petals
        </Text>
        <Text
          x="0"
          y="42"
          fill={taglineColor}
          fontSize="22"
          fontWeight="500"
          fontFamily="Inter, system-ui, -apple-system, sans-serif"
        >
          Design • Development • Cloud
        </Text>
      </G>
    </Svg>
  );
};