import LoginPage from "./screens/LoginPage";
import MainPage from "./screens/MainPage";
import RegisterPage from "./screens/RegisterPage";
import { useState } from "react";

export default function App() {
  async function loginCallback() {
    if (true) {
      setLopggedIn(true);
    }
  }

  const [loggedIn, setLopggedIn] = useState(false);
  const [onRegisterPage, setOnRegisterPage] = useState(false);

  return loggedIn ? (
    <MainPage />
  ) : onRegisterPage ? (
    <RegisterPage />
  ) : (
    <LoginPage />
  );
}
