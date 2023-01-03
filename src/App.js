import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { appendToJSON } from "./JSON/appendToJSON";

const App = () => {
  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  function AddFinishedRecording(blob) {
    appendToJSON(blob);
    addAudioElement(blob);
  }

  return (
    <div>
      <AudioRecorder
        onRecordingComplete={(blob) => AddFinishedRecording(blob)}
        recorderControls={recorderControls}
      />
      <button onClick={recorderControls.stopRecording}>Stop recording</button>
    </div>
  );
};

export default App;
