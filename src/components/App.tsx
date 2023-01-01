import React from "react";
import { useAudioRecorder, AudioRecorder } from "react-audio-voice-recorder";

const recorderControls = useAudioRecorder();
const addAudioElement = (blob: any) => {
  const url = URL.createObjectURL(blob);
  const audio = document.createElement("audio");
  audio.src = url;
  audio.controls = true;
  document.body.appendChild(audio);
};

function App() {
  return (
    <div>
      <AudioRecorder
        onRecordingComplete={(blob: any) => addAudioElement(blob)}
        recorderControls={recorderControls}
      />
      <button onClick={recorderControls.stopRecording}>Stop recording</button>
    </div>
  );
}

export default App;
