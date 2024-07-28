import SidebarComp from "../SidebarComp";
import IntroSection from "../IntroSection";
import TaskSection from "../TaskSection";
import QuestionIcon from "../icons/QuestionIcon";
import CalendarIcon from "../icons/CalendarIcon";
import AutomationIcon from "../icons/AutomationIcon";
import FilterIcon from "../icons/FilterIcon";
import ShareIcon from "../icons/ShareIcon";
import PlusCircleIcon from "../icons/PlusCircleIcon";

const DashBoardComp = () => {
  return (
    <div className=" grid grid-cols-[1fr,4fr] w-full">
      <SidebarComp />
      <div className=" p-3">
        <div className=" flex justify-between">
          <div>Good morning, Joe!</div>
          <div>
            <span>Help & feedback&nbsp;</span>
            <QuestionIcon />
          </div>
        </div>
        <div className=" flex">
          <IntroSection
            image={"/IntroducingImage.png"}
            title={"Introducing tags"}
            description={
              "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient."
            }
          />
          <IntroSection
            image={"/ShareImage.png"}
            title={"Share Notes Instantly"}
            description={
              "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options."
            }
          />
          <IntroSection
            image={"/AccessImage.png"}
            title={"Access Anywhere"}
            description={
              "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer."
            }
          />
        </div>
        <div className=" flex justify-between">
          <div>
            <input type="text" placeholder="Search" />
          </div>
          <div className=" flex gap-3">
            <div>
              <span>Calender view</span>
              <CalendarIcon />
            </div>
            <div>
              <span>Automation</span>
              <AutomationIcon />
            </div>
            <div>
              <span>Filter</span>
              <FilterIcon />
            </div>
            <div>
              <span>Share</span>
              <ShareIcon />
            </div>
            <button>
              <span>Create new task&nbsp;</span>
              <PlusCircleIcon />
            </button>
          </div>
        </div>
        <div className=" grid grid-cols-4 gap-3">
          <TaskSection status={"To do"} />
          <TaskSection status={"In progress"} />
          <TaskSection status={"Under review"} />
          <TaskSection status={"Finished"} />
        </div>
      </div>
    </div>
  );
};

export default DashBoardComp;
