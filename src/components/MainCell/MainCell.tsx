import React, { useEffect } from 'react';
import styles from './MainCell.module.css';

interface MainCellProps {
  position: { x: number; y: number };
  setPosition: (position: { x: number; y: number }) => void;
  size: number;
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

  return (
    <div
      className={styles.mainCell}
      style={{
        width: size,
        height: size,
        left: position.x - size / 2,
        top: position.y - size / 2,
      }}
    ></div>
  );
};

export default MainCell;
