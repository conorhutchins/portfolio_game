import { Cell, LabelledCell } from '../types';

export const isLabelledCell = (cell: Cell): cell is LabelledCell => 'label' in cell;
