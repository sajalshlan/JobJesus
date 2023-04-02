import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useOpenAI from "./useOpenAI";

const flatize = (arr) => {
  let s = "";

  for (let i of arr) {
    s = s + "\n" + i;
  }

  return s;
};

const Main = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [context, setContext] = useState([
    {
      role: "system",
      content: `As a mock interviewer, your task is to ask 10 questions related to the field of your choice. The purpose of this exercise is to assess the interviewee's knowledge and expertise in the chosen field. You will analyze the answers given by the interviewee and assign a cumulative score out of 10 based on the quality of the responses.

    In the subsequent prompts, you will ask the interviewee to provide solutions to the questions one-by-one. Make sure to provide clear and concise instructions for each question and allow the interviewee enough time to respond. You may also ask follow-up questions to clarify any ambiguities in the answers.
    
    Remember, the purpose of this exercise is not to judge the interviewee, but to assess their strengths and weaknesses in the chosen field. Be professional, courteous, and objective in your evaluation. Good luck!`,
    },
    {
      role: "assistant",
      content: "1. why are hooks in react, what are they used for ?",
    },
  ]);
  const [getCompletion, loading, error] = useOpenAI(
    import.meta.env.VITE_OPENAI_API_KEY
  );

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
          {loading ? "thinking..." : context[context.length - 1].content}
        </p>
      </div>
      <div className="mx-auto flex gap-4">
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button
          onClick={async () => {
            SpeechRecognition.stopListening();
            const tmp = Array.from(context);
            tmp.push({ role: "user", content: transcript });

            console.log(tmp);
            const tmpPrompt = await getCompletion(tmp, { temperature: 0.6 });

            console.log("####", tmpPrompt);
            // todo: speech
            tmp.push(tmpPrompt);
            setContext(tmp);
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
