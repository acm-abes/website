import React from "react";
import style from "./hint_btn.module.css";
import { Key } from "lucide-react";
import clsx from "clsx";

const HintButton = ({ onSmashBtn }: any) => {
  return (
    <>
      <div
        className={clsx(
          style.blur_bg_hint,
          "flex justify-center items-center aspect-[48/48] w-[65px] h-[65px] transition ease-in-out delay-100 hover:scale-90"
        )}
        onClick={onSmashBtn}
      >
        <Key size={48} />
      </div>
    </>
  );
};

export default HintButton;
