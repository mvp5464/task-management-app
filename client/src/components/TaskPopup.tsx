"use client";
import { Dispatch, SetStateAction, useContext, useState } from "react";
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
import { TrashIcon } from "@radix-ui/react-icons";
import toast, { LoaderIcon } from "react-hot-toast";

const TaskPopup = ({
  fetchingTasks,
}: {
  fetchingTasks: () => Promise<void>;
}) => {
  const { setShowPopup } = useContext(PopupContext);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const {
    task,
    setTask,
  }: { task: TaskType; setTask: Dispatch<SetStateAction<TaskType>> } =
    useContext(TaskContext);

  async function handleSubmit() {
    const value = JSON.stringify(task);
    const authorization = localStorage.getItem("app-token")!;
    setSaveLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/task/${
          task._id ? "update-task" : "create-task"
        }`,
        {
          method: `${task._id ? "PUT" : "POST"}`,
          body: value,
          headers: { "Content-Type": "application/json", authorization },
        }
      );

      const data = await res.json();

      if (res.ok) {
        fetchingTasks();
        setTask({
          title: "",
          description: "",
          deadline: "",
          status: "",
          priority: "",
        });
        setShowPopup(false);
        toast.success(data.msg);
      } else {
        console.log("DELETE ERROR");
        toast.error(data.msg);
      }
    } catch (e) {
      console.log("Error", e);
      toast.error("Error while completing opration");
    }
    setSaveLoading(false);
  }

  async function handleDelete() {
    const authorization = localStorage.getItem("app-token")!;
    setDeleteLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL!}/api/v1/task/delete-task`,
        {
          method: "DELETE",
          body: JSON.stringify({ _id: task._id }),
          headers: { "Content-Type": "application/json", authorization },
        }
      );

      const data = await res.json();

      if (res.ok) {
        fetchingTasks();
        setTask({
          title: "",
          description: "",
          deadline: "",
          status: "",
          priority: "",
        });
        toast.success(data.msg);
      } else {
        console.log("DELETE ERROR");
        toast.error(data.msg);
      }

      setShowPopup(false);
    } catch (e) {
      console.log("Error while deleting Task:", e);
      toast.error("Error while deleting Task");
    }
    setDeleteLoading(false);
  }

  return (
    <div
      className=" fixed inset-0 bg-black/60 flex justify-center h-screen  items-center"
      onClick={() => {
        setShowPopup(false);
        setTask({
          title: "",
          description: "",
          deadline: "",
          status: "",
          priority: "",
        });
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
                onClick={() => {
                  setShowPopup(false);
                  setTask({
                    title: "",
                    description: "",
                    deadline: "",
                    status: "",
                    priority: "",
                  });
                }}
              >
                <CrossIcon />
              </button>
              <button>
                <TwoSideArrowIcon />
              </button>
            </div>
            <div className=" flex gap-4">
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
              value={task.title}
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
            className="w-full placeholder:text-sm text-[#666666] py-2 mb-10"
          />
          <div className=" flex justify-center gap-10">
            <button
              className=" flex gap-4 p-[0.45rem] rounded-md bg-[#F4F4F4] text-[0.9rem] text-[#797979]"
              disabled={saveLoading || deleteLoading}
              onClick={handleSubmit}
            >
              {task._id ? <span>Update</span> : <span>Save</span>}
              {saveLoading ? (
                <LoaderIcon />
              ) : (
                <DownloadIcon className="w-5 h-5" />
              )}
            </button>
            {task._id && (
              <button
                className=" flex gap-4 p-[0.45rem] rounded-md bg-[#F4F4F4] text-[0.9rem] text-[#797979]"
                disabled={saveLoading || deleteLoading}
                onClick={handleDelete}
              >
                <span>Delete</span>
                {deleteLoading ? (
                  <LoaderIcon />
                ) : (
                  <TrashIcon className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPopup;
