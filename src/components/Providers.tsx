"use client";

import { AppRoot, createTheme } from "@xanui/core";

const theme = createTheme({
  name: "xanui-docs",
  mode: "dark",
  colors: {
    neutral: "Slate",
    brand: "#6d28d9",
    accent: "#0ea5e9",
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRoot
      component="body"
      theme={theme}
      defaultBreakpoint="lg"
      fontFamily="var(--font-geist-sans)"
      minHeight="100vh"
    >
      {children}
    </AppRoot>
  );
}
