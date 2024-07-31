"use client";
import { useContext, useEffect, useState } from "react";
import AnalyticsIcon from "./icons/AnalyticsIcon";
import BellIcon from "./icons/BellIcon";
import BoardsIcon from "./icons/BoardsIcon";
import DoubleArrowIcon from "./icons/DoubleArrowIcon";
import DownloadIcon from "./icons/DownloadIcon";
import HomeIcon from "./icons/HomeIcon";
import PlusCircleIcon from "./icons/PlusCircleIcon";
import SettingsIcon from "./icons/SettingsIcon";
import TeamsIcon from "./icons/TeamsIcon";
import SideSection from "./SideSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoadingIcon from "./icons/LoadingIcon";
import { useRouter } from "next/navigation";
import { PopupContext } from "@/context/AllContext";

const SidebarComp = ({}: {}) => {
  const { setShowPopup } = useContext(PopupContext);
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    setUser(localStorage.getItem("app-name")!);
  }, []);

  const router = useRouter();

  return (
    <>
      <div className=" bg-white h-screen sticky inset-0 border-r1 p-3 flex flex-col justify-between ">
        <div>
          <div className="flex gap-2 items-center my-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png1" />
              <AvatarFallback className=" bg-slate-400 text-white">
                {user?.split(" ")[0][0]}
              </AvatarFallback>
            </Avatar>
            <div>{user}</div>
          </div>
          <div className=" flex justify-between items-center mb-2">
            <div className=" flex gap-4">
              <BellIcon />
              <LoadingIcon notification={true} />
              <DoubleArrowIcon />
            </div>
            <button
              className=" bg-[#F4F4F4] py-2 px-1 rounded-lg text-[#797979] hover:shadow-lg hover:shadow-slate-400 "
              onClick={() => {
                localStorage.removeItem("app-token");
                router.push("/login");
              }}
            >
              Logout
            </button>
          </div>
          <div className=" flex flex-col gap-1 mb-2">
            <SideSection icon={<HomeIcon />} name={"Home"} />
            <SideSection icon={<BoardsIcon />} name={"Boards"} />
            <SideSection icon={<SettingsIcon />} name={"Settings"} />
            <SideSection icon={<TeamsIcon />} name={"Teams"} />
            <SideSection icon={<AnalyticsIcon />} name={"Analytics"} />
          </div>
          <div className="bg-gradient-to-b  from-[#4B36CC] to-[#9C93D4] rounded-lg">
            <button
              className=" bg-gradient-to-b from-[#4C38C2] to-[#2F2188] w-full text-white font- text-lg rounded-lg flex gap-2 py-3 justify-center items-center  hover:shadow-lg hover:shadow-slate-500"
              onClick={() => setShowPopup(true)}
            >
              <span>Create new task&nbsp;</span>
              <PlusCircleIcon />
            </button>
          </div>
        </div>
        <div className=" flex px-2 py-1 items-center bg-[#F3F3F3] text-[#666666] rounded-md">
          <DownloadIcon className=" w-10 h-10" />
          <div>
            <div className="text-lg font-[500]">Download the app</div>
            <div className="text-xs">Get the full experience</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarComp;
