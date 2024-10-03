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
  
  export type Experience = {
    role: string;
    company: string;
    startDate: string;
    endDate: string;
    logo: string;
    logoBg: string;
    description: string[];
  };
  
  export type Technologies = {
    name: string;
    icon: string;
    category: string;
  };
  
  export type Project = {
    name: string;
    image: string;
    link: string;
    repo: string;
    techStack: string[];
    comingSoon?: boolean;
  };