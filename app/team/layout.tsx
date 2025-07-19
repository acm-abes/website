import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>{children}</div>;
};

export default Layout;


// app/layout.tsx

// import "../"; // or any global styles

// export const metadata = {
//   title: "My App",
//   description: "Some description",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" data-theme="dark" style={{ colorScheme: "dark" }}>
//       <body>{children}</body>
//     </html>
//   );
// }
