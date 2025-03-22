"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const statuses = ["All", "Delivered", "Canceled", "Pending"];

export default function DateStatusFilter() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 11, 16), // Dec 16, 2024
    to: new Date(2025, 0, 16), // Jan 16, 2025
  });

  const [status, setStatus] = React.useState("All");

  return (
    <div className="flex justify-end items-center space-x-2  p-2 rounded-md ">
      {/* Date Picker */}
      <div className="flex items-center space-x-2 border px-3 py-2 rounded-md ">
        <CalendarIcon size={18} />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="ghost"
              className="text-sm font-normal px-2 border-none shadow-none focus:ring-0"
            >
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "MMM dd, yyyy")} -{" "}
                    {format(date.to, "MMM dd, yyyy")}
                  </>
                ) : (
                  format(date.from, "MMM dd, yyyy")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>


    </div>
  );
}
