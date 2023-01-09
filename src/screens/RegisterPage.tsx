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
import ReturnArrow from "../components/ReturnArrow";
import { getUserDB } from "../utils/DropboxApi";
import { useNavigate } from "react-router-dom";

const RegisterPage = (props: any) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userReferralCode, setUserReferralCode] = useState("");
  const navigate = useNavigate();

  async function registerCallback() {
    // 1. confirm user does not already exist with email
    // 2. validate referral code
    // 3. get dropbox user file and append new user details

    const accessToken = "<API ACCESS TOKEN>";

    fetch("https://content.dropboxapi.com/2/files/download", {
      method: "POST",
      headers: {
        authorization: "Bearer " + accessToken,
        "Content-Type": "text/plain",
        "Dropbox-API-Arg": '{"path":"/user.json"}',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/");
      });
  }

  return (
    <>
      <ReturnArrow />

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
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
          title="Email"
        ></TextInput>
        <PasswordInput
          label="Password"
          onChange={(e) => setUserPassword(e.target.value)}
          value={userPassword}
          title="Password"
          withAsterisk={true}
        ></PasswordInput>
        <TextInput
          label="Referral Code"
          onChange={(e) => setUserReferralCode(e.target.value)}
          value={userReferralCode}
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
