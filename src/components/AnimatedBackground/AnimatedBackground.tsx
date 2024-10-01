import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../theme/ThemeContext';
import './AnimatedBackground.module.css';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Get the canvas and context
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Variables for animation
    let offset = 0;
    const patternSpeed = 0.4; // Adjust for faster or slower motion

    // Create the pattern canvas
    const patternCanvas = document.createElement('canvas');
    const patternContext = patternCanvas.getContext('2d')!;
    patternCanvas.width = 50; // Adjust pattern size
    patternCanvas.height = 50;

    // Function to draw the pattern based on theme
    const drawPattern = () => {
      // Colors based on theme
      const backgroundColor = isDarkMode ? 'black' : 'white';
      const strokeColor = isDarkMode ? '#444' : '#007aff';

      // Clear the pattern canvas
      patternContext.clearRect(0, 0, patternCanvas.width, patternCanvas.height);

      // Draw pattern on patternCanvas
      patternContext.fillStyle = backgroundColor;
      patternContext.fillRect(0, 0, patternCanvas.width, patternCanvas.height);
      patternContext.strokeStyle = strokeColor;
      patternContext.lineWidth = 5;
      patternContext.beginPath();
      patternContext.moveTo(0, 0);
      patternContext.lineTo(patternCanvas.width, patternCanvas.height);
      patternContext.stroke();
    };

    drawPattern();

    // Create the pattern
    let pattern = ctx.createPattern(patternCanvas, 'repeat')!;

    // Animation loop
    const animate = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, width, height);

      // Save context state
      ctx.save();

      // Move the pattern for animation
      ctx.translate(offset, offset);

      // Update pattern if theme changes
      drawPattern();
      pattern = ctx.createPattern(patternCanvas, 'repeat')!;

      // Fill with the pattern
      ctx.fillStyle = pattern;
      ctx.fillRect(-offset, -offset, width + patternCanvas.width, height + patternCanvas.height);

      // Restore context state
      ctx.restore();

      // Apply gradient overlay based on theme
      const gradient = ctx.createLinearGradient(0, 0, width, height);

      if (isDarkMode) {
        // Dark mode gradient
        gradient.addColorStop(0, 'rgba(50, 50, 50, 0.5)');
        gradient.addColorStop(1, 'rgba(100, 100, 100, 0.5)');
      } else {
        // Light mode gradient
        gradient.addColorStop(0, 'rgba(200, 200, 200, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update the offset for motion
      offset += patternSpeed;
      if (offset > patternCanvas.width) {
        offset = 0;
      }

      // Request the next frame
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start the animation
    animate();

    // Handle window resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]); // Re-run effect when isDarkMode changes

  return <canvas ref={canvasRef} className="animated-background" />;
};

export default AnimatedBackground;
