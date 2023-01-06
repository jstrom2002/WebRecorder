import LoginPage from "./screens/LoginPage";
import MainPage from "./screens/MainPage";
import RegisterPage from "./screens/RegisterPage";
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

export default function App() {
  async function loginCallback(logState: boolean) {
    if (true) {
      setLoggedIn(logState);
    }
  }

  async function registerCallback() {
    if (true) {
      setOnRegisterPage(true);
    }
  }

  const [loggedIn, setLoggedIn] = useState(false);
  const [onRegisterPage, setOnRegisterPage] = useState(false);
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  function SelectScreen() {
    return loggedIn ? (
      <MainPage />
    ) : onRegisterPage ? (
      <RegisterPage />
    ) : (
      <LoginPage loginHandler={() => loginCallback(true)} />
    );
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
                  <Menu.Item>Settings</Menu.Item>
                  <Menu.Item>
                    <Button
                      variant="subtle"
                      onClick={() => loginCallback(false)}
                    >
                      Log Out
                    </Button>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </Header>
        }
      >
        <SelectScreen />
      </AppShell>
    </>
  );
}
