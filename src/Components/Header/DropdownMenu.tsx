import { memo,useRef,useState } from "react";
import { SubItem } from "../../types/common";
import useClickOutside from "../../CustomHooks/useClickOutside";
//import Button from "../Assets/Button";
import DownArrow from "../Assets/DownSvg";
import { Button } from "@/components/ui/button";
const DropdownMenu = ({ 
  subitems, 
  title
}: { 
  subitems: SubItem[], 
  title: string
}) => {

    const [dropdown, setDropdown] = useState(false);
   const dropdownRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropdownRef,()=>setDropdown(false));

  return (
      <div ref={dropdownRef} className="relative">
    <Button
    variant="outline"
    onClick={()=>setDropdown(prev=>!prev)}>
      
    <span className="flex items-center">
      {title}
      <DownArrow isOpen={dropdown} 
      aria-hidden="true" />
    </span>
  </Button>
   { dropdown && <div
      
      onClick={() => setDropdown(prev => !prev)}
      className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10"
      role="menu"
      aria-orientation="vertical"
    >
      {subitems.map(subitem =>
        subitem.active && (
          <button
            key={subitem.name}
            onClick={subitem.action}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-200"
            role="menuitem"
          >
            {subitem.name}
          </button>
        )
      )}
    </div>}
    </div>
  );
};
export default memo(DropdownMenu);