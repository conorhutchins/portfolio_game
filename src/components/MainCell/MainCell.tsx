import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './MainCell.module.css';
import { CONFIG } from '../../utils/config';

interface MainCellProps {
  position: { x: number; y: number };
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  size: number;
  label: string;
  isPaused: boolean;
}

const MainCell: React.FC<MainCellProps> = ({ position, setPosition, size, label, isPaused }) => {
  const requestRef = useRef<number>();
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });

  // Memoize handleMouseMove using useCallback
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const dx = e.clientX - position.x;
      const dy = e.clientY - position.y;
      const angle = Math.atan2(dy, dx);
      const speed =
        window.innerWidth <= 600
          ? CONFIG.MAIN_CELL.speedMultiplier * 0.5
          : CONFIG.MAIN_CELL.speedMultiplier;
      setVelocity({ x: Math.cos(angle) * speed, y: Math.sin(angle) * speed });
    },
    [position.x, position.y]
  );

  // Memoize updatePosition using useCallback
  const updatePosition = useCallback(() => {
    setPosition((prev) => ({
      x: Math.max(0, Math.min(window.innerWidth - size, prev.x + velocity.x)),
      y: Math.max(0, Math.min(window.innerHeight - size, prev.y + velocity.y)),
    }));
    requestRef.current = requestAnimationFrame(updatePosition);
  }, [velocity, size, setPosition]);

  useEffect(() => {
    if (!isPaused) {
      window.addEventListener('mousemove', handleMouseMove);
      requestRef.current = requestAnimationFrame(updatePosition);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [handleMouseMove, updatePosition, isPaused]);

  const style = {
    '--left': `${position.x}px`,
    '--top': `${position.y}px`,
    '--size': `${size}px`,
  } as React.CSSProperties;

  return (
    <div className={styles.mainCell} style={style}>
      <span className={styles.label}>{label}</span>
    </div>
  );
};

export default MainCell;