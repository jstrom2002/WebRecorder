import React from "react";
import ReactDOM from "react-dom";
import { useAudioRecorder, AudioRecorder } from "react-audio-voice-recorder";

const App = () => {
  const recorderControls = useAudioRecorder();
  const addAudioElement = blob => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  return (
    <div>
      <AudioRecorder
        onRecordingComplete={blob => addAudioElement(blob)}
        recorderControls={recorderControls}
      />
      <br />
      <button onClick={recorderControls.stopRecording}>Stop recording</button>
    </div>
  );
};

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById("root"),
);
