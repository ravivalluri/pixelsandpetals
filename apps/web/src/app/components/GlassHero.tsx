"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

export const GlassHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Initialize kinetic veins effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(Math.floor(canvas.width * canvas.height / 10000), 150);
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
        });
      }
    };

    initParticles();

    // Mouse movement tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      
      // Clear with semi-transparent overlay for trail effect
      ctx.fillStyle = 'rgba(8, 17, 26, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach((p, i) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;
        
        // Boundary checks
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Connect nearby particles
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(102, 153, 255, ${0.2 * (1 - dist/100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        
        // Mouse interaction
        const mouse = mousePosRef.current;
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        
        if (mdist < 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(153, 102, 204, ${0.3 * (1 - mdist/150)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('projects-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home-section" style={{
      position: "relative",
      minHeight: "72vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#08111A",
      overflow: "hidden",
      padding: "64px 20px",
      color: "#E6EEF3",
    }}>
      {/* Kinetic Veins Canvas - Full container coverage */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />
      
      {/* Content Container */}
      <div style={{
        position: "relative",
        zIndex: 2,
        width: "min(1100px, 95%)",
        textAlign: "center",
      }}>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 10px 30px rgba(2,8,23,0.5)",
            padding: "40px",
            borderRadius: "16px",
            display: "inline-block",
          }}>
            <h1 style={{
              margin: 0,
              fontSize: "clamp(28px, 4vw, 44px)",
              letterSpacing: "-0.02em",
              background: "linear-gradient(90deg,#7C5CFF,#6EE7B7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Pixels &amp; Petals</h1>
            
            <p style={{
              fontFamily: "Open Sans, system-ui, -apple-system, sans-serif",
              fontSize: "24px",
              fontWeight: 400,
              margin: "16px 0 32px 0",
              maxWidth: "800px",
              lineHeight: 1.625,
              textAlign: "center",
              color: "#cfeaf1",
            }}>
              Experience the intelligent, adaptive nature of our design-forward engineering through an interactive crystalline environment
            </p>

            <div style={{ 
              display: "flex", 
              gap: 16, 
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}>
              <a 
                href="#projects-section" 
                style={{
                  padding: "10px 18px",
                  background: "linear-gradient(90deg,#7C5CFF,#6EE7B7)",
                  color: "#041018",
                  borderRadius: 10,
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 6px 18px rgba(124,92,255,0.18)",
                  cursor: "pointer",
                }}
                onClick={scrollToProjects}
              >
                See Projects
              </a>

              <div style={{ margin: "0 8px" }} aria-hidden>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 8,
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <QRCodeSVG
                    value="https://ravivalluri.com/resume.pdf"
                    size={72}
                    bgColor="transparent"
                    fgColor="#e6eef3"
                  />
                  <small style={{ 
                    fontSize: 12, 
                    color: "#b6dfe2", 
                    marginTop: 6,
                    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  }}>Scan resume</small>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
