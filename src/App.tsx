import LoginPage from "./screens/LoginPage";
import MainPage from "./screens/MainPage";
import RegisterPage from "./screens/RegisterPage";
import ProfilePage from "./screens/ProfilePage";
import SettingsPage from "./screens/SettingsPage";
import ForgotPasswordPage from "./screens/ForgotPasswordPage";
import { useState } from "react";
import {
  ActionIcon,
  AppShell,
  Burger,
  Button,
  Flex,
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
      setOnCurrentPage("MainPage");
    }
  }

  async function currentPageHandler(pageName: string) {
    setOnCurrentPage(pageName);
  }

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setOnCurrentPage] = useState("LoginPage");
  const [opened, setOpened] = useState(false);

  function SelectScreen() {
    switch (currentPage) {
      case "ForgotPasswordPage":
        return (
          <ForgotPasswordPage
            loggedIn={loggedIn}
            currentPageHandler={currentPageHandler}
          />
        );
      case "ProfilePage":
        return (
          <ProfilePage
            loggedIn={loggedIn}
            currentPageHandler={currentPageHandler}
          />
        );
      case "RegisterPage":
        return (
          <RegisterPage
            loggedIn={loggedIn}
            currentPageHandler={currentPageHandler}
          />
        );
      case "SettingsPage":
        return (
          <SettingsPage
            loggedIn={loggedIn}
            currentPageHandler={currentPageHandler}
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
        style={{ background: "#E9ECE6" }}
        layout="alt"
        header={
          <Header
            style={{ background: "#495553" }}
            height={{ base: 50, md: 70 }}
            p="md"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                justifyContent: "right",
              }}
            >
              <Menu shadow="md" width={200}>
                <Flex direction="row">
                  <Text
                    fw="700"
                    style={{
                      color: "#BCCBC9",
                      justifySelf: "left",
                      width: "90vw",
                    }}
                  >
                    Web Recorder App
                  </Text>
                  <Menu.Target>
                    <ActionIcon variant="subtle" style={{ color: "#BCCBC9" }}>
                      <IconUserCircle size={28} />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Flex direction="column" style={{ alignItems: "center" }}>
                      <Menu.Item
                        style={{ textAlign: "center" }}
                        onClick={() => currentPageHandler("ProfilePage")}
                      >
                        Profile
                      </Menu.Item>
                      <Menu.Item
                        style={{ textAlign: "center" }}
                        onClick={() => currentPageHandler("SettingsPage")}
                      >
                        Settings
                      </Menu.Item>
                      <Menu.Item
                        style={{ textAlign: "center" }}
                        onClick={() => loginCallback(false)}
                      >
                        Log Out
                      </Menu.Item>
                    </Flex>
                  </Menu.Dropdown>
                </Flex>
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
