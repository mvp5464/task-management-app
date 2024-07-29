"use client";
import { Dispatch, SetStateAction, useContext } from "react";
import PopupSection from "./PopupSection";
import CrossIcon from "./icons/CrossIcon";
import TwoSideArrowIcon from "./icons/TwoSideArrowIcon";
import ShareIcon from "./icons/ShareIcon";
import StarIcon from "./icons/StarIcon";
import DangerIcon from "./icons/DangerIcon";
import CalendarIcon from "./icons/CalendarIcon";
import PenIcon from "./icons/PenIcon";
import PlusBlackIcon from "./icons/PlusBlackIcon";
import LoadingIcon from "./icons/LoadingIcon";
import { PopupContext, TaskContext } from "@/context/AllContext";
import { TaskType } from "@/context/AllContextProvider";
import DownloadIcon from "./icons/DownloadIcon";
// import { StatusType } from "./layout/DashBoardComp";

const TaskPopup = ({
  fetchingTasks,
}: {
  fetchingTasks: () => Promise<void>;
}) => {
  const { setShowPopup } = useContext(PopupContext);

  const {
    task,
    setTask,
  }: { task: TaskType; setTask: Dispatch<SetStateAction<TaskType>> } =
    useContext(TaskContext);

  console.log({ taskSend: task });
  async function handleSubmit() {
    if (task.title.length <= 0 || task.status.length <= 0) {
      // show error
    }
    const value = JSON.stringify(task);
    try {
      const res = await fetch("http://localhost:8080/api/v1/task/create", {
        method: "POST",
        body: value,
        headers: { "Content-Type": "application/json" },
      });

      console.log(res);
      if (res.ok) {
        //show conformation TOSTER
        fetchingTasks();
        setShowPopup({ popup: false, status: "" });
      } else {
        // show error TOSTER
      }

      const data = await res.json();
      console.log({ data });
    } catch (e) {
      console.log("Error", e);
    }
  }

  return (
    <div
      className=" fixed inset-0 bg-black/60 flex justify-center h-screen  items-center"
      onClick={() => {
        setShowPopup({ popup: false, status: "" });
      }}
    >
      <div
        className="bg-white px-6 py-4 w-[100%] max-w-[38rem] h-full max-h-[100%] overflow-y-auto right-0 fixed"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className=" flex justify-between items-center mb-6">
            <div className=" flex items-center gap-3">
              <button
                onClick={() => setShowPopup({ popup: false, status: "" })}
              >
                <CrossIcon />
              </button>
              <button>
                <TwoSideArrowIcon />
              </button>
            </div>
            <div className=" flex gap-4">
              <button
                className=" flex gap-4 p-[0.45rem] rounded-md bg-[#F4F4F4] text-[0.9rem] text-[#797979]"
                onClick={handleSubmit}
              >
                <span>Save</span>
                <DownloadIcon className="w-5 h-5" />
              </button>
              <div className=" flex gap-4 p-[0.45rem] rounded-md bg-[#F4F4F4] text-[0.9rem] text-[#797979]">
                <span>Share</span>
                <ShareIcon className="w-5 h-5" />
              </div>
              <div className=" flex gap-4 p-[0.45rem] rounded-md bg-[#F4F4F4] text-[0.9rem] text-[#797979]">
                <span>Favorite</span>
                <StarIcon className="w-5 h-5" />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Title"
              className="w-full h-14 font-semibold text-[2.7rem] text-[#303030] placeholder:text-[#CCCCCC]"
              onChange={(e) =>
                setTask((val: any) => ({ ...val, title: e.target.value }))
              }
            />
          </div>
          <div>
            <PopupSection logo={<LoadingIcon />} title={"Status"} />
            <PopupSection logo={<DangerIcon />} title={"Priority"} />
            <PopupSection logo={<CalendarIcon />} title={"Deadline"} />
            <PopupSection logo={<PenIcon />} title={"Description"} />
          </div>
          <div className=" flex gap-4 border-b pb-6 mb-6">
            <PlusBlackIcon />
            Add custom property
          </div>
          <input
            type="text"
            placeholder="Start writing, or drag your own files here."
            className="w-full placeholder:text-sm text-[#666666] py-2"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskPopup;
