import { useState, useCallback, useEffect } from 'react';
import { generateRandomCells } from '../utils/positions';
import { LabelledCell, Cell } from '../types';

export const useCells = (initialLabelledCells: LabelledCell[], windowWidth: number, windowHeight: number) => {
  const [mainCellPosition, setMainCellPosition] = useState({ x: windowWidth / 2, y: windowHeight / 2 });
  const [mainCellSize, setMainCellSize] = useState(50);
  const [consumedCell, setConsumedCell] = useState<LabelledCell | null>(null);
  const [cells, setCells] = useState<Cell[]>([
    ...initialLabelledCells,
    ...generateRandomCells(20, windowWidth, windowHeight, initialLabelledCells)
  ]);

  const handleConsume = useCallback((id: string, cellSize: number) => {
    const cell = cells.find(cell => cell.id === id);
    if (cell && 'label' in cell) {
      setConsumedCell(cell); // Set consumedCell to the cell itself
      if (cell.label === 'C.V') {
        window.open('https://docs.google.com/document/d/1_mCPPCm-o1bl1O-s_qwoy6YYP0L4V-Ty4BldaSQCDis/edit?usp=sharing', '_blank');
      }
    }
    setMainCellSize(prevSize => prevSize + cellSize / 2); // Add half the size of the consumed cell to the main cell's size
    setCells(prevCells => prevCells.filter(cell => cell.id !== id));
  }, [cells]);

  useEffect(() => {
    cells.forEach(cell => {
      const dx = mainCellPosition.x - cell.initialPosition.x;
      const dy = mainCellPosition.y - cell.initialPosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mainCellSize / 2 + cell.size / 2.2) {
        if (mainCellSize > cell.size) {
          handleConsume(cell.id, cell.size);
        }
      }
    });
  }, [mainCellPosition, mainCellSize, cells, handleConsume]);

  return {
    mainCellPosition,
    setMainCellPosition,
    mainCellSize,
    consumedCell,
    setConsumedCell,
    cells,
    handleConsume,
  };
};
