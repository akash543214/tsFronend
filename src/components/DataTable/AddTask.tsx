import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addTask } from "@/BackendApi/apiService";
import { SelectPriority } from "./SelectPriority";
import { DatePicker } from "./DatePicker";
import { useForm, Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import { Task, TaskStatus } from "@/types/common";
import { TaskPriority } from "@/types/common";
interface TaskFormData {
  title: string;
  content:string;
  priority: TaskPriority;
  deadline: Date;
  status: TaskStatus;
  parent_task_id?: number; // Optional, if needed for sub-tasks
}

type AddTaskProps = {
  setTaskData: Dispatch<SetStateAction<Task[]>>,
  projectId:number,
  parentId?: number,
  trigger?: React.ReactNode
};

export function AddTask({setTaskData,projectId,parentId,trigger}: AddTaskProps) {
  const [open, setOpen] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    reset, 
    control,
    formState: { errors }, 
  } = useForm<TaskFormData>({
    defaultValues: {
      title: "",
      content:"",
      priority: TaskPriority.MEDIUM,
      deadline: new Date(),
      status: TaskStatus.PENDING,
      parent_task_id: parentId // Set parentId if provided
    }
  });

  const onSubmit = async (data: TaskFormData) => {


    try {
      const newTask = await addTask(data, projectId);

          console.log("New task added:", newTask.data);
          const parentTask = newTask.data.parent_task_id;

          if(!parentTask) {   
            // If it's a main task, add it directly to the task data
            setTaskData(prev => [...prev, newTask.data]);
          }
          else {
            console.log("Adding subtask to parent task:", parentId);

              setTaskData(prev=>{
                // Find the parent task and add the new subtask to it
                  const newTaskData = [...prev];

                    newTaskData.forEach(task=>{
                  if(task.id===newTask.data.parent_task_id)
                  {  
                    if(!task.subtasks)
                       {
                      task.subtasks = [];
                    }
                    task.subtasks.push(newTask.data);
                   
                  }
                  else{
                    if(task.subtasks)
                    {
                      task.subtasks.forEach(subtask=>{
                        if(subtask.id===newTask.data.parent_task_id)
                        {
                          if(!subtask.subtasks)
                          {
                            subtask.subtasks = [];
                          }
                          subtask.subtasks.push(newTask.data);
                        }
                      }
                    )
                    }
                  }
                  
                })
                return newTaskData;
              })
          }
         

      reset({
        title: "",
        priority: TaskPriority.MEDIUM,
        deadline: new Date(),
        status: TaskStatus.PENDING,
        parent_task_id: parentId 
      });

      setOpen(false);

    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      reset({
       title: "",
      priority: TaskPriority.MEDIUM,
      deadline: new Date(),
      status: TaskStatus.PENDING,
      parent_task_id: parentId 
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
       
       {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Add task details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {/* Title Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <div className="col-span-3 flex flex-col">
                <Input 
                  id="title"
                  {...register("title", { required: "Title is required" })} 
                />
                {errors.title && (
                  <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
                )}  
              </div>
            </div>

            {/* Priority Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <div className="col-span-3 flex flex-col">
                <Controller
                  name="priority"
                  control={control}
                  rules={{ required: "Priority is required" }}
                  render={({ field }) => (
                    <SelectPriority 
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  )}
                />
                {errors.priority && (
                  <p className="text-sm text-red-600 mt-1">{errors.priority.message}</p>
                )} 
              </div>
            </div>

            {/* Deadline Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deadline" className="text-right">
                Deadline
              </Label>
              <div className="col-span-3 flex flex-col">
                <Controller
                  name="deadline"
                  control={control}
                  rules={{ required: "Deadline is required" }}
                  render={({ field }) => (
                    <DatePicker 
                      date={field.value}
                      onDateChange={field.onChange}
                    />
                  )}
                />
                {errors.deadline && (
                  <p className="text-sm text-red-600 mt-1">{errors.deadline.message}</p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}