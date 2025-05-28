import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker } from "../Assets/DatePicker"
import StatusCell from "./StatusCell"
import PriorityCell from "./PriorityCell"
import Actions from "./Actions"
import { Task } from "@/types/common";


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
    header: "Title",
    
  },
  {
    accessorKey: "isComplete",
    header: "Status",
    cell: ({ row }) => <StatusCell row={row} />,
  
  },

  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => <PriorityCell row={row} />,
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({row})=> <DatePicker row={row}/>
  
    },

  {
    id: "actions",
    cell: ({ row }) => <Actions row={row} refreshTable={refreshTable}/>,

  },
]