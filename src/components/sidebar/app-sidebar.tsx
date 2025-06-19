
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


import DropDownAction from "./DropDownAction";
import { useNavigate } from 'react-router-dom';
// Menu items.
import { projectData } from "@/types/common";
import { AddProject } from "./AddProject";
import SideBarItems from "./SideBarItems";
import {
  useFetchProjectsQuery,
 // useDeleteProjectMutation,
} from '@/store/api/projectsApi';
import { useSelector } from "react-redux";
 import type { RootState } from '@/store/store';


export function AppSidebar() {


       const navigate = useNavigate();
       const  user  = useSelector((state: RootState) => state.auth); 


const {
    data: projects,
    isError: fetchError,
    error: fetchErrorDetails,
  } = useFetchProjectsQuery({ userId: user.userData?.id });


console.log("Projects:", projects);
  //const [deleteProject, { isLoading: deleting, isError: deleteError, error: deleteErrorDetails }] =
  //  useDeleteProjectMutation();

  /*
  const handleDelete = async (id: number) => {
    try {
      await deleteProject(id).unwrap();
    } catch (err) {
      console.error('Delete error:', err);
    }
  }; */
   
   
     
  return (
    <Sidebar className=" h-screen">
      <SidebarContent className="pt-12">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
      {fetchError && <p>Error loading projects: {JSON.stringify(fetchErrorDetails)}</p>}

        <SideBarItems />
        </SidebarGroup>
        <SidebarGroup>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarGroupAction title="Add Project">
         <span className="sr-only">Add Project</span>
         <AddProject />
      </SidebarGroupAction>
      <SidebarGroupContent >
        <SidebarMenu>
          { projects?.map((project:projectData) => (
            <SidebarMenuItem key={project.id}>
              <SidebarMenuButton asChild>
                  <span className="cursor-pointer"
                     onClick={()=>navigate(`/task/${project.id}`)}>
                    {project.title}
                    </span>
                   
              </SidebarMenuButton>
              
            <DropDownAction />
            </SidebarMenuItem>
            
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
