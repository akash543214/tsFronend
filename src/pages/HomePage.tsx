import DataTable from "@/UIcomponents/DataTable/DataTable";
import { useState,useEffect,useCallback } from "react";
import { getTasks } from "@/BackendApi/apiService";
import { Task } from "@/types/common";
import { getColumns } from "../UIcomponents/DataTable/columns";
import KanbanBoard from "@/UIcomponents/KanbanBoard/KanbanBoard";
import { ViewType } from "@/types/common";

const mock:Task[] = [
  {
    _id: "1",
    content: "Design project dashboard",
    isComplete: "InProgress",
    author: "Akash Sharma",
    priority: "High",
    deadline: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
    subTasks: [
      {
        _id: "1-1",
        content: "Create wireframes",
        isComplete: "Complete",
        author: "Akansha",
        priority: "Medium",
        deadline: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
        subTasks: [   {
        _id: "1-1-1",
        content: "Create git",
        isComplete: "Complete",
        author: "Akansha",
        priority: "Medium",
        deadline: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
        subTasks: [ ]
      }]
      },
     
    ]
  },
  {
    _id: "2",
    content: "Setup CI/CD pipeline",
    isComplete: "Incomplete",
    author: "DevOps Bot",
    priority: "Medium",
    deadline: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
    subTasks: []
  }
]

export default function HomePage()
{
     const [taskData, setTaskData] = useState<Task[]>([]); 
     const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState<ViewType>('kanban');


     const getTasksData = useCallback(async () => {  
      setIsLoading(true);
      try {
       // const response = await getTasks();
        setTaskData(mock);

      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally{
        setIsLoading(false);
      }
    }, []);
  
    useEffect(()=>{
        getTasksData();
  
    },[getTasksData,view,setView]);
   
    const columns = getColumns(getTasksData); // pass refresh function here

    return (
      view === 'kanban' ?
      <KanbanBoard data={taskData} isLoading={isLoading} setView={setView}/> :
        <DataTable 
         columns={columns}  
         data={taskData} 
         isLoading={isLoading}
         refreshTable = {getTasksData}
          setView={setView}
         />  
    );
}