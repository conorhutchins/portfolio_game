import { useState, useCallback, useEffect } from 'react';
import { generateRandomCells } from '../utils/positions';
import { LabelledCell, Cell, UnlabelledCell } from '../types';

// Utility function to determine if a cell is a labelled cell
const isLabelledCell = (cell: Cell): cell is LabelledCell => 'label' in cell;

// Utility function to handle collision detection between two cells
const handleCollision = (cell1: Cell, cell2: Cell) => {
  const dx = cell1.initialPosition.x - cell2.initialPosition.x;
  const dy = cell1.initialPosition.y - cell2.initialPosition.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < (cell1.size + cell2.size) / 2;
};

export const useCells = (initialLabelledCells: LabelledCell[], windowWidth: number, windowHeight: number) => {
  // State for main cell's position and size
  const [mainCellPosition, setMainCellPosition] = useState({ x: windowWidth / 2, y: windowHeight / 2 });
  const [mainCellSize, setMainCellSize] = useState(50);
  // State for tracking the last cell consumed by the main cell
  const [consumedByMainCell, setConsumedByMainCell] = useState<LabelledCell | null>(null);
  // State for all cells in the game
  const [allCells, setAllCells] = useState<Cell[]>(() => [
    ...initialLabelledCells,
    ...generateRandomCells(20, windowWidth, windowHeight, initialLabelledCells)
  ]);

  // Function to handle the consumption of a cell by the main cell
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

  // Function to handle the consumption of a cell by a labelled cell
  const handleLabelledCellConsume = useCallback((consumerId: string, consumedId: string, consumedSize: number) => {
    setAllCells(prevCells => {
      return prevCells.map(cell => {
        if (cell.id === consumerId && isLabelledCell(cell)) {
          return {
            ...cell,
            size: cell.size + consumedSize / 2,
            lastUpdated: Date.now() // Add a timestamp to force re-render
          };
        }
        return cell;
      }).filter(cell => cell.id !== consumedId || isLabelledCell(cell));
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAllCells(prevCells => {
        let updatedCells = prevCells.map(cell => {
          // Move labelled cells randomly
          if (isLabelledCell(cell)) {
            return {
              ...cell,
              initialPosition: {
                x: cell.initialPosition.x + (Math.random() - 0.5) * 2,
                y: cell.initialPosition.y + (Math.random() - 0.5) * 2,
              }
            };
          }
          return cell;
        });

        // Check collisions
        updatedCells.forEach((cell, index) => {
          const mainCellAsCell: Cell = {
            id: 'main',
            initialPosition: mainCellPosition,
            size: mainCellSize,
            color: '',
          };

          // Check collision with main cell
          if (handleCollision(cell, mainCellAsCell)) {
            if (mainCellSize > cell.size) {
              handleMainCellConsume(cell.id, cell.size);
            }
          }

          // Check collisions with other cells for labelled cells
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
