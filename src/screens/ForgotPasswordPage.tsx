import {
  ActionIcon,
  Button,
  Flex,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import ReturnArrow from "../components/ReturnArrow";

const ForgotPasswordPage = (props: any) => {
  const [userEmail, setUserEmail] = useState("");

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
          Send Password Reset Email
        </Title>
        <TextInput
          label="Email"
          value={userEmail}
          onChange={() => setUserEmail(userEmail)}
          title="email"
        ></TextInput>
        <br />
        <Button style={{ width: "50%", alignSelf: "center" }}>
          Send Reset Email
        </Button>
      </Flex>
    </>
  );
};

export default ForgotPasswordPage;
