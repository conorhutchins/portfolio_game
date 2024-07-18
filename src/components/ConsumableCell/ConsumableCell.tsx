import React, { useEffect } from 'react';
import styles from './ConsumableCell.module.css';

interface ConsumableCellProps {
  id: string;
  label: string;
  initialPosition: { x: number; y: number };
  mainCellPosition: { x: number; y: number };
  mainCellSize: number;
  size: number;
  onConsume: (id: string) => void;
}

const ConsumableCell: React.FC<ConsumableCellProps> = ({
  id,
  label,
  initialPosition,
  mainCellPosition,
  mainCellSize,
  size,
  onConsume,
}) => {
  const [position, setPosition] = React.useState(initialPosition);

  useEffect(() => {
    const dx = mainCellPosition.x - position.x;
    const dy = mainCellPosition.y - position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mainCellSize / 2 + size / 2) {
      if (mainCellSize > size) {
        onConsume(id);
      }
    }
  }, [mainCellPosition]);

  const style = {
    '--left': `${position.x}px`,
    '--top': `${position.y}px`,
    '--size': `${size}px`,
  } as React.CSSProperties;

  return (
    <div className={styles.consumableCell} style={style}>
      {label}
    </div>
  );
};

export default ConsumableCell;
