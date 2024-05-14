import React from "react";
import EventPageLoading from "@/app/events/[id]/loading";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>{children}</div>;
  // return <EventPageLoading />;
};

export default Layout;
