'use client'

/* 
* https://stackoverflow.com/questions/57462781/burgermenu-animation-in-css-rotate-and-transform-of-two-lines
*
* Maths of achieving this is taken from above source
* Its fucking 4:00 AM, and here I am writing this, which no one gonna read :)
*
* Implemented by github.com/SaketV8
*/

import React, { useState } from "react";


const HamBurger = ({ onToggle, ham_ref }) => {
  const [rotate, setRotation] = useState(false);
  const bar_top_rotation_style = {
    transition: "transform 0.2s ease",
    WebkitTransform: rotate ? "translateY(6.5px) rotate(45deg)" : "none",
    transform: rotate ? "translateY(6.5px) rotate(45deg)" : "none",
  };
  
  const bar_bottom_rotation_style = {
    transition: "transform 0.2s ease",
    WebkitTransform: rotate ? "translateY(-6.5px) rotate(-45deg)" : "none",
    transform: rotate ? "translateY(-6.5px) rotate(-45deg)" : "none",
  };


  const handleClick = () => {
    setRotation(!rotate)
    console.log(rotate)
    onToggle()
  }

  return (
    <>
      <div ref={ham_ref} className="inline-block md:hidden" onClick={() => handleClick()} >
        <div style={bar_top_rotation_style} className="bg-[var(--nav-bar-color)] w-[22px] h-[1.5px] mb-[5px]"></div>
        <div className="w-[22px] h-[1px] my-[0]"></div>
        <div style={bar_bottom_rotation_style} className="bg-[var(--nav-bar-color)] w-[22px] h-[1.5px] mt-[5px]"></div>
      </div>
    </>
  );
};

export default HamBurger;
