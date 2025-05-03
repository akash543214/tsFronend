import {useState, useEffect, useCallback} from 'react';
import { getTasks } from '../BackendApi/apiService';
import Table from './DataTable/Table';
import NewTask from './DataTable/NewTask';
import PaginationUI from './DataTable/PaginationUI';

 interface Task {
  _id: string;               
  content: string;
  isComplete: "Incomplete" | "Complete"; 
  author: string;           
  priority: "Low" | "Medium" | "High"; 
  deadline: string;         
  subTasks: string[];        
  createdAt: string;         
  updatedAt: string;         
  __v: number;               
 }


const TaskManagerUI = () => {

    const [taskData, setTaskData] = useState<Task[]>([]); // Task Data from API
    const [isLoading, setIsLoading] = useState(true);
    
  const getTasksData = useCallback(async () => {  
    try {
      const response = await getTasks();
      setTaskData(response);
      console.log("Task Data:", response);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally{
      setIsLoading(false);
    }
  }, []);

  useEffect(()=>{
      getTasksData();

  },[]);

  
  return (
            <main className="min-h-screen flex-grow">

    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">

          {/* Add New Task Component */}
    <div className="mb-6 flex justify-end">
        <NewTask getTasksData={getTasksData}/>
      </div>


        {/* Task Table Component*/}
        <div className="p-6">
           <Table 
            getTasksData={getTasksData} 
            taskData={taskData}
             isLoading={isLoading}/>


          {/* Pagination UI Component*/}
        <PaginationUI />
        </div>
      </div>
    </div>
    </main>
  );
};

export default TaskManagerUI;
