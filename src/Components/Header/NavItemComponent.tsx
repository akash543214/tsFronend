import { memo } from "react";
import Button from "../Assets/Button";
import DropdownMenu from "./DropdownMenu";
import { NavItem } from "../../types/common";


const NavItemComponent = ({ 
    item, 
  }: { 
    item: NavItem, 
    
  }) => {

    return (
      <li className={item.hasDropdown ? "relative ml-2" : "ml-2"}>
      { !item.hasDropdown && <Button
          variant={item.hasDropdown ? "outline" : "primary"}
          onClick={item.action}
         // aria-label={item.ariaLabel || item.name}
         // aria-haspopup={item.hasDropdown ? "true" : undefined}
        //  aria-expanded={item.hasDropdown ? dropdown : undefined}
        >
          <span className="flex items-center">
            {item.name}
    
          </span>
        </Button>}
  
        {item.hasDropdown && (
          <DropdownMenu 
            subitems={item.subitems || []} 
            title = {item.name}
          />
        )}
      </li>
    );
  };

  export default memo(NavItemComponent);