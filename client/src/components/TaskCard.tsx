import { TaskType } from "@/context/AllContextProvider";
import TimeIcon from "./icons/TimeIcon";
import { DragEvent, useContext } from "react";
import { PopupContext, TaskContext } from "@/context/AllContext";
import { timePassedFunction } from "@/utils/getTime";

const TaskCard = ({ taskCard }: { taskCard?: TaskType[] }) => {
  const { setShowPopup } = useContext(PopupContext);
  const { setTask } = useContext(TaskContext);

  function handleOnDrag(e: DragEvent, movingTask: string) {
    e.dataTransfer.setData("movingTask", movingTask);
  }

  return (
    <div>
      {taskCard?.map((task) => {
        return (
          <div
            key={task._id}
            className=" border p-3 rounded-lg bg-[#F9F9F9] mb-4 cursor-pointer"
            onClick={() => {
              setTask({
                _id: task._id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                deadline: task.deadline,
                status: task.status,
              });
              setShowPopup(true);
            }}
            onDragStart={(e) => handleOnDrag(e, JSON.stringify(task))}
            draggable
          >
            <div className=" font-[500] text-sm text-[#606060] mb-1 break-words hyphens-auto">
              {task.title}
            </div>
            <div className="text-xs text-[#797979] mb-4 break-words hyphens-auto">
              {task.description}
            </div>
            <div className=" text-white text-xs mb-4">
              <span
                className={` ${!task.priority && " hidden"} 
                ${task.priority === "Low" && "bg-[#0ECC5A]"}   
                ${task.priority === "Medium" && "bg-[#FFA235]"}
                ${task.priority === "Urgent" && "bg-[#FF6B6B]"}
                
                rounded-md p-[0.30rem]`}
              >
                {task.priority}
              </span>
            </div>
            <div
              className={`flex gap-2 mb-3 items-center ${
                !task.deadline && "hidden"
              }`}
            >
              <TimeIcon />
              <span className="text-[#606060] text-xs font-bold">
                {task.deadline?.toString()}
              </span>
            </div>
            <div className="text-[#797979] text-xs ">
              {timePassedFunction(task.createdAt!)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskCard;
