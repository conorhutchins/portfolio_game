import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MainCell from '../../components/MainCell/MainCell';
import ConsumableCell from '../../components/ConsumableCell/ConsumableCell';
import Modal from '../../components/Modal/Modal';
import styles from './GameField.module.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const GameField: React.FC = () => {
  const query = useQuery();
  const userName = query.get('name') || 'Player';

  const [mainCellPosition, setMainCellPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [mainCellSize, setMainCellSize] = useState(50);
  const [consumedCell, setConsumedCell] = useState<string | null>(null);

  const cells = [
    { id: 'cv', label: 'CV', initialPosition: { x: 200, y: 200 }, size: 40, color: '#f39c12' },
    { id: 'experience', label: 'Experience', initialPosition: { x: 900, y: 100 }, size: 100, color: '#e74c3c' },
    { id: 'contact', label: 'Contact', initialPosition: { x: 100, y: 800 }, size: 60, color: '#8e44ad' },
    { id: 'tech-stack', label: 'Tech Stack', initialPosition: { x: 1800, y: 140 }, size: 100, color: '#3498db' },
    { id: 'projects', label: 'Projects', initialPosition: { x: 1000, y: 800 }, size: 110, color: '#2ecc71' },
    { id: 'small-cell-1', initialPosition: { x: 500, y: 500 }, size: 20, color: '#2ecc71' }, // Small cell without label
    { id: 'small-cell-2', initialPosition: { x: 700, y: 300 }, size: 20, color: '#e74c3c' }, // Small cell without label
  ];

  const handleConsume = (id: string, cellSize: number) => {
    setConsumedCell(id);
    setMainCellSize(prevSize => prevSize + cellSize); // Add the size of the consumed cell to the main cell's size
  };

  return (
    <div className={styles.gameField}>
      <MainCell position={mainCellPosition} setPosition={setMainCellPosition} size={mainCellSize} label={userName} />
      {cells.map(cell => (
        <ConsumableCell
          key={cell.id}
          id={cell.id}
          label={cell.label}
          initialPosition={cell.initialPosition}
          mainCellPosition={mainCellPosition}
          mainCellSize={mainCellSize}
          size={cell.size}
          color={cell.color}
          onConsume={() => handleConsume(cell.id, cell.size)} // Pass the cell size to the handleConsume function
        />
      ))}
      {consumedCell && (
        <Modal content={`You consumed: ${consumedCell}`} onClose={() => setConsumedCell(null)} />
      )}
    </div>
  );
};

export default GameField;
