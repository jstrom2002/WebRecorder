import {
  ActionIcon,
  Button,
  Flex,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { IconArrowLeft } from "@tabler/icons";
import ReturnArrow from "../components/ReturnArrow";

const RegisterPage = (props: any) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <>
      <ReturnArrow
        loggedIn={props.loggedIn}
        currentPageHandler={props.currentPageHandler}
      />

      <Flex
        direction="column"
        style={{
          width: "50%",
          height: "50%",
          margin: "0px 25%",
          alignContent: "center",
        }}
      >
        <Title size="h3" style={{ alignSelf: "center" }}>
          Register
        </Title>
        <TextInput
          label="Email"
          value={userEmail}
          onChange={() => setUserEmail(userEmail)}
          title="Email"
        ></TextInput>
        <TextInput
          label="Password"
          value={userPassword}
          onChange={() => setUserPassword(userPassword)}
          title="Password"
        ></TextInput>
        <br />
        <Button style={{ width: "50%", alignSelf: "center" }}>Register</Button>
      </Flex>
    </>
  );
};

export default RegisterPage;
