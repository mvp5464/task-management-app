import LinesIcon from "./icons/LinesIcon";
import PlusIcon from "./icons/PlusIcon";
import TaskCard from "./TaskCard";

export interface TaskType {
  title: string;
  description: string;
  priority: string;
  deadline: string;
  time: string;
}

const TaskSection = ({
  status,
  taskCard,
}: {
  status: string;
  taskCard?: TaskType[];
}) => {
  return (
    <>
      <div>
        <div className=" flex justify-between mb-4">
          <div className=" text-[#555555] text-lg ">{status}</div>
          <LinesIcon />
        </div>
        <div className="mb-4">
          {/* {taskCard && <TaskCard taskCard={taskCard} />} */}
          <TaskCard taskCard={taskCard} />
        </div>
        <button className=" flex justify-between items-center w-full bg-gradient-to-b from-[#3A3A3A] to-[#202020] text-white p-2 rounded-lg">
          <span className="text-sm ">Add new</span>
          <PlusIcon />
        </button>
      </div>
    </>
  );
};

export default TaskSection;
