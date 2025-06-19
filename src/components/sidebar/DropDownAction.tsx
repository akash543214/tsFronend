
import { 
   MoreHorizontal,
   } from "lucide-react"

import {

  SidebarMenuAction,

} from "@/components/ui/sidebar"

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import {
  useDeleteProjectMutation,
} from '@/store/api/projectsApi';

type props = {
  projectId: number;
};

export default function DropDownAction({projectId}:props) 

    {

        const [deleteProject] =
         useDeleteProjectMutation();
      
        
        const handleDelete = async () => {
          try {
            await deleteProject(projectId).unwrap();
          } catch (err) {
            console.error('Delete error:', err);
          }
        }; 
         

        return (
 <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <SidebarMenuAction>
        <MoreHorizontal />
      </SidebarMenuAction>
    </DropdownMenuTrigger>
    <DropdownMenuContent side="right" align="start">
      <DropdownMenuItem>
        <span>Edit Project</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <span onClick={handleDelete}>Delete Project</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
        );
    }