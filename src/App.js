import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { Button, Flex, Modal, Text } from "@mantine/core";
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

  const [opened, setOpened] = useState(false);

  return (
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
  );
};

export default App;
