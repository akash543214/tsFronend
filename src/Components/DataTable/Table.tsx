import TaskComponent from "./TaskComponent";
import LoadScreen from "../Assets/LoadScreen";

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

export default function Table(tableProps: { 
  isLoading: boolean; 
  taskData: Task[]; 
  getTasksData: () => void; })
   {
      const tableHeaders = ['Title', 'Status', 'Priority', 'Deadline', 'Action'];
      
      const {taskData,isLoading,getTasksData} = tableProps;

  if (isLoading) {
    return (
     <LoadScreen />
    );
  }
    return(
  <table className="min-w-full table-auto">

              {/* Table Header */}
            <thead>
              <tr className="bg-gray-100">
                {  tableHeaders.map((title,index) => (
                        <th key={index} className="px-4 py-2 text-left text-gray-600">{title}</th>
                    ))}
                 </tr>
            </thead>
            <tbody>

              {/* Task Row with Dropdown for Subtasks */}
           {taskData.length===0?(<tr>
            <td colSpan={tableHeaders.length} 
            className="text-center py-4 text-gray-500">
            No tasks available. Create a new task to get started!
            </td>
          </tr>): (taskData.map((item,index)=> 
          <TaskComponent key={index} 
            task={item} 
            getTasksData={getTasksData}/>))}    
            </tbody>
          </table>
    );
}