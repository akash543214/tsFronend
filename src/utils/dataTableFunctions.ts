
import {editTask } from "../BackendApi/apiService";
import { deleteTask } from "../BackendApi/apiService";

export const editFunction = async (key: string,value: string,_id:string) => {
    try {
      await editTask({ id: _id, fieldToUpdate: { [key]: value } });
    } catch (error) {
      console.error("Error editing task:", error);
    } finally {
     // getTasksData();
      
    }
  };

    export const handleDelete = async (_id:string) => {
      try {
        await deleteTask(_id);
      } catch (error) {
        console.error("Error deleting task:", error);
      } 
    };
  