import {
  Button,
  Flex,
  PasswordInput,
  TextInput,
  Title,
  Text,
  NavLink,
} from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropbox from "../assets/dropboxSvg";

export default function LandingPage(props: any) {
  const navigate = useNavigate();

  return (
    <>
      <Flex
        style={{
          width: "50%",
          minHeight: "50%",
          margin: "0% 25%",
          border: "solid",
          borderColor: "#BCCBC9",
        }}
        direction="column"
      >
        <Title
          style={{ margin: "5% 0%", alignSelf: "center", color: "#545B5A" }}
        >
          Web Recorder
        </Title>
        <br />
        <div style={{ width: "40%", alignSelf: "center" }}>
          <Text>Powered by</Text>
          <Dropbox />
        </div>
        <br />
        <br />
        <Flex direction="column" align="center">
          <br />
          <Flex direction="row">
            <Button
              onClick={() => navigate("/register")}
              style={{
                width: "12em",
                margin: "0px 20px",
                color: "#545B5A",
                background: "#C0DFD9",
              }}
            >
              Register
            </Button>
            <Button
              onClick={() => navigate("/dropbox_login")}
              style={{
                width: "12em",
                margin: "0px 20px",
                color: "#545B5A",
                background: "#C0DFD9",
              }}
            >
              Login
            </Button>
          </Flex>
          <Button variant="subtle" onClick={() => navigate("/forgot_password")}>
            Forgot Password
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
