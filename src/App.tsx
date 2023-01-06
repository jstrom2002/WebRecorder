import UIWrapper from "./screens/UIWrapper";
import { useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";

export default function App() {
  // hook will return either 'dark' or 'light' on client
  // and always 'light' during ssr as window.matchMedia is not available
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider>
          <UIWrapper
            colorSchemeToggle={toggleColorScheme}
            usesDarkMode={colorScheme}
          />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
