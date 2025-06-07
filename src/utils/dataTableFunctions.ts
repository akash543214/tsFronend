
import {editTask } from "../BackendApi/apiService";
import { deleteTask } from "../BackendApi/apiService";

type valueType = string | Date;

type editFunctionProps = {
  key:string,
  value:valueType,
  _id:string
}


export const editFunction = async ({key,
  value,
  _id}:editFunctionProps) => {
  
  console.log(key, value, _id);

  try {
   const res= await editTask({ id: _id, fieldToUpdate: { [key]: value } });
   console.log(res);
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
      } finally{

      }
    };
  