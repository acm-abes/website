"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import React, { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
  props?: React.HTMLAttributes<HTMLDivElement>;
}

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemeProvider defaultTheme="system" {...props}>
      {children}
    </NextThemeProvider>
  );
};
