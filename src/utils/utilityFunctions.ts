
//import {updateTask } from "../BackendApi/apiService";
import { AppDispatch } from "@/store/store";
import { deleteTask } from "../BackendApi/apiService";
import { tasksApi, useUpdateTaskMutation,useCreateTaskMutation } from "@/store/api/tasksApi";
import { TaskFormData } from "@/types/common";

type handleUpdateTaskProps = {
  key:string,
  value:string | Date,
  taskId:number,
  projectId:number,
  dispatch: AppDispatch, // Replace with the correct type for your dispatch function
  updateTask: ReturnType<typeof useUpdateTaskMutation>[0];
}

type handleAddTaskProps = {
  taskData: TaskFormData, // Replace with the correct type for your task data
  projectId:number,
  dispatch: AppDispatch, // Replace with the correct type for your dispatch function
  addTask: ReturnType<typeof useCreateTaskMutation>[0];
}
function updateTaskInTree(tasks: any[], taskId: number, key: string, value: string | Date): boolean {
  for (const task of tasks) {
    if (task.id === taskId) {
      task[key] = value;
      return true;
    }
    if (task.subtasks?.length) {
      const found = updateTaskInTree(task.subtasks, taskId, key, value);
      if (found) return true;
    }
  }
  return false;
}

export const handleUpdateTask = async ({key,
  value,
  taskId,
  projectId,
  dispatch,
  updateTask
}:handleUpdateTaskProps) =>
   {
  // Optimistically update the local cache
  
   const patchResult = dispatch(
    tasksApi.util.updateQueryData("getTasks", projectId, (draft) => {
        updateTaskInTree(draft, taskId, key, value);

    })
  );
  
  try {
   //const res= await updateTask({fieldToUpdate: { [key]: value },taskId });
    const res = await updateTask({
      taskId,
      fieldToUpdate: { [key]: value }
    }).unwrap();

    console.log("Task updated successfully:", res);
    // You can also update your local state or perform any other actions here

  } catch (error) {
    console.error("Error updating task:", error);
       patchResult.undo(); // rollback

  } 
};
  
export const handleAddTask = async ({
  taskData,
  projectId,
  dispatch,
  addTask
}:handleAddTaskProps) =>
   {
  // Optimistically update the local cache
  
  // const patchResult = dispatch(
    //tasksApi.util.updateQueryData("getTasks", projectId, (draft) => {
      //  updateTaskInTree(draft, taskId, key, value);
      
    //})
  //);
  
  try {
   //const res= await updateTask({fieldToUpdate: { [key]: value },taskId });
    const res = await addTask({
     taskData,
      projectId
    }).unwrap();

    console.log("Task updated successfully:", res);
    // You can also update your local state or perform any other actions here

  } catch (error) {
    console.error("Error updating task:", error);
     //  patchResult.undo(); // rollback

  } 
};
    export const handleDelete = async (id:number) => {
      try {
        await deleteTask(id);
      } catch (error) {
        console.error("Error deleting task:", error);
      } 
    };

  