import React from 'react';
import { useLocation } from 'react-router-dom';
import MainCell from '../../components/MainCell/MainCell';
import ConsumableCell from '../../components/ConsumableCell/ConsumableCell';
import Modal from '../../components/Modal/Modal';
import styles from './GameField.module.css';
import { useCells } from '../../hooks/useCells';
import { initialLabelledCells } from '../../data/initialLabelledCells';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const GameField: React.FC = () => {
  const query = useQuery();
  const userName = query.get('name') || 'Player';

  const {
    mainCellPosition,
    setMainCellPosition,
    mainCellSize,
    consumedCell,
    setConsumedCell,
    cells,
    handleConsume,
  } = useCells(initialLabelledCells, window.innerWidth, window.innerHeight);

  return (
    <div className={styles.gameField}>
      <MainCell position={mainCellPosition} setPosition={setMainCellPosition} size={mainCellSize} label={userName} />
      {cells.map(cell => (
        <ConsumableCell
          key={cell.id}
          id={cell.id}
          initialPosition={cell.initialPosition}
          mainCellPosition={mainCellPosition}
          mainCellSize={mainCellSize}
          size={cell.size}
          color={cell.color}
          onConsume={handleConsume}
          {...('label' in cell && { label: cell.label })}
        />
      ))}
      {consumedCell && (
        <Modal content={`You consumed: ${consumedCell}`} onClose={() => setConsumedCell(null)} />
      )}
    </div>
  );
};

export default GameField;
