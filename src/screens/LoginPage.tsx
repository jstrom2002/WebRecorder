import { Button, Flex, PasswordInput, TextInput, Title } from "@mantine/core";
import React, { useState } from "react";

const LoginPage = (props: any) => {
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
          value={props.email}
          onChange={(e) => props.setEmail(e.target.value)}
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
          value={props.password}
          onChange={(e) => props.setPassword(e.target.value)}
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
            onClick={props.loginHandler}
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
