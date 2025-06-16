import DataTable from "@/UIcomponents/DataTable/DataTable";
import { useState,useEffect,useCallback } from "react";
import { getTasks } from "@/BackendApi/apiService";
import { Task } from "@/types/common";
import { getColumns } from "../UIcomponents/DataTable/columns";
import KanbanBoard from "@/UIcomponents/KanbanBoard/KanbanBoard";
import { ViewType } from "@/types/common";
import { useParams } from "react-router-dom";


export default function TaskPage()
{
     const [taskData, setTaskData] = useState<Task[]>([]); 
     const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState<ViewType>('table');
      const {id} = useParams();

     const getTasksData = useCallback(async () => {  
      setIsLoading(true);
      try {
        const response = await getTasks(Number(id));
        console.log(response);
        setTaskData(response.data);

      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally{
        setIsLoading(false);
      }
    }, [id]);
  
    useEffect(()=>{
        getTasksData();
  
    },[getTasksData,view,setView]);
   
    const columns = getColumns(setTaskData); // pass refresh function here

    return (
      view === 'kanban' ?
      <KanbanBoard data={taskData}
       isLoading={isLoading} 
       setView={setView}/> :
        <DataTable 
         columns={columns}  
         data={taskData} 
         isLoading={isLoading}
         setTaskData = {setTaskData}
          setView={setView}
          projectId={Number(id)}
         />  
    );
}