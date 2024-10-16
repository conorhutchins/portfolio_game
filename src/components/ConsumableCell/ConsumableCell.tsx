import React, { useEffect, useState, useRef } from 'react';
import styles from './ConsumableCell.module.css';
import { Cell } from '../../types';
import { CONFIG } from '../../utils/config';

interface ConsumableCellProps {
  id: string;
  label?: string;
  initialPosition: { x: number; y: number };
  mainCellPosition: { x: number; y: number };
  mainCellSize: number;
  size: number;
  color?: string;
  onConsume: (id: string, size: number) => void;
  onLabelledCellConsume: (consumerId: string, consumedId: string, consumedSize: number) => void;
  allCells: Cell[];
  lastUpdated?: number;
  isPaused?: boolean;
}

const ConsumableCell: React.FC<ConsumableCellProps> = ({
  id,
  label,
  initialPosition,
  mainCellPosition,
  mainCellSize,
  size,
  color = '#3498db',
  onConsume,
  allCells,
  onLabelledCellConsume,
  lastUpdated,
  isPaused
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const consumedRef = useRef(false);

  useEffect(() => {
    if (label) {
      const speed = CONFIG.LABELLED_CELL.speedMultiplier;
      setVelocity({ x: (Math.random() - 0.5) * speed, y: (Math.random() - 0.5) * speed });
    }
  }, [label]);

  const bounceOffEdges = (pos: { x: number; y: number }, vel: { x: number; y: number }) => {
    let newVelocity = { ...vel };
    if (pos.x <= 0 || pos.x >= window.innerWidth) {
      newVelocity.x = -newVelocity.x;
    }
    if (pos.y <= 0 || pos.y >= window.innerHeight) {
      newVelocity.y = -newVelocity.y;
    }
    return newVelocity;
  };

  useEffect(() => {
    if (label && !isPaused) {
      const interval = setInterval(() => {
        setPosition(prevPos => {
          const newVelocity = bounceOffEdges(prevPos, velocity);
          setVelocity(newVelocity);
          return { x: prevPos.x + newVelocity.x, y: prevPos.y + newVelocity.y };
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [velocity, label, isPaused]);

  useEffect(() => {
    if (consumedRef.current || isPaused) return;

    const dx = mainCellPosition.x - position.x;
    const dy = mainCellPosition.y - position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mainCellSize / 2 + size / 2) {
      if (mainCellSize > size) {
        onConsume(id, size);
        consumedRef.current = true;
        return;
      }
    }

    if (label) {
      allCells.forEach(otherCell => {
        if (otherCell.id !== id && !('label' in otherCell)) {
          const dx = position.x - otherCell.initialPosition.x;
          const dy = position.y - otherCell.initialPosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < size / 2 + otherCell.size / 2 && size > otherCell.size) {
            onLabelledCellConsume(id, otherCell.id, otherCell.size);
          }
        }
      });
    }
  }, [mainCellPosition, mainCellSize, position, size, onConsume, id, label, allCells, onLabelledCellConsume, isPaused]);

  if (consumedRef.current) return null;

  const style = {
    '--left': `${position.x}px`,
    '--top': `${position.y}px`,
    '--size': `${size}px`,
    '--color': color,
  } as React.CSSProperties;

  return (
    <div className={styles.consumableCell} style={style} key={`${id}-${lastUpdated}`}>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
};

export default ConsumableCell;