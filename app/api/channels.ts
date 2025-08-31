import axiosClient from "./axios_client";

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


export default { getMyChannels, createChannel, updateChannel, getChannel };