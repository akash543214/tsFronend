import { useState } from "react";
import LoadScreen from "../Assets/LoadScreen";
import { AddTask } from "./AddTask";
import {
    ColumnDef,
    flexRender,
    SortingState,
    getSortedRowModel,
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table";
   
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { ViewType } from "@/types/common";

  import { TaskSheet } from "../TaskSheet";
import { Button } from "@/components/ui/button";
  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[],
    isLoading: boolean,
    refreshTable: () => void,
    setView: React.Dispatch<React.SetStateAction<ViewType>>;
  }
   
  export default function DataTable<TData, TValue>({
    columns,
    data,
    isLoading,
    refreshTable,
    setView
  }: DataTableProps<TData, TValue>) {

    const [rowSelection, setRowSelection] = useState({})
    const [sorting, setSorting] = useState<SortingState>([])
    const [open, setOpen] = useState(false)

    // Optional: Open sheet via a custom event
    const openSheet = () => setOpen(true);

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(), 
      onRowSelectionChange: setRowSelection,
      onSortingChange: setSorting, 
      state: {
        rowSelection,
        sorting
      },
    })

    if(isLoading)
     return (
      <div className="min-h-screen flex flex-col">
        <LoadScreen />
      </div>)
      
    return (
      <div className="min-h-screen">
        <div className="mx-8 mt-6">
            <Button variant={"outline"} 
        onClick={()=>setView("kanban")}>Kanban Board
        </Button>
        </div>
       <div className="flex flex-row-reverse mx-auto p-4">
        
        <AddTask refreshTable = {refreshTable}/>
    

        <TaskSheet />

        </div> 
        <div className="flex justify-center mt-4 px-4">
          <div className="w-full p-4 bg-white shadow-md rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="cursor-pointer">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} onClick={()=>openSheet()}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center ">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    )
  }