import { Task } from "@/types/common";
import TaskCard from "./TaskCard";
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

type ColumnProps = {
    id: string;
    title: string;
    tasks: Task[];
};

export default function Column({ id, title, tasks }: ColumnProps) {

    const { setNodeRef, isOver } = useDroppable({
        id: id,
        data: {
            type: 'column',
            accepts: ['task'],
        }
    });

   // console.log("render columns");
    return (
        <div 
            ref={setNodeRef}
            className={`bg-muted rounded-xl p-4 min-h-96 transition-colors ${
                isOver ? 'bg-muted/80 ring-2 ring-primary/20' : ''
            }`}
        >
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <div className="space-y-4">
                <SortableContext 
                    items={tasks.map(task => task._id)}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks.map(task => (
                        <TaskCard 
                            key={task._id} 
                            taskId={task._id}
                            taskTitle={task.content} 
                        /> 
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}