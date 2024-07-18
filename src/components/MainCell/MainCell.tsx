import React, { useEffect } from 'react';
import styles from './MainCell.module.css';

interface MainCellProps {
  position: { x: number; y: number };
  setPosition: (position: { x: number; y: number }) => void;
  size: number;
  label: string;
}

const MainCell: React.FC<MainCellProps> = ({ position, setPosition, size }) => {
  const handleMouseMove = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const style = {
    '--left': `${position.x}px`,
    '--top': `${position.y}px`,
    '--size': `${size}px`,
  } as React.CSSProperties;

  return (
    <div className={styles.mainCell} style={style}></div>
  );
};

export default MainCell;
