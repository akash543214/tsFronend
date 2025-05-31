import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker } from "../Assets/DatePicker"
import StatusCell from "./StatusCell"
import PriorityCell from "./PriorityCell"
import Actions from "./Actions"
import { Task } from "@/types/common";
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

// Define custom sorting orders
const priorityOrder = { high: 0, medium: 1, low: 2 };
const statusOrder = { incomplete: 0, inprogress: 1, completed: 2 };

export const getColumns = (refreshTable: () => void): ColumnDef<Task>[] => [
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
    header: "Title"
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