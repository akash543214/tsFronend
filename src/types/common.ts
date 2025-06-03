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
    createdAt: Date;         
    updatedAt: Date;         
    __v: number;       
  }

  export type UserData = {
    _id: string;
    name: string;
    email: string;
    googleId: string;
    provider: "google" | "local"; 
    createdAt: Date; 
    updatedAt: Date; 
    __v: number;
  }