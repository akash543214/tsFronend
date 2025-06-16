
import {updateTask } from "../BackendApi/apiService";
import { deleteTask } from "../BackendApi/apiService";

type handleUpdateTaskProps = {
  key:string,
  value:string | Date,
  taskId:number
}

export const handleUpdateTask = async ({key,
  value,
  taskId
}:handleUpdateTaskProps) => {
  

  try {
   const res= await updateTask({fieldToUpdate: { [key]: value },taskId });
   console.log(res);

  } catch (error) {
    console.error("Error updating task:", error);
  } 
};
  
    export const handleDelete = async (id:number) => {
      try {
        await deleteTask(id);
      } catch (error) {
        console.error("Error deleting task:", error);
      } 
    };
  