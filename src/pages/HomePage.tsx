import DataTable from "@/UIcomponents/DataTable/DataTable";
import { useState,useEffect,useCallback } from "react";
import { getTasks } from "@/BackendApi/apiService";
import { Task } from "@/types/common";
import { getColumns } from "../UIcomponents/DataTable/columns";
import KanbanBoard from "@/UIcomponents/KanbanBoard/KanbanBoard";


type ViewType = 'table' | 'kanban';

export default function HomePage()
{
     const [taskData, setTaskData] = useState<Task[]>([]); 
     const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState<ViewType>('kanban');


     const getTasksData = useCallback(async () => {  
      try {
        const response = await getTasks();
        setTaskData(response);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally{
        setIsLoading(false);
      }
    }, []);
  
    useEffect(()=>{
        getTasksData();
  
    },[getTasksData]);
   
    const columns = getColumns(getTasksData); // pass refresh function here

    return (
      view === 'kanban' ?
      <KanbanBoard data={taskData}/> :
        <DataTable 
         columns={columns}  
         data={taskData} 
         isLoading={isLoading}
         refreshTable = {getTasksData}
         />  
    );
}