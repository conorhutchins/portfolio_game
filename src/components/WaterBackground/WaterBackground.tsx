import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../theme/ThemeContext';
import './WaterBackground.module.css';

interface Wave {
  phase: number;
  amplitude: number;
  speed: number;
  y: number;
  color: string;
}

const WaterBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDarkMode } = useTheme();

  const getCSSVariables = () => {
    const bodyStyles = getComputedStyle(document.body);
    return {
      waveColorStart: bodyStyles.getPropertyValue('--wave-color-start').trim(),
      waveColorEnd: bodyStyles.getPropertyValue('--wave-color-end').trim(),
      waveColor: bodyStyles.getPropertyValue('--wave-color').trim(),
    };
  };

  const cssVariablesRef = useRef(getCSSVariables());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const dpi = window.devicePixelRatio || 1;
    canvas.width = width * dpi;
    canvas.height = height * dpi;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpi, dpi);

    const waves: Wave[] = [];

    const getWaveColor = () => {
      const baseColor = cssVariablesRef.current.waveColor || 'rgba(0, 123, 255, 0.5)';
      const opacityVariation = Math.random() * 0.2 - 0.1;
      const rgbaMatch = baseColor.match(/rgba?\((\d+), (\d+), (\d+), ([\d.]+)\)/);

      if (rgbaMatch) {
        const r = rgbaMatch[1];
        const g = rgbaMatch[2];
        const b = rgbaMatch[3];
        let a = parseFloat(rgbaMatch[4]) + opacityVariation;
        a = Math.max(0, Math.min(1, a));
        return `rgba(${r}, ${g}, ${b}, ${a})`;
      }
      return baseColor;
    };

    const addWave = (wave: Wave) => {
      const insertAtBeginning = Math.random() < 0.5;

      if (insertAtBeginning) {
        waves.unshift(wave);
      } else {
        waves.push(wave);
      }
    };

    // Add 4 initial waves
    for (let i = 0; i < 4; i++) {
      const initialWave: Wave = {
        phase: 0,
        amplitude: Math.random() * 20 + 10,
        speed: Math.random() * 0.015 + 0.01,
        y: height / 2,
        color: getWaveColor(),
      };
      addWave(initialWave);
    }

    const drawBackgroundWaves = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, cssVariablesRef.current.waveColorStart || '#eef2f3');
      gradient.addColorStop(1, cssVariablesRef.current.waveColorEnd || '#69c0ff');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      drawBackgroundWaves();

      for (let i = 0; i < waves.length; i++) {
        const wave = waves[i];
        ctx.beginPath();
        ctx.moveTo(0, wave.y);

        for (let x = 0; x <= width; x++) {
          const y = wave.y + wave.amplitude * Math.sin(x * 0.02 + wave.phase);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        ctx.fillStyle = wave.color;
        ctx.fill();

        wave.phase += wave.speed;

        if (wave.phase > Math.PI * 20) {
          waves.splice(i, 1);
          i--;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      drawBackgroundWaves();
    } else {
      render();
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpi;
      canvas.height = height * dpi;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpi, dpi);
    };

    window.addEventListener('resize', handleResize);

    // Handle mouse clicks for waves
    const maxWaves = 20;
    canvas.addEventListener('click', (event) => {
      if (waves.length >= maxWaves) return;

      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) * (canvas.width / rect.width);
      const y = ((event.clientY - rect.top) * (canvas.height / rect.height)) / dpi;

      const newWave: Wave = {
        phase: 0,
        amplitude: Math.random() * 20 + 10,
        speed: Math.random() * 0.02 + 0.01,
        y: y,
        color: getWaveColor(),
      };

      addWave(newWave);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', () => {});
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Update CSS variables when `isDarkMode` changes
  useEffect(() => {
    cssVariablesRef.current = getCSSVariables();
    // Update wave colors
    // Existing waves may need their colors updated
    // waves.forEach((wave) => {
    //   wave.color = getWaveColor();
    // });
  }, [isDarkMode]);

  return <canvas ref={canvasRef} className="water-background" />;
};

export default WaterBackground;
