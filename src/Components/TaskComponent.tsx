import { useState,useRef,useEffect } from 'react';
import { deleteTask, editTask } from '../BackendApi/apiService';
import Editsvg from './Assets/Editsvg';
import Dropdown from './Assets/Dropdown';

type taskdata = {  content: string; 
  deadline: string; 
  _id: string; 
  isComplete: string; 
  priority: string; 
};


export default function TaskComponent(_props: 
  { task: taskdata; 
    getTasksData: () => void; }) 
{
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(_props.task.content);
  const [date,setDate] = useState(_props.task.deadline);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDelete = async () => {
    try {
      await deleteTask(_props.task._id);
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      _props.getTasksData();
    }
  };

  const editFunction = async (key: string,value: string) => {
    try {
      await editTask({ id: _props.task._id, fieldToUpdate: { [key]: value } });
    } catch (error) {
      console.error("Error editing task:", error);
    } finally {
      _props.getTasksData();
      setIsEditing(false);
    }
  };

  const handleEdit = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
  
    if (!_props.task?._id) {
      console.error("Task ID is missing");
      return;
    }

    if(task===_props.task.content)
    {
      setIsEditing(false);
      return;
    }

   editFunction("content",task);
  };
  

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);


  return (
    <>
      <tr
        className="border-b hover:bg-gray-50 transition-colors"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <td className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button className="mr-2 cursor-pointer focus:outline-none">
        
              </button>
              <span className={`cursor-pointer text-gray-500 font-semibold ${isEditing ? 'border-b border-gray-400' : ''}`}>
                <input className={`${!isEditing?'cursor-pointer':''}`}
                 onChange={(e)=>setTask(e.target.value)} 
                 ref={inputRef} type="text" value={task} 
                 disabled={!isEditing}></input>
                </span>
            </div>


            {isHovered && (
              <button
                onClick={()=>handleEdit()}
                className="flex items-center justify-center bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors"
                title="Edit Task"
              >
               <Editsvg />
              </button>
            )}
          </div>
        </td>
        <td className={`px-4 py-3 cursor-pointer`}>
          
          <Dropdown 
          options={["Pending", "InProgress", "Completed"]} 
          selected={_props.task.isComplete} 
          isHovered={isHovered} 
          taskFunction={editFunction} 
          type="isComplete"/>
          
          </td>
        <td className={`px-4 py-3 cursor-pointer`}>
        <Dropdown options={["Medium", "High", "Low"]} 
        selected={_props.task.priority} 
        isHovered={isHovered} 
        taskFunction={editFunction} 
        type="priority"/>
          </td>
        <td className={`px-4 py-3 cursor-pointer`}>
          <input type="date"
           onChange={(e)=>{
            setDate(e.target.value);
            editFunction('deadline',e.target.value);
            
          }} 
           className="cursor-pointer text-gray-500 font-semibold" value={date}></input>
          </td>

        <td className="px-4 py-3">
         <Dropdown options={["Delete"]} selected="..." taskFunction={handleDelete} type="delete"/>
        </td>
      </tr>
    </>
  );
}
