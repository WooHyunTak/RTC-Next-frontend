import axiosClient from "./axios_client";

interface SignupRequest {
  loginEmail: string;
  loginPassword: string;
  name: string;
}

interface LoginRequest {
  loginEmail: string;
  loginPassword: string;
}

const signup = async (request: SignupRequest) => {
  const response = await axiosClient.post("/api/users/signup/", request);
  return response.data;
};

const login = async (request: LoginRequest) => {
  const response = await axiosClient.post("/api/users/login/", request);
  return response.data;
};

const logout = async () => {
  const response = await axiosClient.post("/api/users/logout/");
  return response.data;
};

const getUser = async () => {
  const response = await axiosClient.get("/api/users/me/");
  return response.data;
};

export default { signup, login, logout, getUser };
