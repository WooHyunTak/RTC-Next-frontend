'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import channelsApi from "../../api/channels";
import { ChannelResponse } from "../../api/channels";
import { useState } from "react";
import IconBox from "../Icon_box";
import CreateChannelModal from "../channels/CreateChannelModal";

function AdditionalInfo({ id }: { id: number }) {
  const [openCreateChannelModal, setOpenCreateChannelModal] = useState(false);
  const [channel, setChannel] = useState<ChannelResponse | null>(null);

  const getChannel = async () => {
    const response = await channelsApi.getChannel(id);
    setChannel(response);
  };

  const handelOpenChannelModal = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await getChannel();
    setOpenCreateChannelModal(true);
  };

  return (
    <>
      <div className="flex flex-col items-center bg-[var(--bg-primary-800)] rounded-md p-2">
        <span className="text-sm w-full p-2 rounded-md hover:cursor-pointer hover:bg-[var(--bg-primary-700)]" onClick={handelOpenChannelModal} >채널 상세 보기</span>
        <span className="text-sm w-full p-2 rounded-md hover:cursor-pointer hover:bg-[var(--bg-primary-700)]">채널 삭제</span>
        <span className="text-sm w-full p-2 rounded-md hover:cursor-pointer hover:bg-[var(--bg-primary-700)]">채널 나가기</span>
      </div>
      {openCreateChannelModal && <CreateChannelModal openState={setOpenCreateChannelModal} modalType="update" channelItem={channel} />}
    </>
    
  );
}


function ChannelItem(channel : ChannelResponse) {
  const { id, name, is_private : isPrivate, type } = channel;

  const [hideAdditionalInfo, setHideAdditionalInfo] = useState(false);
  const [openAdditionalInfo, setOpenAdditionalInfo] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-2 hover:bg-blue-600 p-2 rounded-md"
        onMouseEnter={() => setHideAdditionalInfo(true)}
        onMouseLeave={() => setHideAdditionalInfo(false)}
        >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 ">
            {isPrivate ? (
              <FontAwesomeIcon icon={faLock} />
            ) : (
              <FontAwesomeIcon icon={faLockOpen} />
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">{name}</span>
            {type && (
              <span className="text-xs ">
                [{type}]
              </span>
            )}
          </div>
        </div>
        {hideAdditionalInfo && (
          <div className="flex items-center" onClick={() => setOpenAdditionalInfo(!openAdditionalInfo)}>
            <IconBox name={faEllipsisVertical} position="right"/>
          </div>
        )}
      </div>
      {openAdditionalInfo && (
        <AdditionalInfo id={id} />
      )}
    </>
  );
}

function Channels() {
  const { data : channels } = useQuery({
    queryKey: ["my-channels"],
    queryFn: channelsApi.getMyChannels,
  });

  return (
    <div className="flex flex-col gap-2">
      {channels?.list.map((channel: ChannelResponse) => (
        <ChannelItem key={channel.id} {...channel} />
      ))}
    </div>
  );
}

export default Channels;
