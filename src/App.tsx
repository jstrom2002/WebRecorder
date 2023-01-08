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
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, currentPageHandler] = useState("LoginPage");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginCallback(logState: boolean) {
    const accessToken = "<ADD API ACCESS TOKEN>";

    fetch("https://api.dropboxapi.com/2/check/user ", {
      method: "POST",
      headers: {
        authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
        "Dropbox-API-Arg": '{"path":"/user.json"}',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let foundEntry = data.entries.find(
          (entry: any) => entry.email === email && entry.password === password
        );
        if (foundEntry) {
          setLoggedIn(logState);
          currentPageHandler("MainPage");
          setEmail(foundEntry.email);
          setPassword(foundEntry.password);
        }
      });
  }

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
      default:
        return loggedIn ? (
          <MainPage />
        ) : (
          <LoginPage
            loginHandler={() => loginCallback(true)}
            currentPageHandler={currentPageHandler}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
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
