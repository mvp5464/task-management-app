const TabSection = ({ name, icon }: { name: string; icon: JSX.Element }) => {
  return (
    <div className="flex gap-2 px-2 py-1 rounded-md bg-[#F4F4F4] shrink-0 text-[#797979]">
      <div>{name}</div>
      <div>{icon}</div>
    </div>
  );
};

export default TabSection;
