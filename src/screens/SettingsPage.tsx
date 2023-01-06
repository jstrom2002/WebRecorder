import React, { useState } from "react";
import { Flex, ColorScheme, Switch, Text } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { IconMoonStars, IconSun } from "@tabler/icons";

export default function SettingsPage(
  colorSchemeToggle: any,
  usesDarkMode: string
) {
  return (
    <>
      <Flex direction="row">
        <Text>Color Scheme: {usesDarkMode}</Text>
        <Switch onClick={colorSchemeToggle} title="Toggle color scheme">
          {usesDarkMode == "light" ? (
            <IconSun size={18} />
          ) : (
            <IconMoonStars size={18} />
          )}
        </Switch>
      </Flex>
    </>
  );
}
