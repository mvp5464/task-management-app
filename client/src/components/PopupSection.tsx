const PopupSection = ({
  logo,
  title,
}: {
  logo: JSX.Element;
  title: string;
}) => {
  return (
    <div className=" flex gap-3 items-center mb-8">
      <div>{logo}</div>
      <div className=" text-[#666666] text-sm w-32">{title}</div>
      <input
        className="placeholder:text-sm"
        type="text"
        placeholder="Not selected"
      />
    </div>
  );
};

export default PopupSection;
