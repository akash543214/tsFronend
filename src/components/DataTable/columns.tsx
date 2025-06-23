import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker } from "./DatePicker"
import StatusCell from "./StatusCell"
import PriorityCell from "./PriorityCell"
import Actions from "./Actions"
import { Task } from "@/types/common";
import { ArrowUpDown, ChevronDown, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddTask } from "./AddTask"
// Define custom sorting orders

export const getColumns = (projectId:number): ColumnDef<Task>[] => [
  {
    id: "expander",
    header: "",
    cell: ({ row }) => {
      const hasSubtasks = row.original.subtasks && row.original.subtasks.length > 0;
      const canExpand = row.getCanExpand();
      
      return (
        <div className="flex items-center space-x-2">
          {canExpand && hasSubtasks ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={row.getToggleExpandedHandler()}
              className="h-8 w-8 p-0"
            >
              {row.getIsExpanded() ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          ) : (
            <div className="w-8" />
          )}
          
          {/* Add subtask button - only show for main tasks and first level subtasks */}
          {row.depth < 2 && (
            <AddTask
                  projectId={projectId}
                  parentId={row.original.id}
                  trigger={ <Plus className="h-4 w-4 text-gray-500 hover:text-gray-700 cursor-pointer" />}/> 
          )}
         
        </div>
      );
    },
    size: 80,
    enableSorting: false,
    enableHiding: false,
  },
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
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      const depth = row.depth;
      
      return (
        <div className="flex items-center">
          {depth > 0 && (
            <span className="text-gray-400 mr-2">
              {depth === 1 ? "├─" : "└─"}
            </span>
          )}
          <span className={depth > 0 ? "font-medium" : "font-semibold"}>
            {title}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <StatusCell row={row} />,
   
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <PriorityCell row={row} />,
   
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Deadline
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row})=> <DatePicker row={row}/>
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions row={row}/>,
  },
]