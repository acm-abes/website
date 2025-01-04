import React from "react";

const NextButton = ({ btnText, onSmashBtn }: any) => {
  return (
    <>
      <div className=" flex justify-center items-center">
        <button onClick={onSmashBtn} className="bg-shadow mt-[80px] w-[200px] h-[50px] text-center cursor-pointer rounded-[8px] bg-[var(--primary-color)] text-[var(--text-color)] text-[18px] font-medium">
          {btnText}
        </button>
      </div>
    </>
  );
};

export default NextButton;
