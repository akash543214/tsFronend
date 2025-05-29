import { memo } from "react";
import { SubItem } from "../../types/common";
import  {Dropdown} from "./Dropdown";

const DropdownMenu = ({ 
  subitems, 
  title
}: { 
  subitems: SubItem[], 
  title: string
}) => {


  return (
    <Dropdown title={title} subitems={subitems}/>
  );
};
export default memo(DropdownMenu);