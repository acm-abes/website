import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="p-5 md:px-20 lg:px-24 space-y-5 w-full">{children}</main>
  );
};

export default Layout;
