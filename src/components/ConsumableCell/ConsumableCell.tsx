import React, { useEffect, useState, useRef } from 'react';
import styles from './ConsumableCell.module.css';

interface ConsumableCellProps {
  id: string;
  label?: string;
  initialPosition: { x: number; y: number };
  mainCellPosition: { x: number; y: number };
  mainCellSize: number;
  size: number;
  color?: string;
  onConsume: () => void;
}

const ConsumableCell: React.FC<ConsumableCellProps> = ({
  id, label, initialPosition, mainCellPosition, mainCellSize, size, color = '#3498db', onConsume
}) => {
  const [position, setPosition] = useState(initialPosition);
  const consumedRef = useRef(false);

  useEffect(() => {
    if (consumedRef.current) return;

    const dx = mainCellPosition.x - position.x;
    const dy = mainCellPosition.y - position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mainCellSize / 2 + size / 2) {
      if (mainCellSize > size) {
        onConsume();
        consumedRef.current = true;
      }
    }
  }, [mainCellPosition, mainCellSize, position, size, onConsume]);

  const style = {
    '--left': `${position.x}px`,
    '--top': `${position.y}px`,
    '--size': `${size}px`,
    '--color': color,
  } as React.CSSProperties;

  return (
    <div className={styles.consumableCell} style={style}>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
};

export default ConsumableCell;
