import { Button, Flex, PasswordInput, TextInput, Title } from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = (props: any) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <>
      <Flex
        style={{
          justifyContent: "center",
          width: "50%",
          minHeight: "50%",
          margin: "0% 25%",
          border: "solid",
          borderColor: "#BCCBC9",
        }}
        direction="column"
      >
        <Title style={{ color: "#545B5A" }} align="center">
          Web Recorder
        </Title>
        <TextInput
          style={{
            width: "50%",
            height: "50%",
            margin: "0px 25%",
          }}
          placeholder="Email"
          label="Account Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
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
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <br />
        <Flex style={{ justifyContent: "center" }}>
          <Button
            onClick={() => props.currentPageHandler("RegisterPage")}
            variant="subtle"
            style={{ margin: "0px 20px", color: "#545B5A" }}
          >
            Register
          </Button>
          <Button
            onClick={() => props.currentPageHandler("ForgotPasswordPage")}
            variant="subtle"
            style={{ margin: "0px 20px", color: "#545B5A" }}
          >
            Forgot Password
          </Button>
          <Button
            onClick={() => {
              props.loginHandler(true, userEmail, userPassword);
            }}
            style={{
              width: "12em",
              margin: "0px 20px",
              color: "#545B5A",
              background: "#C0DFD9",
            }}
          >
            Login
          </Button>
          <br />
        </Flex>
      </Flex>
    </>
  );
};

export default LoginPage;
