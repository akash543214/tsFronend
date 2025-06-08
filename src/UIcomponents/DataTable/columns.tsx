import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker } from "../Assets/DatePicker"
import StatusCell from "./StatusCell"
import PriorityCell from "./PriorityCell"
import Actions from "./Actions"
import { Task } from "@/types/common";
import { ArrowUpDown, ChevronDown, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

// Define custom sorting orders
const priorityOrder = { high: 0, medium: 1, low: 2 };
const statusOrder = { incomplete: 0, inprogress: 1, completed: 2 };

export const getColumns = (refreshTable: () => void): ColumnDef<Task>[] => [
  {
    id: "expander",
    header: "",
    cell: ({ row }) => {
      const hasSubtasks = row.original.subTasks && row.original.subTasks.length > 0;
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
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
              onClick={() => {
                // You'll need to implement this function
                console.log('Add subtask to:', row.original._id);
                // addSubtask(row.original.id);
              }}
              title="Add subtask"
            >
              <Plus className="h-3 w-3" />
            </Button>
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
    accessorKey: "content",
    header: "Title",
    cell: ({ row }) => {
      const content = row.getValue("content") as string;
      const depth = row.depth;
      
      return (
        <div className="flex items-center">
          {depth > 0 && (
            <span className="text-gray-400 mr-2">
              {depth === 1 ? "├─" : "└─"}
            </span>
          )}
          <span className={depth > 0 ? "font-medium" : "font-semibold"}>
            {content}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "isComplete",
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
    sortingFn: (rowA, rowB, columnId) => {
      const statusA = rowA.getValue(columnId) as string;
      const statusB = rowB.getValue(columnId) as string;
      
      // Convert boolean isComplete to status string if needed
      let statusAStr: string;
      let statusBStr: string;
      
      if (typeof statusA === 'boolean') {
        statusAStr = statusA ? 'completed' : 'incomplete';
      } else {
        statusAStr = statusA?.toLowerCase() || 'incomplete';
      }
      
      if (typeof statusB === 'boolean') {
        statusBStr = statusB ? 'completed' : 'incomplete';
      } else {
        statusBStr = statusB?.toLowerCase() || 'incomplete';
      }
      
      const orderA = statusOrder[statusAStr as keyof typeof statusOrder] ?? 999;
      const orderB = statusOrder[statusBStr as keyof typeof statusOrder] ?? 999;
      
      return orderA - orderB;
    },
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
    sortingFn: (rowA, rowB, columnId) => {
      const priorityA = (rowA.getValue(columnId) as string)?.toLowerCase() || 'low';
      const priorityB = (rowB.getValue(columnId) as string)?.toLowerCase() || 'low';
      
      const orderA = priorityOrder[priorityA as keyof typeof priorityOrder] ?? 999;
      const orderB = priorityOrder[priorityB as keyof typeof priorityOrder] ?? 999;
      
      return orderA - orderB;
    },
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
    cell: ({ row }) => <Actions row={row} refreshTable={refreshTable}/>,
  },
]