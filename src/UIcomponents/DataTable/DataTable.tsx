import { useState } from "react";
import LoadScreen from "../Assets/LoadScreen";
import { AddTask } from "./AddTask";
import {
    ColumnDef,
    flexRender,
    SortingState,
    ExpandedState,
    getSortedRowModel,
    getCoreRowModel,
    getExpandedRowModel,
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
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    isLoading: boolean;
    refreshTable: () => void;
    setView: React.Dispatch<React.SetStateAction<ViewType>>;
}

export default function DataTable<TData, TValue>({
    columns,
    data,
    isLoading,
    refreshTable,
    setView
}: DataTableProps<TData, TValue>) {

    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [expanded, setExpanded] = useState<ExpandedState>({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onExpandedChange: setExpanded,
        getSubRows: (row: any) => row.subTasks || [], // Tell TanStack where to find subtasks
        state: {
            rowSelection,
            sorting,
            expanded,
        },
        enableExpanding: true,
    });

    if (isLoading)
        return (
            <div className="min-h-screen flex flex-col">
                <LoadScreen />
            </div>
        );

    return (
        <div className="min-h-screen">
            <div className="mx-8 mt-6">
                <Button variant={"outline"} onClick={() => setView("kanban")}>
                    Kanban Board
                </Button>
            </div>
            <div className="flex flex-row-reverse mx-auto p-4">
                <AddTask refreshTable={refreshTable} />
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
                                        );
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
                                        className={`${
                                            row.depth > 0 
                                                ? `${
                                                    row.depth === 1 
                                                        ? 'bg-blue-50 border-l-4 border-l-blue-300' 
                                                        : row.depth === 2 
                                                        ? 'bg-green-50 border-l-4 border-l-green-300 ml-4'
                                                        : ''
                                                  }` 
                                                : ''
                                        }`}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell 
                                                key={cell.id}
                                                className={`${
                                                    row.depth > 0 ? 'text-sm' : ''
                                                } ${
                                                    row.depth === 1 ? 'text-blue-800 pl-6' : 
                                                    row.depth === 2 ? 'text-green-800 pl-10' : ''
                                                }`}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
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
    );
}