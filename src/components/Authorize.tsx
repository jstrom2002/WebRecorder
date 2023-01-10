import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

export default function Authorize(props: any) {
  const navigate = useNavigate();

  function getAccessToken(requestToken: string) {}

  // Handle page redirect.
  useEffect(() => {
    if (!props.loggedIn) {
      // If on this page after 'dropbox_login' redirect, there will be a query string with the 'code' value for the token api.
      const queryParams = new URLSearchParams(window.location.search);
      if (queryParams.get("code")) {
        const requestToken = queryParams.get("code") ?? "";
        props.setRequestToken(requestToken);
        const b64Auth = Buffer.from(
          `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
        ).toString("base64");
        fetch(
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
          .then((response) => {
            // Save access token and use to verify user email/login against database file.
            props.setAccessToken(response);

            fetch("https://content.dropboxapi.com/2/files/download", {
              method: "POST",
              headers: {
                authorization: "Bearer " + response,
                "Content-Type": "text/plain",
                "Dropbox-API-Arg": '{"path":"/user.json"}',
              },
            })
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                let foundEntry = data.entries.find(
                  (entry: any) =>
                    entry.email === props.email &&
                    entry.password === props.password
                );
                if (foundEntry) {
                  props.setLoggedIn(true);
                  props.setEmail(foundEntry.email);
                  props.setPassword(foundEntry.password);
                }
              });
          });
      }
      // Else if not logged in send user to landing page to register/login.
      else if (props.loggedIn == false) {
        navigate("/landing");
      }
    }

    if (props.loggedIn) {
      navigate("/");
    }
  });

  return <section>Authorizing...</section>;
}
