import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainCell from '../../components/MainCell/MainCell';
import ConsumableCell from '../../components/ConsumableCell/ConsumableCell';
import styles from './GameField.module.css';
import { useCells } from '../../hooks/useCells';
import { initialLabelledCells } from '../../data/initialLabelledCells';
import { adjustInitialLabelledCellPositions, updateBounceLogic, createNewConsumableCell } from '../../utils/cellUtils';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const GameField: React.FC = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const userName = query.get('name') || 'Player';

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const isMobile = windowSize.width <= 768; // Adjust this breakpoint as needed

  const adjustedInitialCells = useMemo(() => 
    adjustInitialLabelledCellPositions(initialLabelledCells, windowSize.width, windowSize.height, isMobile),
    [windowSize.width, windowSize.height, isMobile]
  );

  const {
    mainCellPosition,
    setMainCellPosition,
    mainCellSize,
    consumedByMainCell,
    allCells,
    setAllCells,
    handleConsume,
    handleLabelledCellConsume,
  } = useCells(adjustedInitialCells, windowSize.width, windowSize.height);

  const addNewConsumableCell = useCallback(() => {
    const newCell = createNewConsumableCell(`new-cell-${Date.now()}`, windowSize.width, windowSize.height);
    setAllCells(prevCells => [...prevCells, newCell]);
  }, [windowSize, setAllCells]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const bounceInterval = setInterval(() => {
      setAllCells(prevCells => updateBounceLogic(prevCells, windowSize.width, windowSize.height));
    }, 1000); // Update bounce logic every second

    const spawnInterval = setInterval(addNewConsumableCell, 10000); // Add new cell every 10 seconds

    return () => {
      clearInterval(bounceInterval);
      clearInterval(spawnInterval);
    };
  }, [windowSize, setAllCells, addNewConsumableCell]);

  useEffect(() => {
    if (consumedByMainCell) {
      switch (consumedByMainCell.label) {
        case 'Contact':
          navigate('/contact');
          break;
        case 'Experience':
          navigate('/experience');
          break;
        case 'Tech Stack':
          navigate('/techstack');
          break;
        case 'Projects':
          navigate('/projects');
          break;
        default:
          break;
      }
    }
  }, [consumedByMainCell, navigate]);

  const gameFieldStyle = {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden'
  };

  return (
    <div className={styles.gameField} style={gameFieldStyle}>
      <MainCell position={mainCellPosition} setPosition={setMainCellPosition} size={mainCellSize} label={userName} />
      {allCells.map(cell => (
        <ConsumableCell
          key={cell.id}
          id={cell.id}
          initialPosition={cell.initialPosition}
          mainCellPosition={mainCellPosition}
          mainCellSize={mainCellSize}
          size={cell.size}
          color={cell.color}
          onConsume={handleConsume}
          allCells={allCells}
          onLabelledCellConsume={handleLabelledCellConsume}
          {...('label' in cell && { label: cell.label })}
        />
      ))}
    </div>
  );
};

export default GameField;