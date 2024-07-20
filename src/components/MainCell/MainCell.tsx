import React, { useEffect, useRef, useState } from 'react';
import styles from './MainCell.module.css';

interface MainCellProps {
  position: { x: number; y: number };
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  size: number;
  label: string;
}

const MainCell: React.FC<MainCellProps> = ({ position, setPosition, size, label }) => {
  const requestRef = useRef<number>();
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    const dx = e.clientX - position.x;
    const dy = e.clientY - position.y;
    const angle = Math.atan2(dy, dx);
    const speed = 3.7; 
    setVelocity({ x: Math.cos(angle) * speed, y: Math.sin(angle) * speed });
  };

  const updatePosition = () => {
    setPosition(prev => ({
      x: prev.x + velocity.x,
      y: prev.y + velocity.y,
    }));
    requestRef.current = requestAnimationFrame(updatePosition);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current!);
    };
  }, [velocity]);

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
