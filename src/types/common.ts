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
  

  /*
  export type Task = {
    _id: string;               
    content: string;
    isComplete: "Incomplete" | "Complete" | "InProgress"; 
    author: string;           
    priority: "Low" | "Medium" | "High"; 
    deadline: Date;         
    subTasks: Task[];        
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

  */




export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED"
}

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT"
}

enum AuthProvider {
  LOCAL = "local",
  GOOGLE = "google"
}

export type Task = {
  id: number;
  title: string;
  content: string;
  project_id: number;
  owner_id: number;
  parent_task_id?: number | null;
  assignee_id?: number | null;
  status: TaskStatus;
  priority: TaskPriority;
  deadline: Date | string;
  created_at: Date;
  subtasks?: Task[];
};

export type UserData = {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  provider: AuthProvider;
  googleId: string | null; 
};

export type projectData = {
  id:number,
  title:string,
  description:  String,
  user_id:    number,
  created_at:  Date
}

export type TaskFormData = {
  title: string;
  content:string;
  priority: TaskPriority;
  deadline: Date;
  status: TaskStatus;
  parent_task_id?: number; // Optional, if needed for sub-tasks
}
  export type TaskStatusType = Task['status'];
  export type ViewType = 'table' | 'kanban';
