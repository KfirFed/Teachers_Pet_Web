import axiosConnection from "./AxiosConnection";

const AI_ROUTE = "/ai";

export const askAI = async (prompt: string): Promise<string> => {
  try {
    return (await axiosConnection.post(`${AI_ROUTE}/prompt`, { prompt })).data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "AI failed");
  }
};
