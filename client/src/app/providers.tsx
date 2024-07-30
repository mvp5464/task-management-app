import {
  PopupContextProvider,
  TaskContextProvider,
} from "@/context/AllContextProvider";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TaskContextProvider>
      <PopupContextProvider>
        <Toaster />
        {children}
      </PopupContextProvider>
    </TaskContextProvider>
  );
};
