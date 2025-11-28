declare module "next-themes" {
  import * as React from "react";

  interface ThemeProviderProps {
    children?: React.ReactNode;
    attribute?: string;
    defaultTheme?: string;
    forcedTheme?: string;
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean;
    themes?: string[];
    value?: string;
  }

  export const ThemeProvider: React.FC<ThemeProviderProps>;
}
