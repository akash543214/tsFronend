import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type TaskCardProps = {
    taskTitle: string;
    taskId: string; // MongoDB _id
};

export default function TaskCard({ taskTitle, taskId }: TaskCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ 
        id: taskId,
        data: {
            type: 'task',
            taskId: taskId
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };
   //console.log(taskTitle);
    return (
        <Card 
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
        >
            <CardHeader>
                <CardTitle className="text-sm">{taskTitle}</CardTitle>
            </CardHeader>
            <CardContent>   
            </CardContent>
        </Card>
    );
}