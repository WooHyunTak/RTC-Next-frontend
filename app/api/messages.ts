import axios_client from "./axiosClient";
import convertCase from "@/app/utils/convertCase";

export interface MessageItem {
  id: number;
  fromUser: {
    id: number;
    name: string;
    profileImage?: string;
  };
  content: string;
  createdAt: Date;
}

export const sendMessage = async (message: string) => {
  const response = await axios_client.post("/api/messages", { message });
  return response.data;
};

export const getMessagesByChannel = async (channelId: number) : Promise<MessageItem[]> => {
  const response = await axios_client.get(`/api/channels/${channelId}/messages/`);
  return convertCase.convertCaseByArray(response.data) as MessageItem[];
};