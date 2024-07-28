import Image from "next/image";

const IntroSection = ({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) => {
  return (
    <>
      <div className=" flex gap-2">
        <div className=" flex justify-center items-center">
          <Image
            src={image}
            className="w-full h-20 mr-2"
            alt="Icon"
            width={250}
            height={250}
          />
        </div>
        <div>
          <div>{title}</div>
          <div>{description}</div>
        </div>
      </div>
    </>
  );
};

export default IntroSection;
