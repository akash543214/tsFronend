import { Task } from "@/types/common";
import { 
    closestCorners, 
    DndContext, 
    DragEndEvent, 
    DragOverEvent,
    DragStartEvent,
    DragOverlay,
    useSensor,
    useSensors,
    PointerSensor,
    KeyboardSensor
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import Column from "./Column";
import TaskCard from "./TaskCard";
import { useEffect,useCallback } from "react";


type KanbanBoardProps = { 
    data: Task[];
   // onTaskUpdate?: (taskId: string, newStatus: Task['isComplete']) => void;
}

const KanbanBoard = ({ data }: KanbanBoardProps) => {
  
    const [tasks, setTasks] = useState<Task[]>(data);
    const [activeTask, setActiveTask] = useState<Task | null>(null);
     

    useEffect(() => {
               
      setTasks(data);
      console.log("setTask called");
    }, [data]);

   
    // Configure sensors
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Filter tasks by status
    const incompleteTasks = tasks.filter(task => task.isComplete === "Incomplete");
    const inProgressTasks = tasks.filter(task => task.isComplete === "InProgress");
    const completedTasks = tasks.filter(task => task.isComplete === "Complete");

    const columns = [
        { id: 'incomplete', title: 'Incomplete', tasks: incompleteTasks, status: 'Incomplete' as const },
        { id: 'inprogress', title: 'In Progress', tasks: inProgressTasks, status: 'InProgress' as const },
        { id: 'completed', title: 'Completed', tasks: completedTasks, status: 'Complete' as const }
    ];

    // Find which column a task belongs to
    const findTaskColumn = (taskId: string) => {
        return columns.find(column => 
            column.tasks.some(task => task._id === taskId)
        );
    };

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        const task = tasks.find(t => t._id === active.id);
        setActiveTask(task || null);
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;
        
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        // Find the columns
        const activeColumn = findTaskColumn(activeId);
        const overColumn = columns.find(col => col.id === overId) || findTaskColumn(overId);

        if (!activeColumn || !overColumn) return;
        if (activeColumn.id === overColumn.id) return;

        // Move task between columns
        setTasks(prevTasks => {
            return prevTasks.map(task => 
                task._id === activeId 
                    ? { ...task, isComplete: overColumn.status }
                    : task
            );
        });
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        
        setActiveTask(null);

        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        // Find the columns
        const activeColumn = findTaskColumn(activeId);
        const overColumn = columns.find(col => col.id === overId) || findTaskColumn(overId);

        if (!activeColumn || !overColumn) return;

        // If moving to a different column
        if (activeColumn.id !== overColumn.id) {
            const updatedTasks = tasks.map(task => 
                task._id === activeId 
                    ? { ...task, isComplete: overColumn.status }
                    : task
            );
            
            setTasks(updatedTasks);
            
            // Call the optional callback to update backend
           // if (onTaskUpdate) {
              //  onTaskUpdate(activeId, overColumn.status);
            //}
        } else {
            // Reordering within the same column
            const columnTasks = activeColumn.tasks;
            const activeIndex = columnTasks.findIndex(task => task._id === activeId);
            const overIndex = columnTasks.findIndex(task => task._id === overId);

            if (activeIndex !== overIndex) {
                const reorderedTasks = arrayMove(columnTasks, activeIndex, overIndex);
                
                // Update the main tasks array with the new order
                setTasks(prevTasks => {
                    const otherTasks = prevTasks.filter(task => task.isComplete !== activeColumn.status);
                    return [...otherTasks, ...reorderedTasks];
                });
            }
        }
    }

    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Kanban Board</h1>
            
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {columns.map(column => (
                        <Column 
                            key={column.id}
                            id={column.id}
                            title={column.title} 
                            tasks={column.tasks} 
                        />
                    ))}
                </div>

                {/* Drag Overlay */}
                <DragOverlay>
                    {activeTask ? (
                        <div className="rotate-3 opacity-90">
                            <TaskCard 
                                taskId={activeTask._id}
                                taskTitle={activeTask.content}
                            />
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}

export default KanbanBoard;