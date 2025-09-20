import axios from "axios";

export const sendMessage = async (message: string) => {
  const response = await axios.post("/api/messages", { message });
  return response.data;
};

export const getMessages = async () => {
  const response = await axios.get("/api/messages");
  return response.data;
};