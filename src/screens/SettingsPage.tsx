import React, { useState } from "react";
import { ActionIcon, Flex, Switch, Text, Title } from "@mantine/core";
import { IconArrowLeft, IconMoonStars, IconSun } from "@tabler/icons";
import ReturnArrow from "../components/ReturnArrow";

const SettingsPage = (props: any) => {
  return (
    <>
      <ReturnArrow
        loggedIn={props.loggedIn}
        currentPageHandler={props.currentPageHandler}
      />

      <Flex
        direction="column"
        style={{
          width: "75%",
          height: "50%",
          margin: "0px 7%",
          padding: "0% 5%",
          alignSelf: "center",
        }}
      >
        <Title size="h3" style={{ alignSelf: "center" }}>
          Settings
        </Title>
        <br />

        <Flex direction="row" style={{ alignSelf: "center" }}>
          <Text style={{ margin: "0px 20px" }}>Color Scheme: default</Text>
          <Switch title="Toggle color scheme">
            {false ? <IconSun size={18} /> : <IconMoonStars size={18} />}
          </Switch>
        </Flex>
      </Flex>
    </>
  );
};

export default SettingsPage;
