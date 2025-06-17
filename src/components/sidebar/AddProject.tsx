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
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import { addProject } from "@/BackendApi/apiService";
import { Plus } from "lucide-react";
import { projectData } from "@/types/common";

interface TaskFormData {
  title: string;
  content:string;
}

type AddProjectProps = {
  setProjects: Dispatch<SetStateAction<projectData[]>>,
};
export function AddProject({setProjects}: AddProjectProps) {
  const [open, setOpen] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors }, 
  } = useForm<TaskFormData>({
    defaultValues: {
      title: "",
      content:"",
    }
  });

  const onSubmit = async (data: TaskFormData) => {
    try {
      const newProject = await addProject(data);

      setProjects(prev => [...prev, newProject.data]);
      
      reset({
        title: "",
        content: "",
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
         content: "",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
          <Plus />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Project</DialogTitle>
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

            {/* Content Field */}
           <div className="grid gap-4 py-4">
            {/* Title Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Derscription
              </Label>
              <div className="col-span-3 flex flex-col">
                <Input 
                  id="content"
                  {...register("content", { required: "Content is required" })}
                />
                {errors.title && (
                  <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
                )}  
              </div>
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