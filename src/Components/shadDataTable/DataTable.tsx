import { useState } from "react";
import LoadScreen from "../Assets/LoadScreen";
import {
    ColumnDef,
    flexRender,
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
   
  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[],
    isLoading: boolean,
  }
   
  export default function DataTable<TData, TValue>({
    columns,
    data,
    isLoading
  }: DataTableProps<TData, TValue>) {

    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      onRowSelectionChange: setRowSelection,
      state: {
        rowSelection,
      },
    })

    if(isLoading)
     return (
      <div className="min-h-screen flex flex-col">

     <LoadScreen />
     </div>)
      
    return (
      <div className="min-h-screen flex flex-col">
  <div className="flex justify-center mt-4 px-4">
    <div className="w-full max-w-4xl p-4 bg-white shadow-md rounded-md border">
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
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