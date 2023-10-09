import { useState, useEffect, useRef } from "react";
import { Configuration, OpenAIApi } from "openai";

const useOpenAI = (apiKey) => {
    const openaiClientRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const configuration = new Configuration({
            apiKey: apiKey,
        });
        openaiClientRef.current = new OpenAIApi(configuration);
    }, [apiKey]);

    const getCompletion = async (prompt, options) => {
        setLoading(true);
        setError(null);

        try {
            const response = await openaiClientRef.current.createChatCompletion(
                {
                    model: "gpt-3.5-turbo",
                    messages: prompt,
                    ...options,
                }
            );
            //   console.log(response);
            setLoading(false);
            return response.data.choices[0].message;
        } catch (error) {
            setLoading(false);
            setError(error);
            return null;
        }
    };

    return [getCompletion, loading, error];
};

export default useOpenAI;


//

import { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";

function useOpenAI(apiKey) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openaiClient, setOpenaiClient] = useState(null);

  useEffect(() => {
    const configureOpenaiClient = async () => {
      setLoading(true);
      setError(null);

      try {
        const configuration = new Configuration({
          apiKey: apiKey,
        });
        const client = new OpenAIApi(configuration);
        setOpenaiClient(client);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    configureOpenaiClient();
  }, [apiKey]);

  const getCompletion = async (prompt, options) => {
    if (!openaiClient) {
      // Handle case where the client is not yet initialized.
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await openaiClient.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: prompt,
        ...options,
      });
      setLoading(false);
      return response.data.choices[0].message;
    } catch (error) {
      setLoading(false);
      setError(error);
      return null;
    }
  };

  return [getCompletion, loading, error];
}

export default useOpenAI;

