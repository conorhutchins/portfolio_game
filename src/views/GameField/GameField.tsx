import React, { useState, useEffect } from 'react';
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
    { id: 'cv', label: 'CV', initialPosition: { x: 200, y: 200 }, size: 30 },
    { id: 'project1', label: 'Project 1', initialPosition: { x: 400, y: 300 }, size: 40 },
    // Add more cells as needed
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
