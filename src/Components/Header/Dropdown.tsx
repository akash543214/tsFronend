import { Button } from "@/components/ui/button";
import { SubItem } from "../../types/common";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Dropdown({ 
  subitems, 
  title
}: { 
  subitems: SubItem[], 
  title: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{title}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {
          subitems.map((item) => (
            <DropdownMenuItem key={item.slug} onClick={item.action}>
              {item.name}
              {item.shortcut && (
                <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
              )}
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
