
import { useState} from "react";
import { DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem, 
   DropdownMenuTrigger }
    from "@/components/ui/dropdown-menu";
import { Task } from "@/types/common";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { handleUpdateTask } from "@/utils/dataTableFunctions";
import { TaskPriority } from "@/types/common";

export default function PriorityCell({ row }: { row: any }) {
    const [priority, setPriority] = useState(row.getValue("priority") as Task["priority"]);
  
// Priority options
const priorityOptions = [
    { value: TaskPriority.LOW, label: "LOW" },
    { value: TaskPriority.MEDIUM, label: "MEDIUM" },
    { value: TaskPriority.HIGH, label: "HIGH" },
    { value: TaskPriority.URGENT, label: "URGENT" }
  ] as const;
  
  
  // Priority badge variant mapping
  const getPriorityVariant = (priority: Task["priority"]) => {
    switch (priority) {
      case TaskPriority.HIGH:
        return "destructive";
      case TaskPriority.MEDIUM:
        return "secondary";
      case TaskPriority.LOW:
        return "outline";
         case TaskPriority.URGENT:
        return "destructive";
      default:
        return "outline";
    }
  };

    const handlePriorityChange = (newPriority: Task["priority"]) => {

      handleUpdateTask(
        {key:"priority", 
        value:newPriority,
      taskId: row.original.id}
    );
      setPriority(newPriority);
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
             
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  