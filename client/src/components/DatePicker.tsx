"use client";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { TaskType } from "@/context/AllContextProvider";
import { TaskContext } from "@/context/AllContext";

export function DatePickerDemo() {
  const [date, setDate] = useState<Date>();
  console.log({ date });

  const { setTask }: { setTask: Dispatch<SetStateAction<TaskType>> } =
    useContext(TaskContext);

  useEffect(() => {
    date && setTask((v) => ({ ...v, deadline: date }));
  }, [date]);

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
            format(date, "PPP")
          ) : (
            <span className="text-gray-200 ">Not selected</span>
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
