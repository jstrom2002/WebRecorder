import MainPage from "./screens/MainPage";
import RegisterPage from "./screens/RegisterPage";
import SettingsPage from "./screens/SettingsPage";
import AppHeader from "./components/AppHeader";
import Error404Page from "./screens/Error404Page";
import { useEffect, useState } from "react";
import { AppShell } from "@mantine/core";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Redirect from "./components/Redirect";
import LandingPage from "./screens/LandingPage";
import Authorize from "./components/Authorize";
import { Buffer } from "buffer";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [requestToken, setRequestToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [userScopes, setUserScopes] = useState("");
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

  async function doTokenRefresh(token: string | undefined) {
    const b64Auth = Buffer.from(
      `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
    ).toString("base64");
    return fetch(
      `https://api.dropboxapi.com/oauth2/token?refresh_token=${token}&grant_type=refresh_token`,
      {
        method: "POST",
        headers: {
          Authorization: "Basic " + b64Auth,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((data) => data.json())
      .then((res) => {
        return res.access_token;
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
        <Route
          path="/register"
          element={
            <RegisterPage
              accessToken={accessToken}
              setAccessToken={setAccessToken}
              requestToken={requestToken}
              setRequestToken={setRequestToken}
              refreshToken={refreshToken}
              setRefreshToken={setRefreshToken}
              doTokenRefresh={doTokenRefresh}
              userScopes={userScopes}
              setUserScopes={setUserScopes}
            />
          }
        />
        <Route
          path="/settings"
          element={<SettingsPage loggedIn={loggedIn} />}
        />
        <Route
          path="/dropbox_login"
          element={
            <Redirect
              loc={`https://www.dropbox.com/oauth2/authorize?token_access_type=offline&client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_LOGIN_REDIRECT_URL}`}
            />
          }
        />
        <Route
          path="/dropbox_register"
          element={
            <Redirect
              loc={`https://www.dropbox.com/oauth2/authorize?token_access_type=offline&client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REGISTER_REDIRECT_URL}`}
            />
          }
        />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<MainPage loggedIn={loggedIn} />} />
        <Route
          path="/authorize"
          element={
            <Authorize
              accessToken={accessToken}
              setAccessToken={setAccessToken}
              requestToken={requestToken}
              setRequestToken={setRequestToken}
              refreshToken={refreshToken}
              setRefreshToken={setRefreshToken}
              doTokenRefresh={doTokenRefresh}
              userScopes={userScopes}
              setUserScopes={setUserScopes}
              setLoggedIn={setLoggedIn}
              loggedIn={loggedIn}
              email={email}
              setEmail={setEmail}
            />
          }
        />
        <Route path="*" element={<Error404Page setLoggedIn={setLoggedIn} />} />
      </Routes>
    </AppShell>
  );
}
