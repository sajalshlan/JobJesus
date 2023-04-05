import React, { useState } from "react";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";
import useOpenAI from "./useOpenAI";
import { Button } from "primereact/button";

const systemPrompt = `System: Remember that you are an interviewer, and you need to respond accordingly. 
If you believe there's a need for some cross-questioning for the answer provided by the interviewee, feel free to do so. 
Or Else just mark the grade on the response and move on to the next question. 
And note that if you gather that a total of 10 questions have already been asked then just return an overall review of the interviewee with the points for him/her to improve on, and a grade out of 10 that justifies his/her performance. 
Also, be kind and try to simulate a real-world interview situation. 
Remeber to always assume yourself as the interviewer and never inlcude keywords like bot or system in your responses.`;

const Main = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();
    const { speak, supported, voices } = useSpeechSynthesis();
    const [toggle, setToggle] = useState(false);
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
            <div className="flex relative">
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
                <a
                    className="text-white"
                    href="https://github.com/Sajal24/JobJesus"
                    target="_blank"
                    style={{ textDecoration: "none" }}
                >
                    <div
                        className="glass ml-auto absolute"
                        style={{
                            width: "fit-content",
                            left: "1rem",
                            top: "1rem",
                        }}
                    >
                        <i className="pi pi-github m-3 text-4xl" />
                    </div>
                </a>
            </div>
            <div className="flex gap-2 mx-4 ">
                <div className="glass mx-auto w-5" style={{ maxWidth: "90%" }}>
                    <p className="text-4xl my-3 mx-5">
                        {loading
                            ? "thinking..."
                            : context[context.length - 1].content}
                    </p>
                </div>
                <div className="mx-auto flex flex-column gap-4 jusitfy-content-center align-items-center">
                    <Button
                        className="glass"
                        icon="pi pi-microphone text-xl"
                        onClick={async () => {
                            if (!toggle) {
                                SpeechRecognition.startListening();
                                setToggle(true);
                            } else {
                                SpeechRecognition.stopListening();
                                setToggle(false);

                                const tmp = Array.from(context);
                                tmp.push({
                                    role: "user",
                                    content: transcript,
                                });
                                tmp.push({
                                    role: "system",
                                    content: systemPrompt,
                                });

                                console.log(tmp);
                                const tmpPrompt = await getCompletion(tmp, {
                                    temperature: 1,
                                });

                                console.log(tmpPrompt.content);
                                if (supported) {
                                    speak({
                                        text: tmpPrompt.content,
                                        voice: voices[4],
                                    });
                                }

                                tmp.push(tmpPrompt);
                                setContext(tmp);
                            }
                        }}
                    >
                        {toggle ? "Stop" : "Start"}
                    </Button>
                    <Button
                        className="glass"
                        icon="pi pi-refresh text-xl"
                        onClick={() => {
                            resetTranscript;
                            SpeechRecognition.stopListening();
                            setToggle(false);
                        }}
                    >
                        Reset
                    </Button>
                </div>
                <div className="glass mx-auto w-5" style={{ maxWidth: "90%" }}>
                    <p className="text-4xl my-3 mx-5">{transcript}</p>
                </div>
            </div>
        </div>
    );
};
export default Main;
