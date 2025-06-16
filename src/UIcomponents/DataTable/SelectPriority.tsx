interface SelectPriorityProps {
  value?: string;
  onValueChange?: (value: string) => void;
}
// Priority options
import { TaskPriority} from "@/types/common";

const priorityOptions = [
    { value: TaskPriority.LOW, label: "LOW" },
    { value: TaskPriority.MEDIUM, label: "MEDIUM" },
    { value: TaskPriority.HIGH, label: "HIGH" },
    { value: TaskPriority.URGENT, label: "URGENT" }
  ] as const;
  
export function SelectPriority({ value, onValueChange }: SelectPriorityProps) {
  
  return (
    <select 
      value={value || ""} 
      onChange={(e) => onValueChange?.(e.target.value)}
      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
    >
      <option value="">Select Priority</option>
      {priorityOptions.map((priority) => (
        <option key={priority.label} value={priority.value}>
          {priority.label}
        </option>
      ))}
    </select>
  )
}