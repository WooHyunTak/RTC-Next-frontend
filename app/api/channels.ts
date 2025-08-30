import axiosClient from "./axios_client";

const getMyChannels = async () => {
  const response = await axiosClient.get("/api/channels/my-channels/");
  return response.data;
};

export default { getMyChannels };