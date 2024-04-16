import { cookies } from "next/headers";
import { account } from "@/appwrite/client";
import { redirect } from "next/navigation";

const AdminPageLayout = async ({ events, children }) => {
  const cookieCreator = cookies();
  const { value: name } = cookieCreator.get("name");

  return (
    <div className={"py-16 px-4 lg:px-36 flex flex-col space-y-10"}>
      <h1 className={"text-4xl"}>
        Hello admin <u className={"text-purple-500"}>{name}</u>!
      </h1>
      <section>{events}</section>
      {children}
    </div>
  );
};

export default AdminPageLayout;
