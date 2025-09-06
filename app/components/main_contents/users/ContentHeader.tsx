import ButtonSet from "../../Button_set";
import { faUser, faUsers, faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../../Tooltip";
import { useQuery } from "@tanstack/react-query";
import usersApi from "@/app/api/users";

interface ContentItemState {
  status: "friendList" | "received-friend-request" | "request-friend";
}

interface ContentHeaderProps {
  handleChangeItemState: (status: ContentItemState["status"]) => void;
  setIsOpenFindUserModal: (value: boolean) => void;
}

function ContentHeader({ handleChangeItemState, setIsOpenFindUserModal }: ContentHeaderProps) {

  const {data: requestFriendData} = useQuery({
    queryKey: ["receivedFriend"],
    queryFn: () => usersApi.getReceivedFriendRequests(),
  });


  return (
    <div className="flex w-full justify-between bg-gray-800 pt-4 pb-2">
        <div className="flex w-ful gap-2">
            <ButtonSet icon={faUser} size="sm" label="친구" clicked={false} className="bg-gray-700 hover:bg-gray-900" />
            <Tooltip text="모든 친구 목록을 보여줍니다" position="bottom">
                <ButtonSet icon={faUsers} size="sm" label="모두" handleClick={() => {handleChangeItemState("friendList")}} className="bg-gray-700 hover:bg-gray-900" />
            </Tooltip>
            <Tooltip text="사용자를 검색합니다" position="bottom">
                <ButtonSet handleClick={() => {setIsOpenFindUserModal(true)}} icon={faSearch} size="sm" label="친구 추가하기" className="bg-gray-700 hover:bg-gray-900" />
            </Tooltip>
            {requestFriendData && requestFriendData?.list.length > 0 && (
                <Tooltip text="받은 친구 요청 목록을 보여줍니다" position="bottom">
                <ButtonSet icon={faUserPlus} size="sm" label={`받은 친구 ( ${requestFriendData?.list.length} )`} handleClick={() => {handleChangeItemState("received-friend-request")}} className="bg-gray-700 hover:bg-gray-900" />
                </Tooltip>
            )}
        </div>
    </div>
  );
}

export default ContentHeader;