import { Calendar,
   Home, 
   Inbox,
   MoreHorizontal,
   Search, 
   Settings,
   UserRoundCog
   } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { useNavigate } from 'react-router-dom';
import { useCallback } from "react";
// Menu items.
import { useState } from "react";
import { projectData } from "@/types/common";
import { useEffect } from "react";
//import { getProjects } from "@/BackendApi/apiService";
import { AddProject } from "./AddProject";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchProjects, createProject, deleteProject } from '../../store/projectSlice';



export function AppSidebar() {


    const navigate = useNavigate();
       
   const handleHomeClick = useCallback(() => {
     
      navigate('/home');
    }, [navigate]);
    
    const handleProfileClick = useCallback(() => {
     
      navigate('/profile');
    }, [navigate]);
    


    // Fetch projects from the Redux store
     const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.projects);

  //const [newTitle, setNewTitle] = useState('');
  //const [newDesc, setNewDesc] = useState('');

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  /*
  const handleCreate = () => {
    dispatch(createProject({ title: newTitle, description: newDesc }));
    setNewTitle('');
    setNewDesc('');
  };
*/
 // const handleDelete = (id: number) => {
  //  dispatch(deleteProject(id));
  //};

    /*
      const [projects, setProjects] = useState<projectData[]>([]);

         const fetchProjects = useCallback(async () => {  
              try {
                const response = await getProjects();
             //   console.log(response.data)
                
                 setProjects(response.data);
              } catch (error) {
                console.error("Error fetching tasks:", error);
              } 
            }, []);
          
            useEffect(()=>{
                fetchProjects();
          
            },[]);
           */
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
    <Sidebar className="my-12">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
       {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

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
        </SidebarGroup>
        <SidebarGroup>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarGroupAction title="Add Project">
         <span className="sr-only">Add Project</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          { items.map((project:projectData) => (
            <SidebarMenuItem key={project.id}>
              <SidebarMenuButton asChild>
                  <span className="cursor-pointer"
                     onClick={()=>navigate(`/task/${project.id}`)}>
                    {project.title}
                    </span>
                   
              </SidebarMenuButton>
              
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
        <span>Delete Project</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
            </SidebarMenuItem>
            
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
