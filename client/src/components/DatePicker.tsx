"use client";

import { cn, dateFormatFunction } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "@/context/AllContext";

export function DatePickerDemo() {
  const [date, setDate] = useState<Date>();

  const { task, setTask } = useContext(TaskContext);

  useEffect(() => {
    if (date) {
      setTask((v) => ({ ...v, deadline: dateFormatFunction(date) }));
    }
  }, [date, setTask]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal -ml-10 border-none shadow-none",
            !date && "text-muted-foreground"
          )}
        >
          {date ? (
            dateFormatFunction(date)
          ) : task.deadline ? (
            <span className="text-black ">{task.deadline}</span>
          ) : (
            <span className="text-[#C1BDBD] ">Not selected</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          //@ts-ignore
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
