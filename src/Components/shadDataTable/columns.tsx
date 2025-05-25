import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ChevronDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// This type is used to define the shape of our data.
// You can use a Zod schema `here if you want.

export type Task = {
  _id: string;               
  content: string;
  isComplete: "Incomplete" | "Complete" | "InProgress"; 
  author: string;           
  priority: "Low" | "Medium" | "High"; 
  deadline: string;         
  subTasks: string[];        
  createdAt: string;         
  updatedAt: string;         
  __v: number;       
}

// Status options
const statusOptions = [
  { value: "Incomplete", label: "Incomplete" },
  { value: "InProgress", label: "In Progress" },
  { value: "Complete", label: "Complete" }
] as const;

// Priority options
const priorityOptions = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" }
] as const;

// Status badge variant mapping
const getStatusVariant = (status: Task["isComplete"]) => {
  switch (status) {
    case "Complete":
      return "default"; // or "success" if available
    case "InProgress":
      return "secondary";
    case "Incomplete":
      return "outline";
    default:
      return "outline";
  }
};

// Priority badge variant mapping
const getPriorityVariant = (priority: Task["priority"]) => {
  switch (priority) {
    case "High":
      return "destructive";
    case "Medium":
      return "secondary";
    case "Low":
      return "outline";
    default:
      return "outline";
  }
};

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "content",
    header: "Title",
  },
  {
    accessorKey: "isComplete",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("isComplete") as Task["isComplete"];
      
      const handleStatusChange = (newStatus: Task["isComplete"]) => {
        // Here you would typically call an API to update the task status
        console.log(`Updating task ${row.original._id} status to ${newStatus}`);
        // Example: updateTaskStatus(row.original._id, newStatus);
        
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-auto p-2 justify-start">
              <Badge variant={getStatusVariant(status)} className="mr-2">
                {status === "InProgress" ? "In Progress" : status}
              </Badge>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {statusOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleStatusChange(option.value)}
                className={status === option.value ? "bg-accent" : ""}
              >
                <Badge variant={getStatusVariant(option.value)} className="mr-2">
                  {option.label}
                </Badge>
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as Task["priority"];
      
      const handlePriorityChange = (newPriority: Task["priority"]) => {
        // Here you would typically call an API to update the task priority
        console.log(`Updating task ${row.original._id} priority to ${newPriority}`);
        // Example: updateTaskPriority(row.original._id, newPriority);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-auto p-2 justify-start">
              <Badge variant={getPriorityVariant(priority)} className="mr-2">
                {priority}
              </Badge>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {priorityOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handlePriorityChange(option.value)}
                className={priority === option.value ? "bg-accent" : ""}
              >
                <Badge variant={getPriorityVariant(option.value)} className="mr-2">
                  {option.label}
                </Badge>
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original;
      console.log("Rendering actions for", row.original);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(task._id)}
            >
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]