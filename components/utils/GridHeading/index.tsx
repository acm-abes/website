import React from "react";

interface MyComponentProps {
  children: React.ReactNode;
}
const GridHeading: React.FC<MyComponentProps> = ({ children }) => {
  return (
    <>
      <div className="grid_header mb-[40px]">
        <div className="heading_border_r_l h-[20px] mx-[20px]"></div>
        <div className="heading_border_t_b px-[20px]">
          <div className="heading_border_r_l py-[10px] px-[20px]">
            {children}
          </div>
        </div>
        <div className="heading_border_r_l h-[20px] mx-[20px]"></div>
      </div>
    </>
  );
};

export default GridHeading;
