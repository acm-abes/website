"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import React, { ReactNode } from "react";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";

interface ProviderProps {
  children: React.ReactNode;
}

interface ThemeProviderProps extends ProviderProps {
  props?: React.HTMLAttributes<HTMLDivElement>;
}

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemeProvider defaultTheme="system" {...props}>
      {children}
    </NextThemeProvider>
  );
};

const queryClient = new QueryClient();

export const ReactQueryProvider = ({ children }: ProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
