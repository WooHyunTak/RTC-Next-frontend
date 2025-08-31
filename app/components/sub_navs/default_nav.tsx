import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Channels from "./Channels";
import DirectMessages from "./Direct_messages";
import Button from "../Button";
import CreateChannelModal from "../channels/CreateChannelModal";

function DefaultNav() {
  const [isChannelsOpen, setIsChannelsOpen] = useState(true);
  const [isDirectMessagesOpen, setIsDirectMessagesOpen] = useState(true);
  const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false);

  const handleChannelsOpen = () => {
    setIsChannelsOpen(!isChannelsOpen);
  };

  const handleDirectMessagesOpen = () => {
    setIsDirectMessagesOpen(!isDirectMessagesOpen);
  };

  const openCreateChannelModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCreateChannelOpen(true);
  };

  return (
    <div className="flex w-[300px] h-full flex-col gap-6 bg-blue-700 text-white p-2 overflow-y-auto">
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
        {isCreateChannelOpen && <CreateChannelModal openState={setIsCreateChannelOpen} modalType="create" />}
        {isChannelsOpen && <Channels />}
        <div
          className="flex items-center text-lg gap-4 hover:cursor-pointer hover:bg-blue-600 rounded-md p-2"
          onClick={handleDirectMessagesOpen}
        >
          <div className="flex items-center justify-center w-4 h-4">
            {isDirectMessagesOpen ? (
              <FontAwesomeIcon icon={faCaretDown} />
            ) : (
              <FontAwesomeIcon icon={faCaretRight} />
            )}
          </div>
          <span>Direct messages</span>
        </div>
        {isDirectMessagesOpen && <DirectMessages />}
      </div>
    </div>
  );
}

export default DefaultNav;
