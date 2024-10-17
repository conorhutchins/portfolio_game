// utils/cellUtils.ts

import { LabelledCell, Cell } from '../types';

export function adjustInitialLabelledCellPositions(cells: LabelledCell[], viewportWidth: number, viewportHeight: number, isMobile: boolean): LabelledCell[] {
  return cells.map(cell => {
    const maxX = viewportWidth - cell.size;
    const maxY = viewportHeight - cell.size;
    const adjustedSize = isMobile ? cell.size * 0.75 : cell.size; // Reduce size by 25% on mobile
    
    return {
      ...cell,
      size: adjustedSize,
      initialPosition: {
        x: Math.min(Math.max(0, cell.initialPosition.x), maxX),
        y: Math.min(Math.max(0, cell.initialPosition.y), maxY)
      }
    };
  });
}

export function updateBounceLogic(cells: Cell[], viewportWidth: number, viewportHeight: number): Cell[] {
  return cells.map(cell => {
    const maxX = viewportWidth + cell.size / 2;  // Allow bouncing out by half the cell's size
    const maxY = viewportHeight + cell.size / 2; // Allow bouncing out by half the cell's size
    return {
      ...cell,
      initialPosition: {
        x: ((cell.initialPosition.x % maxX) + maxX) % maxX,
        y: ((cell.initialPosition.y % maxY) + maxY) % maxY
      }
    };
  });
}

export function createNewConsumableCell(id: string, viewportWidth: number, viewportHeight: number): Cell {
  return {
    id,
    initialPosition: {
      x: Math.random() * viewportWidth,
      y: Math.random() * viewportHeight
    },
    size: Math.random() * (25 - 20) + 20, // Random size between 20 and 50
    color: `#${Math.floor(Math.random()*16777215).toString(16)}` // Random color
  };
}