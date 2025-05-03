import { memo } from "react";
import Button from "../Assets/Button";
import DownArrow from "../Assets/DownSvg";
import DropdownMenu from "./DropdownMenu";
import { NavItem } from "../../types/common";

  
const NavItemComponent = ({ 
    item, 
    dropdownOpen, 
    dropdownRef 
  }: { 
    item: NavItem, 
    dropdownOpen: boolean,
    dropdownRef: React.RefObject<HTMLLIElement>
    
  }) => {
    
    return (
      <li ref={dropdownRef} className={item.hasDropdown ? "relative ml-2" : "ml-2"}>
        <Button
          variant={item.hasDropdown ? "outline" : "primary"}
          onClick={item.action}
          aria-label={item.ariaLabel || item.name}
          aria-haspopup={item.hasDropdown ? "true" : undefined}
          aria-expanded={item.hasDropdown ? dropdownOpen : undefined}
        >
          <span className="flex items-center">
            {item.name}
            {item.hasDropdown && <DownArrow isOpen={dropdownOpen} aria-hidden="true" />}
          </span>
        </Button>
  
        {item.hasDropdown && (
          <DropdownMenu 
            subitems={item.subitems || []} 
            dropdownRef={dropdownRef}
            isOpen={dropdownOpen}
          />
        )}
      </li>
    );
  };

  export default memo(NavItemComponent);