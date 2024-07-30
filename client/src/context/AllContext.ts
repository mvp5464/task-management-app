import { createContext, Dispatch, SetStateAction } from "react";
import { TaskType } from "./AllContextProvider";

interface PopupContextType {
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
}

interface TaskContextType {
  task: TaskType;
  setTask: Dispatch<SetStateAction<TaskType>>;
}

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
