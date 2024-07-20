export interface LabelledCell {
    id: string;
    label: string;
    initialPosition: { x: number; y: number };
    size: number;
    color: string;
  }
  
  export interface UnlabelledCell {
    id: string;
    initialPosition: { x: number; y: number };
    size: number;
    color: string;
  }
  
  export type Cell = LabelledCell | UnlabelledCell;
  