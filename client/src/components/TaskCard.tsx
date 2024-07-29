import { TaskType } from "@/context/AllContextProvider";
import TimeIcon from "./icons/TimeIcon";

const TaskCard = ({ taskCard }: { taskCard?: TaskType[] }) => {
  return (
    <div>
      {/* {taskCard?.map((task) => {
        return (
          <>
            <div>{task.title}</div>
            <div>{task.description}</div>
            <div>{task.priority}</div>
            <div>
              <TimeIcon />
              <span>{task.deadline?.toString()}</span>
            </div>
            <div>{task.time}</div>
          </>
        );
      })} */}
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
              <span className=" bg-[#FF6B6B] rounded-md p-[0.30rem]">
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
      <div className=" border p-3 rounded-lg bg-[#F9F9F9]">
        <div className=" font-[500] text-sm text-[#606060] mb-1">
          {"Implement User Authentication"}
        </div>
        <div className="text-xs text-[#797979] mb-4">
          {
            "Develop and integrate user authentication using email and password."
          }
        </div>
        <div className=" text-white text-xs mb-4">
          <span className=" bg-[#FF6B6B] rounded-md p-[0.30rem]">
            {"Urgent"}
          </span>
        </div>
        <div className="flex gap-2 mb-3 items-center">
          <TimeIcon />
          <span className="text-[#606060] text-xs font-bold">
            {"2024-08-15"}
          </span>
        </div>
        <div className="text-[#797979] text-xs ">{"1 hr ago"}</div>
      </div>
    </div>
  );
};

export default TaskCard;
