import { Cell } from '../types';
import { isLabelledCell } from './helpers';

export const moveLabelledCells = (cells: Cell[]): Cell[] => {
  return cells.map(cell => {
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
};
