import {useState} from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Task } from "@/types/common";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { editFunction } from "@/utils/dataTableFunctions";
import { TaskStatus } from "@/types/common";


export default function StatusCell({ row }: { row: any }) {
    const getStatusVariant = (status: Task["status"]) => {
        switch (status) {
          case TaskStatus.COMPLETED:
            return "default"; // or "success" if available
          case TaskStatus.IN_PROGRESS:
            return "secondary";
          case TaskStatus.PENDING:
            return "outline";
          default:
            return "outline";
        }
      };
      const statusOptions = [
        { value: TaskStatus.PENDING, label: "Pending" },
        { value: TaskStatus.IN_PROGRESS, label: "In Progress" },
        { value: TaskStatus.COMPLETED, label: "Completed" }
      ] as const;

    const [status, setStatus] = useState(row.getValue("status") as Task["status"]);
  
    const handleStatusChange = (newStatus: Task["status"]) => {
      editFunction({
        key: "status",
        value: newStatus,
        id: row.original.id
      });
      setStatus(newStatus);
    };
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-auto p-2 justify-start">
            <Badge variant={getStatusVariant(status)} className="mr-2">
              {status === TaskStatus.IN_PROGRESS ? "In Progress" : status}
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
  }
  