import React from "react";

const SideSection = ({ icon, name }: { icon: JSX.Element; name: string }) => {
  return (
    <>
      <div
        className={`flex gap-2 w-full px-2 py-1 text-[#797979] hover:shadow-lg hover:bg-neutral-100 ${
          name === "Home" && "bg-[#F4F4F4] border border-[#DDDDDD] rounded-sm"
        } `}
      >
        <div>{icon}</div>
        <div>{name}</div>
      </div>
    </>
  );
};

export default SideSection;
