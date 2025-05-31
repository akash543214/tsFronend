import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { user } from "@/types/common";

type ProfileDropdownProps = {
userData?: user | null;
handleLogout?: () => void;
}

export default function ProfileDropdown({userData,handleLogout}: ProfileDropdownProps)
{
    const profileItems =  [
      {
        name: "Profile",
        slug: "/profile",
        active: true,
        shortcut: "⌘P",
        
      },
      {
        name: "Logout",
        slug: "#",
        active: true,
        shortcut:"⇧⌘Q",
        action: handleLogout
      }

    ];
    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@user"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{userData?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {
          profileItems.map((item) => (
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
    );
}