import { Cell, LabelledCell } from '../types';
import { CONFIG } from './config';

export const isLabelledCell = (cell: Cell): cell is LabelledCell => 'label' in cell;

export const moveLabelledCells = (cells: Cell[], isPaused: boolean) => {
  if (isPaused) {
    return cells; // Return cells without moving them if paused
  }

  // Update positions only if not paused
  return cells.map(cell => {
    if (isLabelledCell(cell)) {
      return {
        ...cell,
        initialPosition: {
          x: cell.initialPosition.x + (Math.random() - 0.5) * CONFIG.LABELLED_CELL.speedMultiplier,
          y: cell.initialPosition.y + (Math.random() - 0.5) * CONFIG.LABELLED_CELL.speedMultiplier,
        },
      };
    }
    return cell;
  });
};

export const handleCollision = (cell1: Cell, cell2: Cell) => {
  const dx = cell1.initialPosition.x - cell2.initialPosition.x;
  const dy = cell1.initialPosition.y - cell2.initialPosition.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < (cell1.size + cell2.size) / 2;
};
