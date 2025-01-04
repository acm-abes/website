import React, { useState } from "react";
import style from "./quiz_layout.module.css";
import clsx from "clsx";

type QuizProps = {
  options: string[];
  onOptionClick: (index: number) => void; // Callback to set selected option
};

const QuizLayout: React.FC<QuizProps> = ({
  options,
  onOptionClick,
}) => {
  const [selectedOptionState, setSelectedOptionState] = useState<number | null>(null);

  // Function to handle option selection
  const handleOptionClick = (index: number): void => {
    // showing which option selected, showing in current component
    setSelectedOptionState(index);

    //Notify parent of option click
    onOptionClick(index);
  };

  return (
    <div className={clsx(" mx-auto p-6 rounded-lg shadow-lg")}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Grid layout */}
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            className={`w-full py-3 px-4 text-left rounded-lg border-2 transition-all duration-200 
              ${
                selectedOptionState === index
                  ? clsx(
                      style.blur_bg_selected,
                      "border-blue-500 text-blue-700"
                    )
                  : clsx(style.blur_bg, "border-gray-300")
              }
            `}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedOptionState !== null && (
        <div className="mt-4 text-lg text-green-600">
          You selected:{" "}
          <span className="font-semibold">{options[selectedOptionState]}</span>
        </div>
      )}
    </div>
  );
};

export default QuizLayout;
