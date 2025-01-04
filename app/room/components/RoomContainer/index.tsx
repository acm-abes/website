import React, { ReactNode } from "react";
import style from "./room_container.module.css";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  bgUrl: string | null;
}

const RoomContainer = ({
  children,
  bgUrl,
}: Props) => {
  const backgroundStyle = bgUrl
    ? {
        background: `linear-gradient(rgba(3, 7, 18, 0.5), rgba(3, 7, 18, 0.5)), url(${bgUrl}) center/cover no-repeat`,
      }
    : {};

  return (
    <>
      <section
        id="space"
        style={backgroundStyle}
        className={clsx(style.room_container, "bottom-border")}
      >
        <div className="min-h-[calc(100vh+30vh)] h-[100%] max-w-[100vw] min-[570px]:w-[calc(100vw-100px)] md:w-[calc(100vw-100px)] xl:w-[1120px] my-0 mx-auto">
          {children}
        </div>
      </section>
    </>
  );
};

export default RoomContainer;
