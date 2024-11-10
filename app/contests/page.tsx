import { format } from "date-fns";
import React from "react";
import Link from "next/link";
import ContestLeaderBoard from "@/components/ContestLeaderBoard";
import { Contest } from "@/database/models";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

export interface Contest {
  name: string;
  date: {
    start: string;
    end: string;
  };
  tags?: string[];
  url: string;
}

export const metadata: Metadata = {
  title: "CONTESTS",
  description: "Take a look at ongoing and past contests organized by us",
};

const getContests = async (): Promise<Contest[]> => {
  return Contest.find();
};

const ContestsPage = async () => {
  const contests = await getContests();

  const contestants: {
    name: string;
    image?: string | undefined;
    points: number;
  }[] = [
    // {
    //   name: "Kunal Rana",
    //   points: 9999,
    // },
    // {
    //   name: "Lavesh Gupta",
    //   points: 9999,
    // },
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
          {contests.length > 0 ? (
            contests.map((contest) => {
              if (new Date(contest.date.end).getTime() > Date.now()) {
                return (
                  <Link
                    key={contest.url}
                    href={contest.url}
                    className={
                      "px-4 py-2 border rounded cursor-pointer flex flex-col space-y-2"
                    }
                  >
                    <span className={"text-lg hover:underline"}>
                      {contest.name}
                    </span>
                    <div className={"flex space-x-2 items-center"}>
                      {contest.tags?.map((item) => (
                        <Badge key={item} size={"small"} variant={"secondary"}>
                          {item}
                        </Badge>
                      ))}
                    </div>
                    <div className={"flex justify-between"}>
                      <div className={"flex flex-col w-1/2"}>
                        <span className={"text-foreground/60 text-sm"}>
                          Starting at
                        </span>
                        <span>
                          {format(contest.date.start, "dd MMM hh:mm aa")}
                        </span>
                      </div>

                      <div className={"flex flex-col w-1/2"}>
                        <span className={"text-foreground/60 text-sm"}>
                          Ending at
                        </span>
                        <span>
                          {format(contest.date.end, "dd MMM hh:mm aa")}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              }
            })
          ) : (
            <div>There's no contest</div>
          )}
        </ul>
      </section>
      <section className={"flex flex-col w-full space-y-2"}>
        <h2 className={"text-2xl"}>Past events</h2>
        <ul className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
          {contests.length > 0 ? (
            contests.map((contest) => {
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
                        <span>
                          {format(contest.date.end, "dd MMM hh:mm aa")}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              }
            })
          ) : (
            <div>There's no contest</div>
          )}
        </ul>
      </section>
    </main>
  );
};

export default ContestsPage;
