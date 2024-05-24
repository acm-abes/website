import { cookies } from "next/headers";
import { ReactNode } from "react";

interface EventsProps {
  events: ReactNode;
  children: ReactNode;
}
const AdminPageLayout = async ({ events, children }: EventsProps) => {
  const cookieCreator = cookies();
  const { value: name } = cookieCreator.get("name")!;

  return (
    <div className={"flex flex-col space-y-10"}>
      <h1 className={"text-4xl"}>
        Hello admin <u className={"text-purple-500"}>{name}</u>!
      </h1>
      <section>{events}</section>
      {children}
    </div>
  );
};

export default AdminPageLayout;
