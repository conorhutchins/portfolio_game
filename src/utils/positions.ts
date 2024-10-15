import { getRandomColor } from './colors';
import { CONFIG } from '../utils/config';

export const getRandomPosition = (maxWidth: number, maxHeight: number): { x: number; y: number } => {
  return {
    x: Math.floor(Math.random() * maxWidth),
    y: Math.floor(Math.random() * maxHeight),
  };
};

const isColliding = (
  pos1: { x: number; y: number },
  size1: number,
  pos2: { x: number; y: number },
  size2: number
): boolean => {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < size1 / 2 + size2 / 2;
};

const findNonCollidingPosition = (
  existingCells: { initialPosition: { x: number; y: number }; size: number }[],
  size: number,
  maxWidth: number,
  maxHeight: number
): { x: number; y: number } => {
  do {
    const position = getRandomPosition(maxWidth, maxHeight); // Declare 'position' as a constant inside the loop
    const isValidPosition = existingCells.every(cell => !isColliding(position, size, cell.initialPosition, cell.size));
    if (isValidPosition) {
      return position; // Return the valid position immediately
    }
    // Continue looping if not a valid position
  } while (true); // Loop indefinitely until a valid position is found
};

export const generateRandomCells = (
  count: number,
  maxWidth: number,
  maxHeight: number,
  existingCells: { initialPosition: { x: number; y: number }; size: number }[]
): { id: string; initialPosition: { x: number; y: number }; size: number; color: string }[] => {
  const cells = [];
  const randomCellSize = CONFIG.RANDOM_CELL.size;

  for (let i = 0; i < count; i++) {
    const position = findNonCollidingPosition([...existingCells, ...cells], randomCellSize, maxWidth, maxHeight);
    const newCell = {
      id: `cell-${i + 1}`,
      initialPosition: position,
      size: randomCellSize,
      color: getRandomColor(),
    };
    cells.push(newCell);
  }

  return cells;
};
