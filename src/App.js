import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import {
  Button,
  Flex,
  Modal,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { appendDataToDatabase, ResetDatabase } from "./DropboxApi";
import { useState } from "react";

const App = () => {
  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  async function AddFinishedRecording(blob) {
    appendDataToDatabase(await blob.text());
    addAudioElement(blob);
  }

  async function loginCallback() {
    if (true) {
      setLopggedIn(true);
    }
  }

  const [opened, setOpened] = useState(false);
  const [loggedIn, setLopggedIn] = useState(false);
  const [onRegisterPage, setOnRegisterPage] = useState(false);

  return loggedIn && !onRegisterPage ? (
    <>
      <Modal
        withCloseButton={false}
        opened={opened}
        title="Delete Database Contents?"
      >
        <Text>NOTE: Deleted data cannot be recovered</Text>
        <Flex direction="row" style={{ justifyContent: "center" }}>
          <Button
            onClick={() => {
              ResetDatabase();
              setOpened(false);
            }}
            style={{ margin: "0px 20px" }}
          >
            Delete
          </Button>
          <Button
            onClick={() => setOpened(false)}
            style={{ margin: "0px 20px" }}
          >
            Cancel
          </Button>
        </Flex>
      </Modal>
      <Button onClick={() => setOpened(true)}>Reset Database</Button>
      <Text>Click Microphone to Start Recording:</Text>
      <AudioRecorder
        onRecordingComplete={AddFinishedRecording}
        recorderControls={recorderControls}
      />
    </>
  ) : (
    <>
      <Flex
        style={{
          justifyContent: "center",
          width: "50%",
          minHeight: "50%",
          margin: "17.5% 25%",
          border: "solid",
        }}
        direction="column"
      >
        <Title align="center">Login</Title>
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
          <Button variant="subtle" style={{ margin: "0px 20px" }}>
            Register
          </Button>
          <Button variant="subtle" style={{ margin: "0px 20px" }}>
            Forgot Password
          </Button>
          <Button
            onClick={loginCallback}
            style={{ width: "12em", margin: "0px 20px" }}
          >
            Login
          </Button>
          <br />
        </Flex>
      </Flex>
    </>
  );
};

export default App;
