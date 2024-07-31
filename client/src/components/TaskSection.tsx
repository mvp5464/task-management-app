"use client";
import { useContext } from "react";
import LinesIcon from "./icons/LinesIcon";
import PlusIcon from "./icons/PlusIcon";
import TaskCard from "./TaskCard";
import { StatusType, TaskType } from "@/context/AllContextProvider";
import { PopupContext, TaskContext } from "@/context/AllContext";

const TaskSection = ({
  status,
  taskCard,
}: {
  status: StatusType;
  taskCard?: TaskType[];
}) => {
  const { setShowPopup } = useContext(PopupContext);
  const { setTask } = useContext(TaskContext);

  return (
    <>
      <div>
        <div className=" flex justify-between mb-4">
          <div className=" text-[#555555] text-lg ">{status}</div>
          <LinesIcon />
        </div>
        <div className="mb-4">
          <TaskCard taskCard={taskCard} />
        </div>
        <button
          className=" flex justify-between items-center w-full bg-gradient-to-b from-[#3A3A3A] to-[#202020] text-white p-2 rounded-lg mb-4 hover:shadow-lg hover:shadow-slate-900"
          onClick={() => {
            setShowPopup(true);
            setTask((val) => ({ ...val, status: status }));
          }}
        >
          <span className="text-sm ">Add new</span>
          <PlusIcon />
        </button>
      </div>
    </>
  );
};

export default TaskSection;
