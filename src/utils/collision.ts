import { Cell } from '../types';

export const handleCollision = (cell1: Cell, cell2: Cell) => {
  const dx = cell1.initialPosition.x - cell2.initialPosition.x;
  const dy = cell1.initialPosition.y - cell2.initialPosition.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < (cell1.size + cell2.size) / 2;
};
