// import RegistrationForm from "./RegistrationForm";
import { Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { askAI } from "../../axios/AI";

export const AiPage: React.FC = () => {
  let prompt: string = "";

  const onASk = async (prompt: string): Promise<string> => {
    try {
    return await askAI(prompt);
    } catch (err: any) {
      console.error(err.message);
      return "Error";
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        display: "flex",
        justifyContent: "center",
        mx: "auto",
        mt: 4,
      }}
    >
      <CardContent>
        <h1>Ask AI</h1>
        <p>{onASk(prompt)}</p>
        <input
          type="text"
          placeholder="Ask a question"
          value={prompt}
          style={{ width: "100%" }}
        />
        <button onClick={() => onASk("What is the capital of France?")}>
          Ask
        </button>
      </CardContent>
    </Card>
  );
};
