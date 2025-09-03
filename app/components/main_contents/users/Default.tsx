import ButtonSet from "../../Button_set";
import { faUser, faUsers, faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Tooltip from "../../Tooltip";
import RequestFriendModal from "../../users/RequestFriendModal";
import { useQuery } from "@tanstack/react-query";
import usersApi from "@/app/api/users";
import ReceivedFriendRequests from "./ReceivedFriendRequests";
import FriendList from "./FriendList";

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
      <div className="flex flex-col w-full h-full pl-4 pr-4 bg-blue-800">
        <div className="flex w-full justify-between bg-blue-800 pt-4 pb-2">
            <div className="flex w-ful gap-2">
                <ButtonSet icon={faUser} size="sm" label="친구" clicked={false} />
                <Tooltip text="모든 친구 목록을 보여줍니다" position="bottom">
                  <ButtonSet icon={faUsers} size="sm" label="모두" handleClick={() => {changeItemState("friendList")}} />
                </Tooltip>
                <Tooltip text="사용자를 검색합니다" position="bottom">
                  <ButtonSet handleClick={() => {setIsOpenFindUserModal(true)}} icon={faSearch} size="sm" label="친구 추가하기" />
                </Tooltip>
                {requestFriendData && requestFriendData?.list.length > 0 && (
                  <Tooltip text="받은 친구 요청 목록을 보여줍니다" position="bottom">
                    <ButtonSet icon={faUserPlus} size="sm" label={`받은 친구 ( ${requestFriendData?.list.length} )`} handleClick={() => {changeItemState("received-friend-request")}} />
                  </Tooltip>
                )}
            </div>
        </div>
        {itemState.status == "friendList" && <FriendList />}
        {itemState.status == "received-friend-request" && <ReceivedFriendRequests />}
      </div>
      {isOpenFindUserModal && <RequestFriendModal openState={setIsOpenFindUserModal} />}
    </>
  );
}

export default DefaultMain;