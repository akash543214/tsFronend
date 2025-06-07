import {useState} from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Task } from "@/types/common";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { editFunction } from "@/utils/dataTableFunctions";

export default function StatusCell({ row }: { row: any }) {
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
      const statusOptions = [
        { value: "Incomplete", label: "Incomplete" },
        { value: "InProgress", label: "In Progress" },
        { value: "Complete", label: "Complete" }
      ] as const;

    const [status, setStatus] = useState(row.getValue("isComplete") as Task["isComplete"]);
  
    const handleStatusChange = (newStatus: Task["isComplete"]) => {
      editFunction({
        key: "isComplete",
        value: newStatus,
        _id: row.original._id
      });
      setStatus(newStatus);
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
  }
  