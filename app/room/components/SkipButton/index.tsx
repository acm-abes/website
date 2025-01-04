import React from "react";

const SkipButton = ({ btnText, onSmashBtn }: any) => {
  return (
    <>
      <div className=" flex justify-center items-center">
        <button
          onClick={onSmashBtn}
          className="mt-[80px] w-[200px] h-[50px] text-center cursor-pointer rounded-[8px] bg-[var(--text-color)] text-[var(--border-color)] text-[18px] font-medium"
        >
          {btnText}
        </button>
      </div>
    </>
  );
};

export default SkipButton;
