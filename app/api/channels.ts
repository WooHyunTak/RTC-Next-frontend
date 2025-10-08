import axiosClient from "./axiosClient";
import convertCase from "@/app/utils/convertCase";

export interface CreateChannelRequest {
  name: string;
  description: string;
  category: string;
  is_private: boolean;
}

export interface UpdateChannelRequest extends CreateChannelRequest {
  id: number;
}
export interface ChannelResponse {
    id: number;
    name: string;
    description: string;
    is_private: boolean;
    type: string;
    createdAt: string;
    updatedAt: string;
}

export interface Friend {
  id: number;
  name: string;
  isOnline: boolean;
  profileImage?: string | null;
}

export interface DMChannelResponse {
  id: number;
  toUser: Friend;
}

export interface ChannelResponseList {
  list: ChannelResponse[];
}

const getMyChannels = async () : Promise<ChannelResponseList> => {
  const response = await axiosClient.get("/api/channels/my-channels/");
  return response.data;
};

const createChannel = async (data: CreateChannelRequest) : Promise<ChannelResponse> => {
  const response = await axiosClient.post("/api/channels/", data);
  return response.data;
};

const getChannel = async (id: number) : Promise<ChannelResponse> => {
  const response = await axiosClient.get(`/api/channels/${id}/`);
  return response.data;
};

const updateChannel = async (data: UpdateChannelRequest) : Promise<ChannelResponse> => {
  const response = await axiosClient.post(`/api/channels/${data.id}/`, data);
  return response.data;
};

const getDMChannels = async () : Promise<DMChannelResponse[]> => {
  const response = await axiosClient.get("/api/channels/direct-messages/");
  return convertCase.convertCaseByArray(response.data) as DMChannelResponse[];
};


export default { getMyChannels, createChannel, updateChannel, getChannel, getDMChannels };