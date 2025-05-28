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
import { useState } from "react";

interface TaskFormData {
  content: string;
  priority: string;
  deadline: Date;
  isComplete: string;
}

type AddTaskProps = {
  refreshTable: () => void
};

export function AddTask({refreshTable}: AddTaskProps) {
  const [open, setOpen] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    reset, 
    control,
    formState: { errors }, 
  } = useForm<TaskFormData>({
    defaultValues: {
      content: "",
      priority: "",
      deadline: new Date(),
      isComplete: "false"
    }
  });

  const onSubmit = async (data: TaskFormData) => {
    try {
      await addTask(data);
      reset({
        content: "",
        priority: "",
        deadline: new Date(),
        isComplete: "false"
      });
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
    finally {
        refreshTable();
      
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      reset({
        content: "",
        priority: "",
        deadline: new Date(),
        isComplete: "false"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="destructive">Add Task</Button>
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
              <Label htmlFor="content" className="text-right">
                Title
              </Label>
              <div className="col-span-3 flex flex-col">
                <Input 
                  id="content"
                  {...register("content", { required: "Title is required" })} 
                />
                {errors.content && (
                  <p className="text-sm text-red-600 mt-1">{errors.content.message}</p>
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