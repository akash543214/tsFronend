// src/types/common.ts

export type SubItem = {
    name: string;
    slug?: string;
    active?: boolean;
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
  