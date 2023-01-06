import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import RegisterPage from "./RegisterPage";
import { useState } from "react";
import {
  AppShell,
  Burger,
  Button,
  Header,
  Text,
  MediaQuery,
  Menu,
  useMantineTheme,
} from "@mantine/core";
import { IconUserCircle } from "@tabler/icons";
import SettingsPage from "./SettingsPage";

export default function UIWrapper(
  colorSchemeToggle: any,
  usesDarkMode: string
) {
  async function loginCallback(logState: boolean) {
    if (true) {
      setLoggedIn(logState);
      setOnCurrentPage("MainPage");
    }
  }

  async function currentPageHandler(pageName: string) {
    setOnCurrentPage(pageName);
  }

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setOnCurrentPage] = useState("LoginPage");
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  function SelectScreen(colorSchemeToggle: any, usesDarkMode: string) {
    switch (currentPage) {
      case "RegisterPage":
        return <RegisterPage />;
      case "SettingsPage":
        return (
          <SettingsPage
            colorSchemeToggle={colorSchemeToggle}
            usesDarkMode={usesDarkMode}
          />
        );
      case "MainPage":
        return loggedIn ? (
          <MainPage />
        ) : (
          <LoginPage
            loginHandler={() => loginCallback(true)}
            currentPageHandler={currentPageHandler}
          />
        );
      default:
        return (
          <LoginPage
            loginHandler={() => loginCallback(true)}
            currentPageHandler={currentPageHandler}
          />
        );
    }
  }

  return (
    <>
      <AppShell
        layout="alt"
        style={{
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        }}
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                justifyContent: "right",
              }}
            >
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Text>Web Recorder</Text>

              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button
                    component="a"
                    href="#"
                    variant="subtle"
                    leftIcon={<IconUserCircle size={14} />}
                  ></Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item>Profile</Menu.Item>
                  <Menu.Item onClick={() => currentPageHandler("SettingsPage")}>
                    Settings
                  </Menu.Item>
                  <Menu.Item onClick={() => loginCallback(false)}>
                    Log Out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </Header>
        }
      >
        <SelectScreen
          colorSchemeToggle={colorSchemeToggle}
          usesDarkMode={usesDarkMode}
        />
      </AppShell>
    </>
  );
}
