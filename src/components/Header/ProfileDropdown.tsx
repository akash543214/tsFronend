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
import { RootState } from "@/store/store";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
    

type ProfileDropdownProps = {
handleLogout?: () => void;
}

export default function ProfileDropdown({handleLogout}: ProfileDropdownProps)
{
  const navigate = useNavigate();
const user = useSelector((state: RootState) => state.auth.userData);

  const handleProfileClick = useCallback(() => {
   
    navigate('/profile');
  }, [navigate]);

    const profileItems =  [
      {
        name: "Profile",
        slug: "/profile",
        active: true,
        shortcut: "⌘P",
        action: handleProfileClick
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
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
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