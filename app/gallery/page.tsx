import React from "react";
import { RiSearchLine } from "react-icons/ri";
const Gallery = async () => {
  const pictures = [""];

  return (
    <main
      className={"w-full h-full flex flex-col p-5 md:px-20 lg:px-36 space-y-7"}
    >
      <h1 className="text-4xl">Gallery</h1>
      <hr className={"border-b border-cyan-900 "} />
      {/*<Loading />*/}
      {pictures ? (
        <div
          className={
            "w-full h-full flex flex-col py-20 items-center justify-center"
          }
        >
          <RiSearchLine className={"text-[200px]"} />
          <h1 className={"text-3xl md:text-5xl"}>Gallery is Empty</h1>
        </div>
      ) : (
        <div
          className={"w-full h-full grid grid-cols-1 gap-5 sm:grid-cols-2"}
        ></div>
      )}
    </main>
  );
};

export default Gallery;
