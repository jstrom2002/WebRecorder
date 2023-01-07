import {
  ActionIcon,
  Button,
  Flex,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useRef, useState } from "react";
import { IconArrowLeft } from "@tabler/icons";
import ReturnArrow from "../components/ReturnArrow";
import { isConstructorDeclaration } from "typescript";

function useEmail() {
  const [userEmail, setUserEmail] = useState("");
  return () => setUserEmail(userEmail);
}

function usePassword() {
  const [userPassword, setUserPassword] = useState("");
  return () => setUserPassword(userPassword);
}

function useRefCode() {
  const [userReferralCode, setUserReferralCode] = useState("");
  return () => setUserReferralCode(userReferralCode);
}

const RegisterPage = (props: any) => {
  const uEmail = useEmail();
  const uPassword = usePassword();
  const uRefCode = useRefCode();

  const textInput = useRef(null);

  function registerCallback() {
    // 1. confirm user does not already exist with email
    // 2. validate referral code
    // 3. get dropbox user file and append new user details

    console.log(textInput.current.value);
  }

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
          ref={textInput}
          label="Email"
          onChange={uEmail}
          title="Email"
        ></TextInput>
        <PasswordInput
          label="Password"
          onChange={uPassword}
          title="Password"
          withAsterisk={true}
        ></PasswordInput>
        <TextInput
          label="Referral Code"
          onChange={uRefCode}
          title="Referral Code"
          withAsterisk={true}
        ></TextInput>
        <br />
        <Button
          onClick={registerCallback}
          style={{ width: "50%", alignSelf: "center" }}
        >
          Register
        </Button>
      </Flex>
    </>
  );
};

export default RegisterPage;
