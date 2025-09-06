import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Channels from "./Channels";
import DirectMessages from "./Direct_messages";
import Button from "../Button";
import CreateChannelModal from "../channels/CreateChannelModal";
import {Resizable} from "re-resizable";

function DefaultNav() {
  const [isChannelsOpen, setIsChannelsOpen] = useState(true);
  const [isDirectMessagesOpen, setIsDirectMessagesOpen] = useState(true);
  const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false);

  // 채널 목록 열기
  const handleChannelsOpen = () => {
    setIsChannelsOpen(!isChannelsOpen);
  };

  // 다이렉트 메시지 목록 열기
  const handleDirectMessagesOpen = () => {
    setIsDirectMessagesOpen(!isDirectMessagesOpen);
  };

  // 채널 생성 모달 열기
  const openCreateChannelModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCreateChannelOpen(true);
  };

  return (
    <Resizable 
      className="flex w-[300px] h-full flex-col gap-6 bg-blue-800 text-white p-2 overflow-y-auto"
      defaultSize={{
        width: 300,
        height: "100%",
      }}
      minWidth={250}
      maxWidth={400}
      enable={{
        right: true,
      }}
    >
      <div className="flex w-full flex-col">
        <div
          className="flex items-center justify-between text-lg hover:cursor-pointer hover:bg-blue-600 rounded-md p-2"
          onClick={handleChannelsOpen}
        >
          <div className="flex items-center gap-4 ">
            <div className="flex items-center justify-center w-4 h-4">
              {isChannelsOpen ? (
                <FontAwesomeIcon icon={faCaretDown} />
              ) : (
                <FontAwesomeIcon icon={faCaretRight} />
              )}
            </div>
            <span>Channels</span>
          </div>
          <Button size="sm" onClick={openCreateChannelModal}>+</Button>
        </div>
        {/* 채널 생성 모달 */}
        {isCreateChannelOpen && <CreateChannelModal openState={setIsCreateChannelOpen} modalType="create" />}
        {/* 채널 목록 컴포넌트 */}
        {isChannelsOpen && <Channels />}
      </div>
    </Resizable>
  );
}

export default DefaultNav;
