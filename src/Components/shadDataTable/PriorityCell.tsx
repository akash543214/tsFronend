
import { useState} from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Task } from "@/types/common";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { editFunction } from "@/utils/dataTableFunctions";


export default function PriorityCell({ row }: { row: any }) {
    const [priority, setPriority] = useState(row.getValue("priority") as Task["priority"]);
  
// Priority options
const priorityOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" }
  ] as const;
  
  
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

    const handlePriorityChange = (newPriority: Task["priority"]) => {
      editFunction("priority", newPriority, row.original._id);
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
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  