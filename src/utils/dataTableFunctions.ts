
import {editTask } from "../BackendApi/apiService";
import { deleteTask } from "../BackendApi/apiService";

type valueType = string | Date;

type editFunctionProps = {
  key:string,
  value:valueType,
  id:number
}

export const editFunction = async ({key,
  value,
  id}:editFunctionProps) => {
  
  console.log(key, value, id);

  try {
   const res= await editTask({ id: id, fieldToUpdate: { [key]: value } });
   console.log(res);
  } catch (error) {
    console.error("Error editing task:", error);
  } finally {
    // getTasksData();
  }
};
  

    export const handleDelete = async (id:number) => {
      try {
        await deleteTask(id);
      } catch (error) {
        console.error("Error deleting task:", error);
      } finally{

      }
    };
  