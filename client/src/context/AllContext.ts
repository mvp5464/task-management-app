import { createContext, Dispatch, SetStateAction } from "react";
import { TaskType, UserType } from "./AllContextProvider";

interface PopupContextType {
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
}

interface TaskContextType {
  task: TaskType;
  setTask: Dispatch<SetStateAction<TaskType>>;
}

interface UserContextType {
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
}

export const UserContext = createContext<UserContextType>({
  user: {
    fullName: "",
    email: "",
    password: "",
  },
  setUser: () => {},
});

export const TaskContext = createContext<TaskContextType>({
  task: {
    title: "",
    description: "",
    status: "",
    priority: "",
    deadline: "",
  },
  setTask: () => {},
});

export const PopupContext = createContext<PopupContextType>({
  showPopup: false,
  setShowPopup: () => {},
});
