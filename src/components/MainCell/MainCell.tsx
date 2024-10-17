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

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isPaused) {
        const dx = e.clientX - position.x;
        const dy = e.clientY - position.y;
        const angle = Math.atan2(dy, dx);
        const speed = CONFIG.MAIN_CELL.speedMultiplier;
        setVelocity({ x: Math.cos(angle) * speed, y: Math.sin(angle) * speed });
      }
    },
    [position.x, position.y, isPaused]
  );

  const updatePosition = useCallback(() => {
    if (!isPaused) {
      setPosition((prev) => {
        let newX = prev.x + velocity.x;
        let newY = prev.y + velocity.y;

        // Calculate the maximum allowed positions
        const maxX = window.innerWidth - size;
        const maxY = window.innerHeight - size;

        // Bounce off the edges
        if (newX <= 0 || newX >= maxX) {
          newX = Math.max(0, Math.min(maxX, newX));
          setVelocity(v => ({ ...v, x: -v.x }));
        }
        if (newY <= 0 || newY >= maxY) {
          newY = Math.max(0, Math.min(maxY, newY));
          setVelocity(v => ({ ...v, y: -v.y }));
        }

        return { x: newX, y: newY };
      });
    }
    requestRef.current = requestAnimationFrame(updatePosition);
  }, [velocity, size, setPosition, isPaused]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [handleMouseMove, updatePosition]);

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