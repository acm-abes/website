import Image from "next/image";

const index = () => {
  return (
    <>
      <div className="rounded-xl aspect-[500/500] w-40 h-40 max-w-40 max-h-40 relative overflow-hidden transition ease-in-out delay-100 hover:scale-90">
        <Image
          src="/assets/room/lisa_assistant_3.png"
          alt="Example Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </>
  );
};

export default index;
