"use client";
import { ReactNode, useState } from "react";
import { PopupContext, TaskContext, UserContext } from "./AllContext";

export interface UserType {
  fullName: string;
  email: string;
  password: string;
}

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

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>({
    fullName: "",
    email: "",
    password: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

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
