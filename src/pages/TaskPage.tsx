import DataTable from "@/components/DataTable/DataTable";
import { useState,useEffect,useCallback } from "react";
import { Task } from "@/types/common";
import { getColumns } from "../components/DataTable/columns";
import { ViewType } from "@/types/common";
import { useParams } from "react-router-dom";
import KanbanBoard from "@/components/KanbanBoard/KanbanBoard";
import { useGetTasksQuery } from "@/store/api/tasksApi";

export default function TaskPage()
{
        const {id} = useParams();
const { data: tasksData = [], isLoading } = useGetTasksQuery(Number(id));

     const [taskData, setTaskData] = useState<Task[]>([]); 
   //  const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState<ViewType>('table');

console.log("taskdata",tasksData);

     const getTasksData = useCallback(async () => {  
      //setIsLoading(true);
      try {
       // const response = await getTasks(Number(id));
       // console.log(response);
        setTaskData(tasksData);

      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally{
       // setIsLoading(false);
      }
    }, [id]);
  
    useEffect(()=>{
        getTasksData();
  
    },[getTasksData,view,setView]);
   
    const columns = getColumns(setTaskData,Number(id)); // pass refresh function here

    return (
      view === 'kanban' ?
      <KanbanBoard data={taskData}
       isLoading={isLoading} 
       setView={setView}/> :
        <DataTable 
         columns={columns}  
         data={tasksData} 
         isLoading={isLoading}
          setView={setView}
          projectId={Number(id)}
         />  
    );
}