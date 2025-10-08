import axiosClient from "./axiosClient";

interface SignupRequest {
  loginEmail: string;
  loginPassword: string;
  name: string;
}

interface LoginRequest {
  loginEmail: string;
  loginPassword: string;
}

interface RequestFriendRequest {
  userName: string;
}

interface AcceptAndRejectFriendAnswer {
  RequestUserId: number;
}

interface RequestFriendList {
  nextCursor: string;
  limit: number;
}

//회원가입
const signup = async (request: SignupRequest) => {
  const response = await axiosClient.post("/api/users/signup/", request);
  return response.data;
};

//로그인
const login = async (request: LoginRequest) => {
  const response = await axiosClient.post("/api/users/login/", request);
  return response.data;
};

//로그아웃
const logout = async () => {
  const response = await axiosClient.post("/api/users/logout/");
  return response.data;
};

//사용자 정보 조회
const getUser = async () => {
  const response = await axiosClient.get("/api/users/me/");
  return response.data;
};

//친구 요청하기
const requestFriend = async (request: RequestFriendRequest) => {
  const response = await axiosClient.post("/api/users/request-friend/", request);
  return response.data;
};

//받은 친구 요청 조회
const getReceivedFriendRequests = async () => {
  const response = await axiosClient.get("/api/users/received-friend-requests/");
  return response.data;
};

//친구 요청 수락
const acceptFriendRequest = async (request: AcceptAndRejectFriendAnswer) => {
  const response = await axiosClient.post("/api/users/accept-friend/", request);
  return response.data;
};

//친구 요청 거절
const rejectFriendRequest = async (request: AcceptAndRejectFriendAnswer) => {
  const response = await axiosClient.post("/api/users/reject-friend/", request);
  return response.data;
};

// 전체 친구 목록 조회
const getFriendList = async (request : RequestFriendList) => {
  const response = await axiosClient.get("/api/users/my-friends/", {params: request});
  return response.data;
};

export default { signup,
    login,
    logout,
    getUser,
    requestFriend,
    getReceivedFriendRequests,
    acceptFriendRequest,
    rejectFriendRequest,
    getFriendList,
};
