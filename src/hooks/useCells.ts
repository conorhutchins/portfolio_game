import { useState, useCallback, useEffect } from 'react';
import { generateRandomCells } from '../utils/positions';
import { LabelledCell, Cell } from '../types';
import { CONFIG } from '../utils/config';
import { isLabelledCell } from '../utils/helpers';
import { moveLabelledCells } from '../utils/movement';
import { handleCollision } from '../utils/collision';
import * as consumption from '../utils/consumption';

export const useCells = (
  initialLabelledCells: LabelledCell[], 
  windowWidth: number, 
  windowHeight: number, 
  setShowCVModal: React.Dispatch<React.SetStateAction<boolean>>, 
  showCVModal: boolean
) => {
  const [mainCellPosition, setMainCellPosition] = useState({ x: windowWidth / 2, y: windowHeight / 2 });
  const [mainCellSize, setMainCellSize] = useState(CONFIG.MAIN_CELL.initialSize);
  const [consumedByMainCell, setConsumedByMainCell] = useState<LabelledCell | null>(null);
  const [allCells, setAllCells] = useState<Cell[]>(() => [
    ...initialLabelledCells,
    ...generateRandomCells(20, windowWidth, windowHeight, initialLabelledCells),
  ]);

  const handleMainCellConsume = useCallback(
    (id: string, cellSize: number) => {
      consumption.handleMainCellConsume(
        allCells,
        setAllCells,
        setMainCellSize,
        setConsumedByMainCell,
        setShowCVModal,
        id,
        cellSize
      );
    },
    [allCells, setAllCells, setMainCellSize, setConsumedByMainCell, setShowCVModal]
  );

  const handleLabelledCellConsume = useCallback((consumerId: string, consumedId: string, consumedSize: number) => {
    setAllCells(prevCells => {
      return prevCells.map(cell => {
        if (cell.id === consumerId && isLabelledCell(cell)) {
          return {
            ...cell,
            size: cell.size + consumedSize / 2,
            lastUpdated: Date.now()
          };
        }
        return cell;
      }).filter(cell => cell.id !== consumedId || isLabelledCell(cell));
    });
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (!showCVModal) {
        setAllCells(prevCells => moveLabelledCells(prevCells, showCVModal));
      }
    }, CONFIG.LABELLED_CELL.moveInterval);

    const collisionInterval = setInterval(() => {
      if (!showCVModal) {
        setAllCells(prevCells => {
          let updatedCells = [...prevCells];
          updatedCells.forEach((cell, index) => {
            const mainCellAsCell: Cell = {
              id: 'main',
              initialPosition: mainCellPosition,
              size: mainCellSize,
              color: '',
            };

            if (handleCollision(cell, mainCellAsCell)) {
              if (mainCellSize > cell.size) {
                handleMainCellConsume(cell.id, cell.size);
              }
            }

            if (isLabelledCell(cell)) {
              for (let i = index + 1; i < updatedCells.length; i++) {
                const otherCell = updatedCells[i];
                if (!isLabelledCell(otherCell) && handleCollision(cell, otherCell)) {
                  if (cell.size > otherCell.size) {
                    handleLabelledCellConsume(cell.id, otherCell.id, otherCell.size);
                  }
                }
              }
            }
          });
          return updatedCells;
        });
      }
    }, CONFIG.LABELLED_CELL.collisionInterval);

    return () => {
      clearInterval(moveInterval);
      clearInterval(collisionInterval);
    };
  }, [mainCellPosition, mainCellSize, handleMainCellConsume, handleLabelledCellConsume, showCVModal, windowWidth, windowHeight]);

  return {
    mainCellPosition,
    setMainCellPosition,
    mainCellSize,
    consumedByMainCell,
    setConsumedByMainCell,
    allCells,
    handleConsume: handleMainCellConsume,
    handleLabelledCellConsume,
    setAllCells,
  };
};