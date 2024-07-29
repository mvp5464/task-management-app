"use client";
import { TaskContext } from "@/context/AllContext";
import { TaskType } from "@/context/AllContextProvider";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { DatePickerDemo } from "./DatePicker";

const PopupSection = ({
  logo,
  title,
}: {
  logo: JSX.Element;
  title: string;
}) => {
  const [value, setValue] = useState<string>("NA");

  const {
    task,
    setTask,
  }: { task: TaskType; setTask: Dispatch<SetStateAction<TaskType>> } =
    useContext(TaskContext);

  return (
    <div className=" flex gap-3 items-center mb-4">
      <div>{logo}</div>
      <div className=" text-[#666666] text-sm w-32">{title}</div>

      {title === "Description" && (
        <input
          className="placeholder:text-sm p-2.5 text-[#727272]s text-sm rounded-lg block w-full "
          type="text"
          placeholder="Not selected"
        />
      )}

      {title === "Status" && (
        <select
          className={`bg-white appearance-none ${
            value === "NA" ? " text-[#C1BDBD]" : " text-black"
          } focus:text-[#666666]s text-sm rounded-lg  block w-full p-2.5`}
          onChange={(e) =>
            setTask((val: any) => ({ ...val, status: e.target.value }))
          }
        >
          <option className=" text-black" value={"NA"} selected>
            Not selected
          </option>
          <option className=" text-black" value="To do">
            To do
          </option>
          <option className=" text-black" value="In progress">
            In progress
          </option>
          <option className=" text-black" value="Under review">
            Under review
          </option>
          <option className=" text-black" value="Finished">
            Finished
          </option>
        </select>
      )}

      {title === "Priority" && (
        <select
          className={`bg-white appearance-none ${
            value === "NA" ? " text-[#C1BDBD]" : " text-black"
          } focus:text-[#666666]s text-sm rounded-lg  block w-full p-2.5`}
          onChange={(e) =>
            setTask((val: any) => ({ ...val, priority: e.target.value }))
          }
        >
          <option className=" text-black" value={"null"} selected>
            Not selected
          </option>
          <option className=" text-black" value="Low">
            Low
          </option>
          <option className=" text-black" value="Medium">
            Medium
          </option>
          <option className=" text-black" value="Urgent">
            Urgent
          </option>
        </select>
      )}
      {title === "Deadline" && <DatePickerDemo />}
    </div>
  );
};

export default PopupSection;
