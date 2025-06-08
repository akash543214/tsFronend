import { Task } from "@/types/common";
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';
import { useKanbanDragDrop } from '@/hooks/useKanbanDragDrop';
import Column from "./Column";
import TaskCard from "./TaskCard";
import LoadScreen from "../Assets/LoadScreen";
import { Button } from "@/components/ui/button";
import { ViewType } from "@/types/common";

interface KanbanBoardProps { 
    data: Task[];
    isLoading?: boolean;
   setView: React.Dispatch<React.SetStateAction<ViewType>>;

}

export default function KanbanBoard({ data, isLoading,setView }: KanbanBoardProps) {
    const {
        columns,
        activeTask,
        sensors,
        handleDragStart,
        handleDragOver,
        handleDragEnd
    } = useKanbanDragDrop(data);

    if (isLoading) {
        return <LoadScreen />
    }

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
             <Button variant={"outline"} onClick={()=>setView("table")}>List</Button>

                <h1 className="text-3xl font-bold tracking-tight">Kanban Board</h1>
                <div className="text-sm text-muted-foreground">
                    {data.length} total tasks
                </div>
            </div>
            
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {columns.map(column => (
                        <Column 
                            key={column.id}
                            id={column.id}
                            title={column.title} 
                            tasks={column.tasks} 
                        />
                    ))}
                </div>

                <DragOverlay dropAnimation={{ duration: 200, easing: 'ease' }}>
                    {activeTask && (
                        <div className="rotate-2 scale-105 shadow-xl">
                            <TaskCard 
                                taskId={activeTask._id}
                                taskTitle={activeTask.content}
                            />
                        </div>
                    )}
                </DragOverlay>
            </DndContext>
        </div>
    );
}