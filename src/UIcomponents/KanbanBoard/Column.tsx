import React from 'react';
import { Task } from "@/types/common";
import TaskCard from "./TaskCard";
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface ColumnProps {
    id: number;
    title: string;
    tasks: Task[];
}

function Column({ id, title, tasks }: ColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id,
        data: { type: 'column', accepts: ['task'] }
    });

    const taskIds = React.useMemo(() => tasks.map(task => task.id), [tasks]);

    return (
        <div 
            ref={setNodeRef}
            className={`bg-muted/50 rounded-xl p-4 min-h-96 transition-all duration-200 ${
                isOver ? 'bg-muted ring-2 ring-primary/30 shadow-md' : ''
            }`}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground/90">{title}</h2>
                <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded-full">
                    {tasks.length}
                </span>
            </div>
            
            <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                    {tasks.map(task => (
                        <TaskCard 
                            key={task.id} 
                            taskId={task.id}
                            taskTitle={task.content} 
                        /> 
                    ))}
                </div>
            </SortableContext>

            {tasks.length === 0 && (
                <div className="flex items-center justify-center h-32 text-muted-foreground text-sm border-2 border-dashed border-muted rounded-lg">
                    Drop tasks here
                </div>
            )}
        </div>
    );
}

export default React.memo(Column);
