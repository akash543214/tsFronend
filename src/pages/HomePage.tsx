import DataTable from "@/Components/DataTable/DataTable";
import { useState,useEffect,useCallback } from "react";
import { getTasks } from "@/BackendApi/apiService";
import { Task } from "@/types/common";
import { getColumns } from "../Components/DataTable/columns";

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
   
    const columns = getColumns(getTasksData); // pass refresh function here

    return (
      
        <DataTable columns={columns}  
         data={taskData} 
         isLoading={isLoading}
         refreshTable = {getTasksData}
         />  
    );
}