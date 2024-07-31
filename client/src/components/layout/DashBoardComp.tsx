"use client";
import SidebarComp from "../SidebarComp";
import IntroSection from "../IntroSection";
import TaskSection from "../TaskSection";
import QuestionIcon from "../icons/QuestionIcon";
import CalendarIcon from "../icons/CalendarIcon";
import AutomationIcon from "../icons/AutomationIcon";
import FilterIcon from "../icons/FilterIcon";
import ShareIcon from "../icons/ShareIcon";
import PlusCircleIcon from "../icons/PlusCircleIcon";
import TabSection from "../TabSection";
import IntroducingImg from "../icons/IntroducingImg";
import ShareImg from "../icons/ShareImg";
import AccessImg from "../icons/AccessImg";
import { DragEvent, useCallback, useContext, useEffect, useState } from "react";
import TaskPopup from "../TaskPopup";
import { StatusType, TaskType } from "@/context/AllContextProvider";
import { PopupContext } from "@/context/AllContext";
import SearchIcon from "../icons/SearchIcon";
import { useRouter } from "next/navigation";

interface CategorizedTask {
  "To do": TaskType[];
  "In progress": TaskType[];
  "Under review": TaskType[];
  Finished: TaskType[];
}

const DashBoardComp = () => {
  const { showPopup, setShowPopup } = useContext(PopupContext);
  const [user, setUser] = useState<string>("");
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [categorizedTasks, setCategorizedTasks] = useState<CategorizedTask>({
    "To do": [],
    "In progress": [],
    "Under review": [],
    Finished: [],
  });
  const router = useRouter();

  const fetchingTasks = useCallback(async () => {
    const authorization = localStorage.getItem("app-token")!;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL!}/api/v1/task/get-task`,
        {
          headers: { authorization },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setTasks(data.msg);
      }
      if (data.msg === "No JWT provided") {
        router.push("/login");
      }
    } catch (e) {
      console.log("Error while fetching data ", e);
    }
  }, [router]);

  async function handleOnDrop(e: DragEvent, status: StatusType) {
    const movingTask = e.dataTransfer.getData("movingTask");
    const movedTask: TaskType = JSON.parse(movingTask);

    if (movedTask.status === status) {
      return;
    }
    movedTask.status = status;

    const value = JSON.stringify(movedTask);
    const authorization = localStorage.getItem("app-token")!;
    try {
      const res = await fetch("http://localhost:8080/api/v1/task/update-task", {
        method: "PUT",
        body: value,
        headers: { "Content-Type": "application/json", authorization },
      });

      if (res.ok) {
        fetchingTasks();
      }
    } catch (e) {
      console.log("Error", e);
    }
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
  }

  useEffect(() => {
    const categorized: CategorizedTask = {
      "To do": [],
      "In progress": [],
      "Under review": [],
      Finished: [],
    };

    tasks.forEach((task) => {
      if (task.status !== "") {
        if (categorized[task.status]) {
          categorized[task.status].push(task);
        }
      }
    });

    setCategorizedTasks(categorized);
  }, [tasks]);

  useEffect(() => {
    fetchingTasks();
    setUser(localStorage.getItem("app-name")!);
  }, [fetchingTasks]);

  return (
    <>
      <div className=" grid grid-cols-[1fr,4fr] w-full">
        <div>
          <SidebarComp />
        </div>
        <div className=" bg-[#F4F4F4] border-l-2">
          <div className=" m-3 mt-5 mr-5 bg-white">
            <div className=" flex justify-between">
              <div className=" font-semibold text-[2.4rem] py-2">
                Good morning, {user?.split(" ")[0]}
              </div>
              <div className=" flex gap-1 mt-3">
                <span>Help & feedback&nbsp;</span>
                <QuestionIcon />
              </div>
            </div>
            <div className=" flex gap-3 mb-4">
              <IntroSection
                image={<IntroducingImg className="w-16 h-16" />}
                title={"Introducing tags"}
                description={
                  "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient."
                }
              />
              <IntroSection
                image={<ShareImg className="w-16 h-16" />}
                title={"Share Notes Instantly"}
                description={
                  "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options."
                }
              />
              <IntroSection
                image={<AccessImg className="w-16 h-16" />}
                title={"Access Anywhere"}
                description={
                  "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer."
                }
              />
            </div>
            <div className=" flex justify-between items-center mb-4">
              <div className=" relative">
                <input
                  className="w-44 p-1 border rounded-md"
                  type="text"
                  placeholder="Search"
                />
                <button className="absolute -bottom-0.5 -right-2 flex h-10 items-center px-4 text-gray-600">
                  <SearchIcon />
                </button>
              </div>
              <div className=" flex gap-3">
                <div className="flex justify-center items-center gap-3">
                  <TabSection name={"Calender view"} icon={<CalendarIcon />} />
                  <TabSection name={"Automation"} icon={<AutomationIcon />} />
                  <TabSection name={"Filter"} icon={<FilterIcon />} />
                  <TabSection name={"Share"} icon={<ShareIcon />} />
                </div>
                <button
                  className=" bg-gradient-to-b from-[#4C38C2] to-[#2F2188] px-2 py-1 text-white font- text-[0.9rem] rounded-lg flex gap-2 justify-center items-center"
                  onClick={() => setShowPopup(true)}
                >
                  <span>Create new&nbsp;</span>
                  <PlusCircleIcon />
                </button>
              </div>
            </div>
            <div className=" grid grid-cols-4 gap-5 px-4">
              <div
                onDrop={(e) => handleOnDrop(e, "To do")}
                onDragOver={handleDragOver}
              >
                <TaskSection
                  taskCard={categorizedTasks["To do"]}
                  status={"To do"}
                />
              </div>
              <div
                onDrop={(e) => handleOnDrop(e, "In progress")}
                onDragOver={handleDragOver}
              >
                <TaskSection
                  taskCard={categorizedTasks["In progress"]}
                  status={"In progress"}
                />
              </div>
              <div
                onDrop={(e) => handleOnDrop(e, "Under review")}
                onDragOver={handleDragOver}
              >
                <TaskSection
                  taskCard={categorizedTasks["Under review"]}
                  status={"Under review"}
                />
              </div>
              <div
                onDrop={(e) => handleOnDrop(e, "Finished")}
                onDragOver={handleDragOver}
              >
                <TaskSection
                  taskCard={categorizedTasks["Finished"]}
                  status={"Finished"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className=" ">
          <TaskPopup fetchingTasks={fetchingTasks} />
        </div>
      )}
    </>
  );
};

export default DashBoardComp;
