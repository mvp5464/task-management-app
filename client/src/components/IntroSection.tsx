const IntroSection = ({
  image,
  title,
  description,
}: {
  image: JSX.Element;
  title: string;
  description: string;
}) => {
  return (
    <>
      <div className=" grid grid-cols-[1fr,3fr] gap-2 w-full h-28 border py-3 px-1 border-[#F4F4F4] rounded-lg  hover:shadow-lg hover:shadow-slate-500">
        <div className="flex justify-center items-center bg-blue-3001">
          <div className=" flex justify-center items-center bg-fuchsia-4001 ">
            {image}
          </div>
        </div>
        <div>
          <div className=" text-[#757575] text-md font-semibold">{title}</div>
          <div className=" text-[#868686] text-[0.82rem] leading-4">
            {description}
          </div>
        </div>
      </div>
    </>
  );
};

export default IntroSection;
