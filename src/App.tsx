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

  async function loginCallback(
    doLogin: boolean,
    email?: string,
    password?: string
  ) {
    if (doLogin == false) {
      setLoggedIn(false);
      return;
    }

    const accessToken = "<ADD API ACCESS TOKEN>";

    fetch("https://content.dropboxapi.com/2/files/download", {
      method: "POST",
      headers: {
        authorization: "Bearer " + accessToken,
        "Content-Type": "text/plain",
        "Dropbox-API-Arg": '{"path":"/user.json"}',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let foundEntry = data.entries.find(
          (entry: any) => entry.email === email && entry.password === password
        );
        if (foundEntry) {
          setLoggedIn(true);
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
            loginHandler={loginCallback}
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
