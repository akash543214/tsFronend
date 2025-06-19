import { Calendar,
   Home, 
   Inbox,
   Search, 
   Settings,
   UserRoundCog
   } from "lucide-react"

import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


import { useNavigate } from 'react-router-dom';
import { useCallback } from "react";



export default function SideBarItems() {



    const navigate = useNavigate();
       
   const handleHomeClick = useCallback(() => {
     
      navigate('/home');
    }, [navigate]);
    
    const handleProfileClick = useCallback(() => {
     
      navigate('/profile');
    }, [navigate]);
    
     const item = [
          {
            title: "Home",
            url: "#",
            icon: Home,
            action: handleHomeClick
          },
          {
            title: "Profile",
            url: "#",
            icon: UserRoundCog,
            action: handleProfileClick
          },
          {
            title: "Inbox",
            url: "#",
            icon: Inbox,
          },
          {
            title: "Calendar",
            url: "#",
            icon: Calendar,
          },
          {
            title: "Search",
            url: "#",
            icon: Search,
          },
          {
            title: "Settings",
            url: "#",
            icon: Settings,
          }
          
        ]
  return (
     <SidebarGroupContent>
            <SidebarMenu>
              {item.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button onClick={item.action}>
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
  );
}