"use client";
import { ReactNode, useState } from "react";
import { TaskContext, UserContext } from "./AllContext";

export interface UserType {
  fullName: string;
  email: string;
  password: string;
}

export interface TaskType {
  title: string;
  description: string;
  status: string;
  priority: "Low" | "Medium" | "Urgent" | "null";
  deadline: Date | null;
}

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
    priority: "null",
    deadline: null,
  });

  return (
    <TaskContext.Provider value={{ task, setTask }}>
      {children}
    </TaskContext.Provider>
  );
};
