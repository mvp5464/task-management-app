import { TaskType } from "@/context/AllContextProvider";
import TimeIcon from "./icons/TimeIcon";

const TaskCard = ({ taskCard }: { taskCard?: TaskType[] }) => {
  return (
    <div>
      {taskCard?.map((task) => {
        return (
          <div
            key={task._id}
            className=" border p-3 rounded-lg bg-[#F9F9F9] mb-4"
          >
            <div className=" font-[500] text-sm text-[#606060] mb-1">
              {task.title}
            </div>
            <div className="text-xs text-[#797979] mb-4">
              {task.description}
            </div>
            <div className=" text-white text-xs mb-4">
              <span
                className={`${task.priority === "Low" && "bg-[#0ECC5A]"}   
                ${task.priority === "Medium" && "bg-[#FFA235]"}
                ${task.priority === "Urgent" && "bg-[#FF6B6B]"}
                ${task.priority === "null" && "bg-[#ffffff]"}
                rounded-md p-[0.30rem]`}
              >
                {task.priority}
              </span>
            </div>
            <div className="flex gap-2 mb-3 items-center">
              <TimeIcon />
              <span className="text-[#606060] text-xs font-bold">
                {task.deadline?.toString()}
              </span>
            </div>
            <div className="text-[#797979] text-xs ">{"1 hr ago"}</div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskCard;
