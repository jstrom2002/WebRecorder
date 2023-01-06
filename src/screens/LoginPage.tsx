import {
  Button,
  Flex,
  Modal,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import { IconExternalLink } from "@tabler/icons";

export interface LoginPageProps {
  loginHandler: any;
  currentPageHandler: any;
}
export default class LoginPage extends React.Component<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super(props);
    this.state = {
      loginHandler: props.loginHandler,
      currentPageHandler: props.currentPageHandler,
    };
  }

  componentWillReceiveProps(props: LoginPageProps) {
    this.setState({
      loginHandler: props.loginHandler,
      currentPageHandler: props.currentPageHandler,
    });
  }

  render() {
    return (
      <>
        <Flex
          style={{
            justifyContent: "center",
            width: "50%",
            minHeight: "50%",
            margin: "0% 25%",
            border: "solid",
          }}
          direction="column"
        >
          <Title align="center">Web Recorder</Title>
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
            <Button
              onClick={() => this.props.currentPageHandler("SettingsPage")}
              variant="subtle"
              style={{ margin: "0px 20px" }}
            >
              Register
            </Button>
            <Button variant="subtle" style={{ margin: "0px 20px" }}>
              Forgot Password
            </Button>
            <Button
              onClick={this.props.loginHandler}
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
}
