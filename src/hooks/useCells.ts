import { useState, useCallback, useEffect } from 'react';
import { generateRandomCells } from '../utils/positions';
import { LabelledCell, Cell } from '../types';
import { CONFIG } from '../utils/config';
import { isLabelledCell } from '../utils/helpers';
import { moveLabelledCells } from '../utils/movement';
import { handleCollision } from '../utils/collision';

export const useCells = (initialLabelledCells: LabelledCell[], windowWidth: number, windowHeight: number) => {
  const [mainCellPosition, setMainCellPosition] = useState({ x: windowWidth / 2, y: windowHeight / 2 });
  const [mainCellSize, setMainCellSize] = useState(CONFIG.MAIN_CELL.initialSize);
  const [consumedByMainCell, setConsumedByMainCell] = useState<LabelledCell | null>(null);
  const [allCells, setAllCells] = useState<Cell[]>(() => [
    ...initialLabelledCells,
    ...generateRandomCells(20, windowWidth, windowHeight, initialLabelledCells),
  ]);

  const handleMainCellConsume = useCallback((id: string, cellSize: number) => {
    const cell = allCells.find(cell => cell.id === id);
    if (cell && isLabelledCell(cell)) {
      setConsumedByMainCell(cell);
      if (cell.label === 'C.V') {
        window.open('https://docs.google.com/document/d/1_mCPPCm-o1bl1O-s_qwoy6YYP0L4V-Ty4BldaSQCDis/edit?usp=sharing', '_blank');
      }
    }
    setMainCellSize(prevSize => prevSize + cellSize / 2);
    setAllCells(prevCells => prevCells.filter(cell => cell.id !== id));
  }, [allCells]);

  const handleLabelledCellConsume = useCallback((consumerId: string, consumedId: string, consumedSize: number) => {
    setAllCells(prevCells => {
      return prevCells.map(cell => {
        if (cell.id === consumerId && isLabelledCell(cell)) {
          return {
            ...cell,
            size: cell.size + consumedSize / 2,
            // Add a timestamp to force re-render
            lastUpdated: Date.now()
          };
        }
        return cell;
      }).filter(cell => cell.id !== consumedId || isLabelledCell(cell));
    });
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setAllCells(prevCells => moveLabelledCells(prevCells));
    }, CONFIG.LABELLED_CELL.moveInterval);

    const collisionInterval = setInterval(() => {
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
    }, CONFIG.LABELLED_CELL.collisionInterval);

    return () => {
      clearInterval(moveInterval);
      clearInterval(collisionInterval);
    };
  }, [mainCellPosition, mainCellSize, handleMainCellConsume, handleLabelledCellConsume]);

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
