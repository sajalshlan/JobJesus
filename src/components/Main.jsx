import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useOpenAI from "./useOpenAI";
import { OPENAI_API_KEY } from "../../env";

const Main = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [context, setContext] = useState([]);
  const [getCompletion, loading, error] = useOpenAI(OPENAI_API_KEY);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="flex flex-column gap-8">
      <div
        className="glass w-min mx-auto"
        style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
      >
        <h2
          className="text-6xl my-3 mx-5 px-3"
          style={{ width: "fit-content" }}
        >
          JobJesus
        </h2>
      </div>
      <div className="glass mx-auto" style={{ maxWidth: "90%" }}>
        <p className="text-5xl my-3 mx-5">
          {loading ? "thinking..." : context[context.length - 1]}
        </p>
      </div>
      <div className="mx-auto flex gap-4">
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button
          onClick={() => {
            SpeechRecognition.stopListening();
            // getCompletion();
          }}
        >
          Stop
        </button>
        <button onClick={resetTranscript}>Reset</button>
      </div>
      <div className="glass mx-auto" style={{ maxWidth: "90%" }}>
        <p className="text-5xl my-3 mx-5">{transcript}</p>
      </div>
    </div>
  );
};
export default Main;
