import {
  PopupContextProvider,
  TaskContextProvider,
} from "@/context/AllContextProvider";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TaskContextProvider>
      <PopupContextProvider>{children}</PopupContextProvider>
    </TaskContextProvider>
  );
};
