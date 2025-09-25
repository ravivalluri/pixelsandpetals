"use client";
import React, { useEffect, useRef, useState } from 'react';

export const LiquidGlassCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Throttle mouse movement updates
  const updateCursorPosition = React.useCallback(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%) ${isClicking ? 'scale(0.8)' : 'scale(1)'}`;
    }
    rafRef.current = null;
  }, [isClicking]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      
      // Use requestAnimationFrame to throttle updates
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateCursorPosition);
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.classList.contains('interactive') ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('.interactive')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.classList.contains('interactive') ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('.interactive')) {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
      
      // Clean up animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isClicking, updateCursorPosition]);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: isHovering ? '40px' : '20px',
          height: isHovering ? '40px' : '20px',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.15s cubic-bezier(0.23, 1, 0.32, 1), height 0.15s cubic-bezier(0.23, 1, 0.32, 1)',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      >
        {/* Main cursor body */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px) saturate(1.5)',
            WebkitBackdropFilter: 'blur(10px) saturate(1.5)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Inner glow */}
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '20%',
              width: '60%',
              height: '60%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%)',
              borderRadius: '50%',
              opacity: isHovering ? 1 : 0.6,
              transition: 'opacity 0.15s ease',
            }}
          />

          {/* Liquid distortion effect */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `conic-gradient(from 0deg,
                rgba(102, 153, 255, 0.2) 0deg,
                rgba(153, 102, 204, 0.2) 120deg,
                rgba(217, 232, 245, 0.2) 240deg,
                rgba(102, 153, 255, 0.2) 360deg)`,
              borderRadius: '50%',
              animation: 'liquidRotate 4s linear infinite',
              opacity: isHovering ? 0.8 : 0.4,
            }}
          />
        </div>

        {/* Outer ring for hover state */}
        {isHovering && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '120%',
              height: '120%',
              transform: 'translate(-50%, -50%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              animation: 'liquidPulse 2s ease-in-out infinite',
            }}
          />
        )}
      </div>

      <style jsx>{`
        @keyframes liquidRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes liquidPulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.1;
          }
        }

        * {
          cursor: none !important;
        }

        a, button, .interactive {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};