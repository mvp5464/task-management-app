const TabSection = ({ name, icon }: { name: string; icon: JSX.Element }) => {
  return (
    <button className="flex gap-2 px-2 py-1 rounded-md bg-[#F4F4F4] shrink-0 text-[#797979]  hover:shadow-lg hover:bg-slate-300 hover:shadow-slate-200">
      <div>{name}</div>
      <div>{icon}</div>
    </button>
  );
};

export default TabSection;
