import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainCell from '../../components/MainCell/MainCell';
import ConsumableCell from '../../components/ConsumableCell/ConsumableCell';
import styles from './GameField.module.css';
import { useCells } from '../../hooks/useCells';
import { initialLabelledCells } from '../../data/initialLabelledCells';
import { adjustInitialLabelledCellPositions, updateBounceLogic, createNewConsumableCell } from '../../utils/cellUtils';
import Modal from '../../components/Modal/Modal';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const GameField: React.FC = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const userName = query.get('name') || 'Player';

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const isMobile = windowSize.width <= 768;

  const adjustedInitialCells = useMemo(
    () =>
      adjustInitialLabelledCellPositions(
        initialLabelledCells,
        windowSize.width,
        windowSize.height,
        isMobile
      ),
    [windowSize.width, windowSize.height, isMobile]
  );

  const [showCVModal, setShowCVModal] = useState<boolean>(false);

  const {
    mainCellPosition,
    setMainCellPosition,
    mainCellSize,
    consumedByMainCell,
    allCells,
    setAllCells,
    handleConsume,
    handleLabelledCellConsume,
  } = useCells(
    adjustedInitialCells,
    windowSize.width,
    windowSize.height,
    setShowCVModal,
    showCVModal
  );

  const addNewConsumableCell = useCallback(() => {
    const newCell = createNewConsumableCell(
      `new-cell-${Date.now()}`,
      windowSize.width,
      windowSize.height
    );
    setAllCells((prevCells) => [...prevCells, newCell]);
  }, [windowSize, setAllCells]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!showCVModal) {
      const bounceInterval = setInterval(() => {
        setAllCells((prevCells) =>
          updateBounceLogic(prevCells, windowSize.width, windowSize.height)
        );
      }, 1000);

      const spawnInterval = setInterval(addNewConsumableCell, 10000);

      return () => {
        clearInterval(bounceInterval);
        clearInterval(spawnInterval);
      };
    }
  }, [windowSize, setAllCells, addNewConsumableCell, showCVModal]);

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
    overflow: 'hidden',
  };

  return (
    <div className={styles.gameField} style={gameFieldStyle}>
      <MainCell
        position={mainCellPosition}
        setPosition={setMainCellPosition}
        size={mainCellSize}
        label={userName}
        isPaused={showCVModal}
      />
      {allCells.map((cell) => (
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
          isPaused={showCVModal}
          {...('label' in cell && { label: cell.label })}
        />
      ))}
      {showCVModal && (
        <Modal
          onClose={() => setShowCVModal(false)}
          onConfirm={() => {
            window.open(
              'https://docs.google.com/document/d/1_mCPPCm-o1bl1O-s_qwoy6YYP0L4V-Ty4BldaSQCDis/edit?usp=sharing',
              '_blank'
            );
            setShowCVModal(false);
          }}
        />
      )}
    </div>
  );
};

export default GameField;
