import axiosClient from "./axios_client";

const register = async (email: string, password: string, nickname: string) => {
  const response = await axiosClient.post("/users/register", {
    email,
    password,
    nickname,
  });
  return response.data;
};

const login = async (email: string, password: string) => {
  const response = await axiosClient.post("/users/login", {
    email,
    password,
  });
  return response.data;
};

const logout = async () => {
  const response = await axiosClient.post("/users/logout");
  return response.data;
};

const getUser = async () => {
  const response = await axiosClient.get("/users/me");
  return response.data;
};

export default { register, login, logout, getUser };
