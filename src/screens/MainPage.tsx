import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { Button, Flex, Modal, Text, Title } from "@mantine/core";
import { appendDataToDatabase, ResetDatabase } from "../utils/DropboxApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage(props: any) {
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob: any) => {
    const url = URL.createObjectURL(blob);
    const audioDiv = document.getElementById("AudioRecorderDiv");
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    audioDiv?.appendChild(audio);
  };

  async function AddFinishedRecording(blob: any) {
    //appendDataToDatabase(await blob.text());
    addAudioElement(blob);
  }

  // Kick unauthorized users to landing page.
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("code")) {
      navigate("/authorize");
    } else if (!props.loggedIn) {
      navigate("/landing");
    }
  });

  return (
    <>
      <Modal
        withCloseButton={false}
        opened={opened}
        title="Delete Database Contents?"
        onClose={() => {
          setOpened(false);
        }}
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

      <Flex direction="column" style={{ alignItems: "center" }}>
        <Title size="h3" style={{ alignSelf: "center" }}>
          Host A Recording Session
        </Title>
        <br />
        <Flex id="AudioRecorderDiv" direction="column">
          <Text>Click Microphone to Start Recording:</Text>
          <AudioRecorder
            onRecordingComplete={AddFinishedRecording}
            recorderControls={recorderControls}
          />
        </Flex>
        <br />
        <br />

        <Title size="h5" style={{ alignSelf: "center" }}>
          Database Contents:
        </Title>
        <Flex
          direction="column"
          style={{ minHeight: "10em", minWidth: "10em", border: "solid" }}
        ></Flex>
        <br />
        <Button style={{ width: "15%" }} onClick={() => setOpened(true)}>
          Empty Database
        </Button>
      </Flex>
    </>
  );
}
