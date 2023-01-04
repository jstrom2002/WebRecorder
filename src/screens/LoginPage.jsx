import {
  Button,
  Flex,
  Modal,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { appendDataToDatabase, ResetDatabase } from "../utils/DropboxApi";
import { useState } from "react";

export default function LoginPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  async function loginCallback() {
    if (true) {
      setLoggedIn(true);
    }
  }

  return (
    <>
      <Flex
        style={{
          justifyContent: "center",
          width: "50%",
          minHeight: "50%",
          margin: "17.5% 25%",
          border: "solid",
        }}
        direction="column"
      >
        <Title align="center">Login</Title>
        <TextInput
          style={{
            width: "50%",
            height: "50%",
            margin: "0px 25%",
          }}
          placeholder="User Name"
          label="User Name"
        />
        <PasswordInput
          style={{
            width: "50%",
            height: "50%",
            margin: "0px 25%",
          }}
          placeholder="Password"
          label="Password"
          withAsterisk
        />
        <Flex style={{ justifyContent: "center" }}>
          <Button variant="subtle" style={{ margin: "0px 20px" }}>
            Register
          </Button>
          <Button variant="subtle" style={{ margin: "0px 20px" }}>
            Forgot Password
          </Button>
          <Button
            onClick={loginCallback}
            style={{ width: "12em", margin: "0px 20px" }}
          >
            Login
          </Button>
          <br />
        </Flex>
      </Flex>
    </>
  );
}
