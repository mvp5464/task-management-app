import {
  PopupContextProvider,
  TaskContextProvider,
  UserContextProvider,
} from "@/context/AllContextProvider";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <UserContextProvider>
      <TaskContextProvider>
        <PopupContextProvider>{children}</PopupContextProvider>
      </TaskContextProvider>
    </UserContextProvider>
  );
};
