import DataTable from "@/Components/shadDataTable/DataTable";
import { useState,useEffect,useCallback } from "react";
import { getTasks } from "@/BackendApi/apiService";
import {columns} from '../Components/shadDataTable/columns';
import { Task } from "@/types/common";
//import TaskManagerUI from "../Components/TaskManagerUI";
export default function HomePage()
{
     const [taskData, setTaskData] = useState<Task[]>([]); 
     const [isLoading, setIsLoading] = useState(true);

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
   

    return (
      
        <DataTable columns={columns}  
         data={taskData} 
         isLoading={isLoading}
         />  
    );
}