import { Card, CardContent } from "@mui/material";
import { useState } from "react";
import { askAI } from "../../axios/AI";
import styles from "./Ai.module.css";

export const AiPage: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");

  const onASk = async () => {
    try {
      setAnswer("Take a break for a second, you need it! Almost there...");
      setAnswer(await askAI(prompt));
      setPrompt("");
    } catch (err: any) {
      console.error(err.message);
      return "Error";
    }
  };

  return (
    <Card
      sx={{
        maxWidth: "80%",
        display: "flex",
        justifyContent: "center",
        mx: "auto",
        mt: 4,
      }}
    >
      <CardContent>
        <h1>Ask AI</h1>
        <h2>Ask our bot for ideas for lessons. We can make you job easier!</h2>
        <p>{answer}</p>
        <input
          type="text"
          placeholder="Ask a question"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ width: "100%" }}
          className={styles.input}
        />
        <button className={styles.button} onClick={() => onASk()}>
          Ask
        </button>
      </CardContent>
    </Card>
  );
};
