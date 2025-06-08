import { useState, 
  useCallback,
   useMemo, 
   useEffect }
    from 'react';
    
import { 
  DragStartEvent, 
  DragEndEvent, 
  DragOverEvent,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { Task, TaskStatus } from '@/types/common';
import { editFunction } from '@/utils/dataTableFunctions';

interface Column {
  id: string;
  title: string;
  status: TaskStatus;
  tasks: Task[];
}

export function useKanbanDragDrop(
  initialTasks: Task[], 
) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [originalColumn, setOriginalColumn] = useState<Column | null>(null); // Track original column

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const columns = useMemo<Column[]>(() => {
    const incompleteTasks = tasks.filter(task => task.isComplete === "Incomplete");
    const inProgressTasks = tasks.filter(task => task.isComplete === "InProgress");
    const completedTasks = tasks.filter(task => task.isComplete === "Complete");

    return [
      {
        id: 'incomplete',
        title: 'Incomplete',
        status: 'Incomplete',
        tasks: incompleteTasks
      },
      {
        id: 'inprogress',
        title: 'In Progress',
        status: 'InProgress',
        tasks: inProgressTasks
      },
      {
        id: 'completed',
        title: 'Completed',
        status: 'Complete',
        tasks: completedTasks
      }
    ];
  }, [tasks]);

  const findTaskColumn = useCallback((taskId: string) => {
    return columns.find(column => 
      column.tasks.some(task => task._id === taskId)
    );
  }, [columns]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    //console.log("🚀 DRAG START");
    const task = tasks.find(t => t._id === event.active.id);
    setActiveTask(task || null);
    
    // Store the original column when drag starts
    const activeColumn = findTaskColumn(event.active.id as string);
    setOriginalColumn(activeColumn || null);
    
  //  console.log("Original column:", activeColumn?.title);
  }, [tasks, findTaskColumn]);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Use original column instead of finding current column
    const activeColumn = originalColumn;
    
    // Check if we're over a column (droppable area) or over a task
    const isOverColumn = over.data?.current?.type === 'column';
    
    let overColumn: Column | undefined;
    
    if (isOverColumn) {
      // We're over a column droppable area
      overColumn = columns.find(col => col.id === overId);
    } else {
      // We're over a task, so find which column that task belongs to
      overColumn = findTaskColumn(overId);
    }

    if (!activeColumn || !overColumn || activeColumn.id === overColumn.id) return;

  //  console.log(`✅ Moving from ${activeColumn.title} to ${overColumn.title}`);

    setTasks(prev => prev.map(task => 
      task._id === activeId 
        ? { ...task, isComplete: overColumn.status }
        : task
    ));
  }, [originalColumn, findTaskColumn, columns]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
   // console.log("🏁 DRAG END");
    
    setActiveTask(null);
    if (!over) {
      setOriginalColumn(null);
      return;
    }
       
    const activeId = active.id as string;
    const overId = over.id as string;

    // Use original column instead of finding current column
    const activeColumn = originalColumn;
    
    // Check if we're over a column or over a task
    const isOverColumn = over.data?.current?.type === 'column';
    
    let overColumn: Column | undefined;
    
    if (isOverColumn) {
      overColumn = columns.find(col => col.id === overId);
    } else {
      overColumn = findTaskColumn(overId);
    }

    if (!activeColumn || !overColumn) {
      setOriginalColumn(null);
      return;
    }

    //console.log("Final active column:", activeColumn.title);
   // console.log("Final over column:", overColumn.title);

    if (activeColumn.id !== overColumn.id) {
      // Moving to a different column
     // console.log(`🎯 FINAL MOVE from ${activeColumn.title} to ${overColumn.title}`);
      
      editFunction({
        key: "isComplete",
        value: overColumn.status,
        _id: activeId
      });
    } else {
      // Reordering within the same column
     // console.log("🔄 Reordering within same column");
      const columnTasks = activeColumn.tasks;
      const activeIndex = columnTasks.findIndex(task => task._id === activeId);
      const overIndex = columnTasks.findIndex(task => task._id === overId);

      if (activeIndex !== overIndex) {
        console.log(`Moving from index ${activeIndex} to ${overIndex}`);
        const reorderedTasks = arrayMove(columnTasks, activeIndex, overIndex);
        setTasks(prev => [
          ...prev.filter(task => task.isComplete !== activeColumn.status),
          ...reorderedTasks
        ]);
      }
    }
    
    // Reset original column
    setOriginalColumn(null);
  }, [originalColumn, findTaskColumn, columns]);

  return {
    tasks,
    setTasks,
    activeTask,
    columns,
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd
  };
}