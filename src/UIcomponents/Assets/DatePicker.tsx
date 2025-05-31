import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Row } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { editFunction } from "@/utils/dataTableFunctions"
import { Task } from "@/types/common"

type DatePickerProps = {
  row: Row<Task>
}

export function DatePicker({ row }: DatePickerProps) {
  const [date, setDate] = React.useState<Date>(row.getValue("deadline"))
  const [open, setOpen] = React.useState(false)

  const handleDateChange = async (newDate: Date) => {
    try {
      await editFunction("deadline", newDate, row.original._id)
      setDate(newDate)
      setOpen(false)
    } catch (error) {
      console.error("Date update failed:", error)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[180px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            if (date) handleDateChange(date)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
