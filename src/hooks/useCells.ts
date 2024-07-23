import { useState, useCallback, useEffect } from 'react';
import { generateRandomCells } from '../utils/positions';
import { LabelledCell, Cell } from '../types';
import { isLabelledCell } from '../utils/helpers';
import { handleCollision } from '../utils/collision';
import { moveLabelledCells } from '../utils/movement';
import { handleMainCellConsume as mainCellConsume, handleLabelledCellConsume as labelledCellConsume } from '../utils/consumption';

export const useCells = (initialLabelledCells: LabelledCell[], windowWidth: number, windowHeight: number) => {
  const [mainCellPosition, setMainCellPosition] = useState({ x: windowWidth / 2, y: windowHeight / 2 });
  const [mainCellSize, setMainCellSize] = useState(50);
  const [consumedByMainCell, setConsumedByMainCell] = useState<LabelledCell | null>(null);
  const [allCells, setAllCells] = useState<Cell[]>(() => [
    ...initialLabelledCells,
    ...generateRandomCells(20, windowWidth, windowHeight, initialLabelledCells)
  ]);

  const handleMainCellConsume = useCallback((id: string, cellSize: number) => {
    mainCellConsume(allCells, setAllCells, setMainCellSize, setConsumedByMainCell, id, cellSize);
  }, [allCells]);

  const handleLabelledCellConsume = useCallback((consumerId: string, consumedId: string, consumedSize: number) => {
    labelledCellConsume(allCells, setAllCells, consumerId, consumedId, consumedSize);
  }, [allCells]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAllCells(prevCells => {
        let updatedCells = moveLabelledCells(prevCells);

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
    }, 100);

    return () => clearInterval(interval);
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
  };
};
