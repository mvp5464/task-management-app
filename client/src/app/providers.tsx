import {
  TaskContextProvider,
  UserContextProvider,
} from "@/context/AllContextProvider";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <UserContextProvider>
      <TaskContextProvider>{children}</TaskContextProvider>
    </UserContextProvider>
  );
};
