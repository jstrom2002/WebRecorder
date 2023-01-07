import LoginPage from "./screens/LoginPage";
import MainPage from "./screens/MainPage";
import RegisterPage from "./screens/RegisterPage";
import ProfilePage from "./screens/ProfilePage";
import SettingsPage from "./screens/SettingsPage";
import ForgotPasswordPage from "./screens/ForgotPasswordPage";
import AppHeader from "./components/AppHeader";
import { useState } from "react";
import { AppShell } from "@mantine/core";

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
    <AppShell
      style={{ background: "#E9ECE6", border: "solid" }}
      layout="alt"
      header={
        <AppHeader
          loggedIn={loggedIn}
          loginCallback={loginCallback}
          currentPageHandler={currentPageHandler}
        />
      }
    >
      <SelectScreen />
    </AppShell>
  );
}
