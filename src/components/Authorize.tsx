import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

interface AuthorizeProps {
  accessToken: string;
  setAccessToken: any;
  requestToken: string;
  setRequestToken: any;
  refreshToken: string;
  setRefreshToken: any;
  doTokenRefresh: any;
  userScopes: string;
  setUserScopes: any;
  setLoggedIn: any;
  loggedIn: string;
  email: string;
  setEmail: any;
  password: string;
  setPassword: any;
}

function getAuthToken(requestToken: string) {
  const b64Auth = Buffer.from(
    `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
  ).toString("base64");
  return fetch(
    `https://api.dropboxapi.com/oauth2/token?code=${requestToken}&grant_type=authorization_code&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`,
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
  console.log("access_token:", token);
  // Use dropbox api to get user email, other info.
  return fetch("https://api.dropboxapi.com/2/users/get_current_account", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("current dropbox acct:", data);
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
      return data.entries.find((entry: any) => entry.email === email);
    });
}

export default class Authorize extends React.Component<AuthorizeProps> {
  navigate = useNavigate();

  state = {
    accessToken: "",
    setAccessToken: () => {},
    requestToken: "",
    setRequestToken: () => {},
    refreshToken: "",
    setRefreshToken: () => {},
    doTokenRefresh: () => {},
    userScopes: "",
    setUserScopes: () => {},
    setLoggedIn: () => {},
    loggedIn: false,
    email: "",
    setEmail: "",
    password: "",
    setPassword: () => {},
  };

  constructor(props: AuthorizeProps) {
    super(props);
    this.authorizeUser();
    this.state = {
      accessToken: props.accessToken,
      setAccessToken: props.setAccessToken,
      requestToken: props.requestToken,
      setRequestToken: props.setRequestToken,
      refreshToken: props.refreshToken,
      setRefreshToken: props.setRefreshToken,
      doTokenRefresh: props.doTokenRefresh,
      userScopes: props.userScopes,
      setUserScopes: props.setUserScopes,
      setLoggedIn: props.setLoggedIn,
      loggedIn: props.loggedIn,
      email: props.email,
      setEmail: props.setEmail,
      password: props.password,
      setPassword: props.setPassword,
    };
  }

  // // Handle page redirect.
  // useEffect(() => {
  //   authorizeUser();
  // });

  authorizeUser() {
    if (!this.state.loggedIn) {
      // If on this page after 'dropbox_login' redirect, there will be a query string with the 'code' value for the token api.
      const queryParams = new URLSearchParams(window.location.search);
      if (queryParams.get("code")) {
        const requestToken = queryParams.get("code") ?? "";
        this.state.setRequestToken(requestToken);
        getAuthToken(requestToken)?.then((res0) => {
          console.log("res0:", res0);
          if (res0 === undefined || res0.access_token === undefined) {
            return;
          }
          this.state.setAccessToken(res0.access_token);
          this.state.setRefreshToken(res0.refresh_token);
          this.state.setUserScopes(res0.scope);
          this.state
            .doTokenRefresh(res0.refresh_token)
            ?.then((res01: string) => {
              getCurrentAccount(res01)?.then((res1) => {
                console.log("current dropbox acct:", res1.account);
                this.state
                  .doTokenRefresh(res0.refresh_token)
                  .then((tk2: string) => {
                    console.log("updated access token2");
                    getUserDB(tk2, this.state.email)?.then((res2) => {
                      this.state.setLoggedIn(true);
                      this.state.setEmail(res2.email);
                      this.state.setPassword(res2.password);
                      this.state
                        .doTokenRefresh(res0.refresh_token)
                        .then((tk3: string) => {
                          this.state.setAccessToken(tk3);
                        });
                    });
                  });
              });
            });
        });
      }
    }

    if (this.state.loggedIn) {
      this.navigate("/");
    }
  }

  render() {
    return <section>Authorizing...</section>;
  }
}
