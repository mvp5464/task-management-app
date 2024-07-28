"use client";
import { Dispatch, SetStateAction } from "react";
import PopupSection from "./PopupSection";
import CrossIcon from "./icons/CrossIcon";
import TwoSideArrowIcon from "./icons/TwoSideArrowIcon";
import ShareIcon from "./icons/ShareIcon";
import StarIcon from "./icons/StarIcon";
import DangerIcon from "./icons/DangerIcon";
import CalendarIcon from "./icons/CalendarIcon";
import PenIcon from "./icons/PenIcon";
import PlusBlackIcon from "./icons/PlusBlackIcon";
import LoadingIcon from "./icons/LoadingIcon";

const TaskPopup = ({
  setShowPopup,
}: {
  setShowPopup: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className=" fixed inset-0 bg-black/60 flex justify-center h-screen  items-center"
      onClick={() => {
        setShowPopup(false);
      }}
    >
      <div
        className="bg-white px-6 py-4 w-[100%] max-w-[38rem] h-full max-h-[100%] overflow-y-auto right-0 fixed"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className=" flex justify-between items-center mb-6">
            <div className=" flex items-center gap-3">
              <button onClick={() => setShowPopup(false)}>
                <CrossIcon />
              </button>
              <button>
                <TwoSideArrowIcon />
              </button>
            </div>
            <div className=" flex gap-4">
              <div className=" flex gap-4 p-[0.45rem] rounded-md bg-[#F4F4F4] text-[0.9rem] text-[#797979]">
                <span>Share</span>
                <ShareIcon className="w-5 h-5" />
              </div>
              <div className=" flex gap-4 p-[0.45rem] rounded-md bg-[#F4F4F4] text-[0.9rem] text-[#797979]">
                <span>Favorite</span>
                <StarIcon className="w-5 h-5" />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Title"
              className="w-full h-14 font-semibold text-[2.7rem] placeholder:text-[#CCCCCC]"
            />
          </div>
          <div>
            <PopupSection logo={<LoadingIcon />} title={"Status"} />
            <PopupSection logo={<DangerIcon />} title={"Priority"} />
            <PopupSection logo={<CalendarIcon />} title={"Deadline"} />
            <PopupSection logo={<PenIcon />} title={"Description"} />
          </div>
          <div className=" flex gap-4 border-b pb-6 mb-6">
            <PlusBlackIcon />
            Add custom property
          </div>
          <input
            type="text"
            placeholder="Start writing, or drag your own files here."
            className="w-full placeholder:text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskPopup;
