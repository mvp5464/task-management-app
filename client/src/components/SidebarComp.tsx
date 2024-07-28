import AnalyticsIcon from "./icons/AnalyticsIcon";
import BellIcon from "./icons/BellIcon";
import BoardsIcon from "./icons/BoardsIcon";
import DoubleArrowIcon from "./icons/DoubleArrowIcon";
import DownloadIcon from "./icons/DownloadIcon";
import HomeIcon from "./icons/HomeIcon";
import LoadingIcon from "./icons/LoadingIcon";
import PlusCircleIcon from "./icons/PlusCircleIcon";
import SettingsIcon from "./icons/SettingsIcon";
import TeamsIcon from "./icons/TeamsIcon";
import SideSelect from "./SideSelect";

const SidebarComp = () => {
  return (
    <>
      <div className=" bg-fuchsia-400 h-screen border-r p-3 flex flex-col justify-between ">
        <div>
          <div className="flex gap-2">
            <div>img</div>
            <div>Joe Gardner</div>
          </div>
          <div className=" flex justify-between">
            <div className=" flex gap-3">
              <BellIcon />
              <LoadingIcon />
              <DoubleArrowIcon />
              {/* <div>b i</div>
              <div>l i</div>
              <div>f i</div> */}
            </div>
            <button>Logout</button>
          </div>
          <div>
            <SideSelect icon={<HomeIcon />} name={"Home"} />
            <SideSelect icon={<BoardsIcon />} name={"Boards"} />
            <SideSelect icon={<SettingsIcon />} name={"Settings"} />
            <SideSelect icon={<TeamsIcon />} name={"Teams"} />
            <SideSelect icon={<AnalyticsIcon />} name={"Analytics"} />
          </div>
          <div>
            <button>
              <span>Create new task&nbsp;</span>
              <PlusCircleIcon />
            </button>
          </div>
        </div>
        <div className=" flex">
          <DownloadIcon />
          <div>
            <div>Download the app</div>
            <div>Get the full experience</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarComp;
