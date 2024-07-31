"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
import Calendar from "react-calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "@/context/AllContext";
import { dateFormatFunction } from "@/utils/getTime";

export function DatePickerDemo() {
  const [date, setDate] = useState<any>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { task, setTask } = useContext(TaskContext);

  useEffect(() => {
    if (date) {
      setTask((v) => ({ ...v, deadline: dateFormatFunction(date) }));
    }
  }, [date, setTask]);

  return (
    // <div className=" relative">
    //   <Button
    //     variant={"outline"}
    //     className={cn(
    //       "w-[280px] justify-start text-left font-normal -ml-10 border-none shadow-none",
    //       !date && "text-muted-foreground"
    //     )}
    //     onClick={() => {
    //       setIsOpen((p) => !p);
    //     }}
    //   >
    //     {date ? (
    //       dateFormatFunction(date)
    //     ) : task.deadline ? (
    //       <span className="text-black ">{task.deadline}</span>
    //     ) : (
    //       <span className="text-[#C1BDBD] ">Not selected</span>
    //     )}
    //   </Button>
    //   <div
    //     className={`w-autos bg-white absolute top-10 right-20 w-full h-full ${
    //       isOpen ? "block" : "hidden"
    //     } `}
    //   >
    //     <Calendar
    //       onChange={setDate}
    //       value={date}
    //       onClickDay={() => {
    //         setIsOpen((p) => !p);
    //       }}
    //       className={`bg-gray-100 border-4 rounded-lg p-5`}
    //     />
    //   </div>
    // </div>
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
      <PopoverContent className=" bg-white p-0">
        {/* <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          //@ts-ignore
          initialFocus
        /> */}
        <Calendar
          onChange={setDate}
          value={date}
          className={`bg-gray-100 border-4 rounded-lg p-2`}
        />
      </PopoverContent>
    </Popover>
  );
}
