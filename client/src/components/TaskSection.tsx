import React from "react";
import LinesIcon from "./icons/LinesIcon";
import TimeIcon from "./icons/TimeIcon";
import PlusIcon from "./icons/PlusIcon";

interface TaskType {
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
        <div className=" flex justify-between">
          <div>{status}</div>
          <LinesIcon />
        </div>
        <div>
          {taskCard?.map((task) => {
            return (
              <>
                <div>{task.title}</div>
                <div>{task.description}</div>
                <div>{task.priority}</div>
                <div>
                  <TimeIcon />
                  <span>{task.deadline}</span>
                </div>
                <div>{task.time}</div>
              </>
            );
          })}
        </div>
        <div>
          <div>Title</div>
          <div>Description</div>
          <div>Priority</div>
          <div>Deadline</div>
          <div>time</div>
        </div>
        <button className=" flex justify-between w-full">
          <span>Add new</span>
          <PlusIcon />
        </button>
      </div>
    </>
  );
};

export default TaskSection;
