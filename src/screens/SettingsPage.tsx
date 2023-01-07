import React, { useState } from "react";
import { ActionIcon, Flex, Switch, Text } from "@mantine/core";
import { IconArrowLeft, IconMoonStars, IconSun } from "@tabler/icons";
import ReturnArrow from "../components/ReturnArrow";

const SettingsPage = (props: any) => {
  return (
    <>
      <ReturnArrow
        loggedIn={props.loggedIn}
        currentPageHandler={props.currentPageHandler}
      />

      <Flex direction="row">
        <Text>Color Scheme: dark</Text>
        <Switch title="Toggle color scheme">
          {false ? <IconSun size={18} /> : <IconMoonStars size={18} />}
        </Switch>
      </Flex>
    </>
  );
};

export default SettingsPage;
