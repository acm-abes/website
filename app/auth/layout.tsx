import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className={"md:px-36 px-4 py-10 flex flex-col items-center"}>
      {children}
    </main>
  );
};

export default Layout;
