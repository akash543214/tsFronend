import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
}

export function DatePicker({ date, onDateChange }: DatePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    onDateChange?.(selectedDate);
    setShowCalendar(false);
   
  };

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        className={cn(
          "w-[240px] justify-start text-left font-normal",
          !date && "text-muted-foreground"
        )}
        onClick={(e) => {
          e.stopPropagation();
          setShowCalendar(!showCalendar);
        }}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </Button>

      {showCalendar && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowCalendar(false)}
          />
          
          {/* Calendar Modal */}
          <div 
            className="absolute top-full left-0 mt-2 z-50 bg-white border rounded-lg shadow-lg p-4"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
            />
          </div>
        </>
      )}
    </div>
  )
}