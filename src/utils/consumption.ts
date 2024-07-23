import { Cell, LabelledCell } from '../types';
import { isLabelledCell } from './helpers';
import { CONFIG } from './config';

export const handleMainCellConsume = (
  allCells: Cell[],
  setAllCells: React.Dispatch<React.SetStateAction<Cell[]>>,
  setMainCellSize: React.Dispatch<React.SetStateAction<number>>,
  setConsumedByMainCell: React.Dispatch<React.SetStateAction<LabelledCell | null>>,
  id: string,
  cellSize: number
) => {
  const cell = allCells.find(cell => cell.id === id);
  if (cell && isLabelledCell(cell)) {
    setConsumedByMainCell(cell);
    if (cell.label === 'C.V') {
      window.open('https://docs.google.com/document/d/1_mCPPCm-o1bl1O-s_qwoy6YYP0L4V-Ty4BldaSQCDis/edit?usp=sharing', '_blank');
    }
  }
  setMainCellSize(prevSize => prevSize + cellSize / 2);
  setAllCells(prevCells => prevCells.filter(cell => cell.id !== id));
};

export const handleLabelledCellConsume = (
  allCells: Cell[],
  setAllCells: React.Dispatch<React.SetStateAction<Cell[]>>,
  consumerId: string,
  consumedId: string,
  consumedSize: number
) => {
  setAllCells(prevCells => {
    return prevCells.map(cell => {
      if (cell.id === consumerId && isLabelledCell(cell)) {
        return {
          ...cell,
          size: cell.size + consumedSize / 2,
          lastUpdated: Date.now(), // Add a timestamp to force re-render
        };
      }
      return cell;
    }).filter(cell => cell.id !== consumedId);
  });
};
