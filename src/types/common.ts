// src/types/common.ts

export type SubItem = {
    name: string;
    slug?: string;
    active?: boolean;
    shortcut?: string;
    action?: () => void;
  };
  
  export type NavItem = {
    name: string;
    slug?: string;
    active: boolean;
    action?: () => void;
    hasDropdown?: boolean;
    subitems?: SubItem[];
    ariaLabel?: string;
  };
  
  export type ModalType = {
    id: string;
    isOpen: boolean;
    onClose: () => void;
    content: React.ReactNode;
  };
  
  export type Task = {
    _id: string;               
    content: string;
    isComplete: "Incomplete" | "Complete" | "InProgress"; 
    author: string;           
    priority: "Low" | "Medium" | "High"; 
    deadline: Date;         
    subTasks: string[];        
    createdAt: string;         
    updatedAt: string;         
    __v: number;       
  }