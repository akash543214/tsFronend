import React from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TaskCardProps {
    taskTitle: string;
    taskId: string;
}

function TaskCard({ taskTitle, taskId }: TaskCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ 
        id: taskId,
        data: { type: 'task', taskId }
    });

    const style = React.useMemo(() => ({
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }), [transform, transition, isDragging]);

    return (
        <Card 
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow select-none"
        >
            <CardHeader className="pb-2">
                <CardTitle className="text-sm leading-tight">{taskTitle}</CardTitle>
            </CardHeader>
        </Card>
    );
}

export default React.memo(TaskCard);