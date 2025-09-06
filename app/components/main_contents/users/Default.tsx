import { useState } from "react";
import RequestFriendModal from "../../users/RequestFriendModal";
import { useQuery } from "@tanstack/react-query";
import usersApi from "@/app/api/users";
import ReceivedFriendRequests from "./ReceivedFriendRequests";
import FriendList from "./FriendList";
import ContentHeader from "./ContentHeader";

interface ContentItemState {
  status: "friendList" | "received-friend-request" | "request-friend";
}

function DefaultMain() {
  const [itemState, setItemState] = useState<ContentItemState>({status: "friendList"})
  const [isOpenFindUserModal, setIsOpenFindUserModal] = useState(false);

  const {data: requestFriendData} = useQuery({
    queryKey: ["receivedFriend"],
    queryFn: () => usersApi.getReceivedFriendRequests(),
  });

  const changeItemState = (status: ContentItemState["status"]) => {
    setItemState({status: status});
  }

  return (
    <>
      <div className="flex flex-col w-full h-full pl-4 pr-4 bg-gray-800">
        <ContentHeader handleChangeItemState={changeItemState} setIsOpenFindUserModal={setIsOpenFindUserModal} requestFriendData={requestFriendData} />
        {itemState.status == "friendList" && <FriendList />}
        {itemState.status == "received-friend-request" && <ReceivedFriendRequests />}
      </div>
      {isOpenFindUserModal && <RequestFriendModal openState={setIsOpenFindUserModal} />}
    </>
  );
}

export default DefaultMain;