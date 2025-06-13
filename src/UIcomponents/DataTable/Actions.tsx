import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react"
//import { handleDelete } from "@/utils/dataTableFunctions";
import { deleteTask } from "@/BackendApi/apiService";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Task } from "@/types/common";

  type ActionsProps = {
    row: {
      original: Task;
    },
   refreshTable: () => void
  };

export default function Actions({ row,refreshTable }:ActionsProps )
{
    const task = row.original;
      //console.log("Rendering actions for", row.original);

     const handleDelete = async (id:number) => {
      try {
        await deleteTask(id);
      } catch (error) {
        console.error("Error deleting task:", error);
      } finally{
          refreshTable();
      }
    };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={()=> handleDelete(task.id)}> 
              Delete
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
}