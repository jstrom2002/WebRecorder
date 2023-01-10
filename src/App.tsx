import MainPage from "./screens/MainPage";
import RegisterPage from "./screens/RegisterPage";
import SettingsPage from "./screens/SettingsPage";
import ForgotPasswordPage from "./screens/ForgotPasswordPage";
import AppHeader from "./components/AppHeader";
import { useEffect, useState } from "react";
import { AppShell } from "@mantine/core";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Redirect from "./components/Redirect";
import RedirectReturn from "./components/RedirectReturn";
import LandingPage from "./screens/LandingPage";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();

  async function loginCallback(
    doLogin: boolean,
    email?: string,
    password?: string
  ) {
    if (doLogin == false) {
      setLoggedIn(false);
      setAccessToken("");
      navigate("/landing");
      return;
    }

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
          setEmail(foundEntry.email);
          setPassword(foundEntry.password);
        }
      });
  }

  return (
    <AppShell
      style={{ background: "#E9ECE6", border: "solid" }}
      layout="alt"
      header={
        <AppHeader
          email={email}
          loggedIn={loggedIn}
          loginCallback={loginCallback}
        />
      }
    >
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot_password" element={<ForgotPasswordPage />} />
        <Route
          path="/redirect_return"
          element={<RedirectReturn loc="/" setAccessToken={setAccessToken} />}
        />
        <Route
          path="/settings"
          element={<SettingsPage loggedIn={loggedIn} />}
        />
        <Route
          path="/dropbox_login"
          element={
            <Redirect
              loc={`https://www.dropbox.com/oauth2/authorize?token_access_type=online&client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`}
            />
          }
        />
        <Route path="/landing" element={<LandingPage />} />
        <Route
          path="/WebRecorder"
          element={
            <MainPage
              setAccessToken={setAccessToken}
              setLoggedIn={setLoggedIn}
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          path="/main"
          element={
            <MainPage
              setAccessToken={setAccessToken}
              setLoggedIn={setLoggedIn}
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          path="/"
          element={
            <MainPage
              setAccessToken={setAccessToken}
              setLoggedIn={setLoggedIn}
              loggedIn={loggedIn}
            />
          }
        />
      </Routes>
    </AppShell>
  );
}
