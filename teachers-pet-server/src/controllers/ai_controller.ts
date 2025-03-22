 import { GoogleGenerativeAI } from "@google/generative-ai";

export const sendPrompt = async (prompt: string) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt).catch((err) => {
        console.error(err);
        return err;
    });

    return result.response.text();
};

export default { sendPrompt };
