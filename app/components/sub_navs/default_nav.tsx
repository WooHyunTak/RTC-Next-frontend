import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Channels from "./channels";
import DirectMessages from "./direct_messages";

function DefaultNav() {
  const [isChannelsOpen, setIsChannelsOpen] = useState(true);
  const [isDirectMessagesOpen, setIsDirectMessagesOpen] = useState(true);

  const handleChannelsOpen = () => {
    setIsChannelsOpen(!isChannelsOpen);
  };

  const handleDirectMessagesOpen = () => {
    setIsDirectMessagesOpen(!isDirectMessagesOpen);
  };

  return (
    <div className="flex w-[400px] h-full flex-col gap-6 bg-blue-700 text-white p-4">
      <div className="flex w-full flex-col">
        <div
          className="flex items-center text-lg gap-4 hover:cursor-pointer hover:bg-blue-600 rounded-md p-2"
          onClick={handleChannelsOpen}
        >
          <div className="flex items-center justify-center w-4 h-4">
            {isChannelsOpen ? (
              <FontAwesomeIcon icon={faCaretDown} />
            ) : (
              <FontAwesomeIcon icon={faCaretRight} />
            )}
          </div>
          <span>Channels</span>
        </div>
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
