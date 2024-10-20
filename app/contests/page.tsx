import { format } from "date-fns";
import React from "react";
import Link from "next/link";
import ContestLeaderBoard from "@/components/ContestLeaderBoard";

interface Contest {
  name: string;
  date: {
    start: string;
    end: string;
  };
  url: string;
}

const getContests = (): Contest[] => {
  return [
    {
      name: "Blind coding",
      date: {
        start: "2024-10-21T15:09:50.666Z",
        end: "2024-10-21T16:09:50.666Z",
      },
      url: "",
    },
    {
      name: "Blind coding 2",
      date: {
        start: "2024-10-10T15:09:50.666Z",
        end: "2024-10-10T16:09:50.666Z",
      },
      url: "",
    },
    {
      name: "Blind coding 3",
      date: {
        start: "2024-10-19T15:09:50.666Z",
        end: "2024-10-19T16:09:50.666Z",
      },
      url: "",
    },
  ];
};

const ContestsPage = () => {
  const contests = getContests();

  const contestants = [
    {
      name: "Kunal Rana",
      points: 9999,
    },
    {
      name: "Lavesh Gupta",
      points: 9999,
    },
  ];

  return (
    <main className={"container-x container-y space-y-5"}>
      <h1 className={"text-4xl"}>Contests</h1>
      <section>
        <ContestLeaderBoard contestants={contestants} />
      </section>
      <section className={"flex flex-col w-full space-y-2"}>
        <h2 className={"text-2xl"}>On going</h2>
        <ul className={"space-y-2"}>
          {contests.map((contest) => {
            if (new Date(contest.date.end).getTime() > Date.now()) {
              return (
                <Link
                  key={contest.url}
                  href={contest.url}
                  className={
                    "px-4 py-2 border rounded cursor-pointer flex flex-col space-y-1"
                  }
                >
                  <span className={"text-lg hover:underline"}>
                    {contest.name}
                  </span>
                  <div className={"flex justify-between"}>
                    <div className={"flex flex-col w-1/2"}>
                      <span className={"text-foreground/60 text-sm"}>
                        Starting at
                      </span>
                      <span>{format(contest.date.start, "dd MMM ")}</span>
                    </div>

                    <div className={"flex flex-col w-1/2"}>
                      <span className={"text-foreground/60 text-sm"}>
                        Ending at
                      </span>
                      <span>{format(contest.date.end, "dd MMM ")}</span>
                    </div>
                  </div>
                </Link>
              );
            }
          })}
        </ul>
      </section>
      <section className={"flex flex-col w-full space-y-2"}>
        <h2 className={"text-2xl"}>Past events</h2>
        <ul className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
          {contests.map((contest) => {
            if (new Date(contest.date.end).getTime() < Date.now()) {
              return (
                <Link
                  key={contest.url}
                  href={contest.url}
                  className={
                    "px-4 py-2 border rounded cursor-pointer flex flex-col space-y-1"
                  }
                >
                  <span className={"text-lg hover:underline"}>
                    {contest.name}
                  </span>
                  <div className={"flex justify-between"}>
                    <div className={"flex flex-col w-1/2"}>
                      <span className={"text-foreground/60 text-sm"}>
                        Ended on
                      </span>
                      <span>{format(contest.date.end, "dd MMM ")}</span>
                    </div>
                  </div>
                </Link>
              );
            }
          })}
        </ul>
      </section>
    </main>
  );
};

export default ContestsPage;
