import React from "react";

const SideSelect = ({ icon, name }: { icon: JSX.Element; name: string }) => {
  return (
    <>
      <div className="flex gap-2">
        <div>{icon}</div>
        <div>{name}</div>
      </div>
    </>
  );
};

export default SideSelect;
