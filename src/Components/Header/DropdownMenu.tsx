import { memo } from "react";
import { SubItem } from "../../types/common";


const DropdownMenu = ({ 
  subitems, 
  dropdownRef, 
  isOpen 
}: { 
  subitems: SubItem[], 
  dropdownRef: React.RefObject<HTMLLIElement>,
  isOpen: boolean
}) => {
  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef as any}
      className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10"
      role="menu"
      aria-orientation="vertical"
    >
      {subitems.map(subitem =>
        subitem.active && (
          <button
            key={subitem.slug}
            onClick={subitem.action}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-200"
            role="menuitem"
          >
            {subitem.name}
          </button>
        )
      )}
    </div>
  );
};
export default memo(DropdownMenu);