import MainPage from "./screens/MainPage";
import RegisterPage from "./screens/RegisterPage";
import SettingsPage from "./screens/SettingsPage";
import ForgotPasswordPage from "./screens/ForgotPasswordPage";
import AppHeader from "./components/AppHeader";
import { useEffect, useState } from "react";
import { AppShell } from "@mantine/core";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Redirect from "./components/Redirect";
import LandingPage from "./screens/LandingPage";
import Authorize from "./components/Authorize";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requestToken, setRequestToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();

  async function loginCallback(
    doLogin: boolean,
    email?: string,
    password?: string
  ) {
    if (doLogin == false) {
      setLoggedIn(false);
      setRequestToken("");
      setAccessToken("");
      navigate("/landing");
      return;
    }
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
              setRequestToken={setRequestToken}
              setLoggedIn={setLoggedIn}
              loggedIn={loggedIn}
            />
          }
        />
        <Route path="/" element={<MainPage loggedIn={loggedIn} />} />
        <Route
          path="/authorize"
          element={
            <Authorize
              setAccessToken={setAccessToken}
              setRequestToken={setRequestToken}
              setLoggedIn={setLoggedIn}
              loggedIn={loggedIn}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          }
        />
      </Routes>
    </AppShell>
  );
}
