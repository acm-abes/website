"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode } from "react";

export const ThemeProvider = ({
  children,
  ...props
}: {
  children: ReactNode;
}) => {
  return (
    <NextThemeProvider defaultTheme="system" {...props}>
      {children}
    </NextThemeProvider>
  );
};
