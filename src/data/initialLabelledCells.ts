import { LabelledCell } from '../types';

export const initialLabelledCells: LabelledCell[] = [
  { id: 'cv', label: 'CV', initialPosition: { x: 200, y: 200 }, size: 40, color: '#f39c12' },
  { id: 'experience', label: 'Experience', initialPosition: { x: 900, y: 100 }, size: 100, color: '#e74c3c' },
  { id: 'contact', label: 'Contact', initialPosition: { x: 100, y: 800 }, size: 60, color: '#8e44ad' },
  { id: 'tech-stack', label: 'Tech Stack', initialPosition: { x: 1800, y: 140 }, size: 100, color: '#3498db' },
  { id: 'projects', label: 'Projects', initialPosition: { x: 1000, y: 800 }, size: 110, color: '#2ecc71' },
];
