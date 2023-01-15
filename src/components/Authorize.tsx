import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

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

function getCurrentAccount(accessToken: string) {
  // Use dropbox api to get user email, other info.
  return fetch("https://api.dropboxapi.com/2/users/get_current_account", {
    method: "POST",
    headers: {
      authorization: "Bearer " + accessToken,
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
      authorization: "Bearer " + token,
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

export default function Authorize(props: any) {
  const navigate = useNavigate();

  // Handle page redirect.
  useEffect(() => {
    if (!props.loggedIn) {
      // If on this page after 'dropbox_login' redirect, there will be a query string with the 'code' value for the token api.
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
            getCurrentAccount(res01)?.then((res1) => {
              props.doTokenRefresh(res0.refresh_token).then((tk2: string) => {
                props.setAccessToken(tk2);
                getUserDB(tk2, props.email)?.then((res2) => {
                  props.setLoggedIn(true);
                  props.setEmail(res2.email);
                  props.setPassword(res2.password);
                  window.location.search = "";
                });
              });
            });
          });
        });
      }
    }

    if (props.loggedIn) {
      navigate("/");
    }
  }, [props, navigate]);

  return <section>Authorizing...</section>;
}
