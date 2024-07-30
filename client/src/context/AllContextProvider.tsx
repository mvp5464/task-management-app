"use client";
import { ReactNode, useState } from "react";
import { PopupContext, TaskContext } from "./AllContext";

export interface TaskType {
  _id?: string;
  title: string;
  description?: string;
  status: "To do" | "In progress" | "Under review" | "Finished" | "";
  priority?: "Low" | "Medium" | "Urgent" | "";
  deadline?: string;
}

export type StatusType =
  | "To do"
  | "In progress"
  | "Under review"
  | "Finished"
  | "";

export const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const [task, setTask] = useState<TaskType>({
    title: "",
    description: "",
    status: "",
    priority: "",
    deadline: "",
  });

  return (
    <TaskContext.Provider value={{ task, setTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const PopupContextProvider = ({ children }: { children: ReactNode }) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  return (
    <PopupContext.Provider value={{ showPopup, setShowPopup }}>
      {children}
    </PopupContext.Provider>
  );
};
