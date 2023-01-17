import { Button, Flex, TextInput, Title } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import ReturnArrow from "../components/ReturnArrow";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

function getAuthToken(requestToken: string) {
  const b64Auth = Buffer.from(
    `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
  ).toString("base64");
  return fetch(
    `https://api.dropboxapi.com/oauth2/token?code=${requestToken}&grant_type=authorization_code&redirect_uri=${process.env.REACT_APP_REGISTER_REDIRECT_URL}`,
    {
      method: "POST",
      headers: {
        Authorization: "Basic " + b64Auth,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )
    .then((data) => data.json())
    .then((authResponse) => {
      return authResponse;
    });
}

function getCurrentAccount(token: string) {
  // Use dropbox api to get user email, other info.
  return fetch("https://api.dropboxapi.com/2/users/get_current_account", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return { account: data };
    });
}

function getUserDB(token: string, email: string) {
  // Get user database from dropbox, compare entries to current user email to verify login.
  return fetch("https://content.dropboxapi.com/2/files/download", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "text/plain",
      "Dropbox-API-Arg": '{"path":"/user.json"}',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
}

const RegisterPage = (props: any) => {
  const [userEmail, setUserEmail] = useState("");
  const [userReferralCode, setUserReferralCode] = useState("");
  const [userDB, setUserDB] = useState();
  const navigate = useNavigate();

  // REGISTRATION WORKFLOW
  // At initialization:
  // 1. have user login to dropbox via redirect
  // 2. call get_current_account to get user email from dropbox account
  // 3. confirm user does not already exist with email
  // 4. validate referral code exists in user.json
  // 5. add all details to inputs in page, waiting for user to click 'register' button after entering referral code
  // After 'register' button click:
  // 6. confirm referral code entered is valid from database
  // 7. generate new user's referral number
  // 8. append new user details (email and referral number) to user.json
  // 9. confirm registration is complete via popup window
  // 10. navigate back to landing page

  function uploadDBFile(accessToken: string, blob: any) {
    return fetch("https://content.dropboxapi.com/2/files/upload", {
      method: "POST",
      headers: {
        authorization: "Bearer " + accessToken,
        "Content-Type": "application/octet-stream",
        "Dropbox-API-Arg":
          '{"autorename":false,"mode":"overwrite","mute":false,"path":"/user.json","strict_conflict":false}',
      },
      body: blob,
    });
  }

  async function registerCallback(props: any) {
    const db: any = userDB;

    if (userEmail === undefined || db === undefined) {
      alert("ERROR! Unknown error reading dropbox data");
      return;
    }

    if (
      db.entries.find((entry: any) => entry.email === userEmail) !== undefined
    ) {
      alert("ERROR! User Dropbox account is already registered");
      return;
    }

    db.entries.push({ email: userEmail, referralCode: "092399" });
    props.doTokenRefresh(props.refreshToken)?.then((res01: string) => {
      uploadDBFile(res01, JSON.stringify(db)).then(() => {
        setUserDB(db);
        alert("Account registered.");
        navigate("/landing");
      });
    });
  }

  useEffect(() => {
    // If on this page after 'dropbox_register' redirect, there will be a query string with the 'code' value for the token api.
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("code")) {
      const requestToken = queryParams.get("code") ?? "";
      props.setRequestToken(requestToken);
      getAuthToken(requestToken)?.then((res0) => {
        if (res0.access_token === undefined) {
          return;
        }
        props.setAccessToken(res0.access_token);
        props.setRefreshToken(res0.refresh_token);
        props.setUserScopes(res0.scope);
        props.doTokenRefresh(res0.refresh_token)?.then((res01: string) => {
          props.setAccessToken(res01);
          getCurrentAccount(res01)?.then((res1: any) => {
            props.doTokenRefresh(res0.refresh_token).then((tk2: string) => {
              props.setAccessToken(tk2);
              getUserDB(tk2, res1.account.email)?.then((res2) => {
                if (res2 !== undefined) {
                  setUserDB(res2);
                  setUserEmail(res1.account.email);
                }
              });
            });
          });
        });
      });
    }
  });

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
          disabled
          value={userEmail}
          title="Email"
        ></TextInput>
        <TextInput
          label="Referral Code"
          onChange={(e) => setUserReferralCode(e.target.value)}
          value={userReferralCode}
          title="Referral Code (required)"
          withAsterisk={true}
        ></TextInput>
        <br />
        <Button
          onClick={(e) => registerCallback(props)}
          style={{ width: "50%", alignSelf: "center" }}
        >
          Register
        </Button>
      </Flex>
    </>
  );
};

export default RegisterPage;
