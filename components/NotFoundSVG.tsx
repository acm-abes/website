import React from "react";
import Image from "next/image";

const NotFoundSvg = () => {
  return (
    <Image width={512} height={512} src={"/assets/404-error.svg"} alt={""} />
  );
};

export default NotFoundSvg;
