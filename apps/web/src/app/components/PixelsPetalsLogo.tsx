"use client";
import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';

interface PixelsPetalsLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const PixelsPetalsLogo: React.FC<PixelsPetalsLogoProps> = ({
  width = 380,
  height = 100,
  className = ""
}) => {
  const { theme } = useTheme();

  // Define colors based on theme
  const wordmarkColor = theme === 'dark' ? '#FFFFFF' : '#1A1F24';
  const taglineColor = theme === 'dark' ? '#E2E8F0' : '#2A323C';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 760 200"
      role="img"
      aria-labelledby="title desc"
      className={className}
    >
      <title id="title">Pixels &amp; Petals — updated logo</title>
      <desc id="desc">Logo with theme-adaptive text for visibility and larger tagline.</desc>

      <defs>
        <linearGradient id="gradIcon" x1="0" x2="1">
          <stop offset="0%" stopColor="#7C5CFF"/>
          <stop offset="50%" stopColor="#6EE7B7"/>
          <stop offset="100%" stopColor="#FF7A90"/>
        </linearGradient>

        <style>{`
          .wordmark-bold {
            font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
            font-weight: 700;
            font-size: 46px;
            letter-spacing: -0.01em;
            fill: ${wordmarkColor};
          }
          .tagline {
            font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
            font-weight: 500;
            font-size: 22px;
            fill: ${taglineColor};
          }
        `}</style>
      </defs>

      {/* Icon: stylized petal + pixel cluster */}
      <g transform="translate(30,20)">
        <path d="M60 4 C94 12 120 40 120 76 C120 112 86 132 60 132 C34 132 4 112 4 76 C4 40 26 12 60 4 Z"
          fill="url(#gradIcon)" opacity="0.98"/>
        <path d="M48 18 C70 10 98 24 100 46 C102 68 80 84 60 92 C40 100 30 86 32 64 C34 42 38 28 48 18 Z"
          fill="rgba(255,255,255,0.12)"/>
        <g transform="translate(78,70)">
          <rect x="0" y="0" width="12" height="12" fill={wordmarkColor} opacity="0.2" rx="2"/>
          <rect x="-16" y="0" width="12" height="12" fill={wordmarkColor} opacity="0.2" rx="2"/>
          <rect x="0" y="-16" width="12" height="12" fill={wordmarkColor} opacity="0.2" rx="2"/>
        </g>
      </g>

      {/* Wordmark */}
      <g transform="translate(180,90)">
        <text className="wordmark-bold" x="0" y="0">Pixels &amp; Petals</text>
        <text className="tagline" x="0" y="42">Design • Development • Cloud</text>
      </g>
    </svg>
  );
};