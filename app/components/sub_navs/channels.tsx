'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import channelsApi from "../../api/channels";


interface ChannelProps {
  channel: {
    id: number;
    name: string;
    description: string;
    isPrivate: boolean;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
}

function ChannelItem({ channel }: ChannelProps) {
  const { name, isPrivate, type } = channel;
  

  return (
    <div className="flex items-center gap-2 hover:bg-blue-600 p-2 rounded-md">
      <div className="flex items-center justify-center w-8 h-8 relative">
        {isPrivate ? (
          <FontAwesomeIcon icon={faLock} />
        ) : (
          <FontAwesomeIcon icon={faLockOpen} />
        )}
      </div>
      <div className="gap-2">
        <span className="text-sm">{name}</span>
        {type && (
          <span className="text-xs ">
            [{type}]
          </span>
        )}
      </div>
    </div>
  );
}

function Channels() {
  const { data : channels } = useQuery({
    queryKey: ["my-channels"],
    queryFn: channelsApi.getMyChannels,
  });

  return (
    <div className="flex flex-col gap-2">
      {channels?.list.map((channel: ChannelProps["channel"]) => (
        <ChannelItem key={channel.id} channel={channel} />
      ))}
    </div>
  );
}

export default Channels;
