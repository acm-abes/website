import React from "react";
import Image from "next/image";

interface Props {
  contestants: { name: string; image?: string; points: number }[];
}

const ContestLeaderBoard = ({ contestants }: Props) => {
  return (
    <ul className="w-full border rounded divide-y">
      {contestants.map((contestant) => (
        <li
          key={contestant.name}
          className={"w-full p-2 flex justify-between items-center"}
        >
          <div className={"flex space-x-2 items-center"}>
            {contestant.image ? (
              <Image
                className={"rounded-full"}
                src={contestant.image}
                width={256}
                height={256}
                alt={contestant.name}
              />
            ) : (
              <div
                className={
                  "bg-pink-400 w-8 h-8 flex items-center justify-center rounded-full"
                }
              >
                {contestant.name
                  .split(" ")
                  .map((item) => item[0])
                  .slice(0, 2)
                  .join("")}
              </div>
            )}
            <span>{contestant.name}</span>
          </div>
          <span>{contestant.points}</span>
        </li>
      ))}
    </ul>
  );
};

export default ContestLeaderBoard;
